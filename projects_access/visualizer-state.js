(function () {
  const storageKey = `visualizerState:${window.location.pathname}`;
  let lastSnapshot = '';
  let isApplyingState = false;
  let pendingViewport = null;
  const restoredStateRegistry = window.__visualizerStateRestoredPaths || (window.__visualizerStateRestoredPaths = {});

  function hasGraphBindings() {
    return typeof nodes !== 'undefined' && Array.isArray(nodes)
      && typeof edges !== 'undefined' && Array.isArray(edges);
  }

  function toPlainNode(node) {
    return {
      id: node.id,
      x: node.x,
      y: node.y,
      ...(typeof node.label !== 'undefined' ? { label: node.label } : {}),
      ...(typeof node.isSource !== 'undefined' ? { isSource: node.isSource } : {})
    };
  }

  function toPlainEdge(edge) {
    return {
      from: edge.from,
      to: edge.to,
      ...(typeof edge.weight !== 'undefined' ? { weight: edge.weight } : {}),
      ...(typeof edge.capacity !== 'undefined' ? { capacity: edge.capacity } : {}),
      ...(typeof edge.flow !== 'undefined' ? { flow: edge.flow } : {})
    };
  }

  function captureState() {
    if (!hasGraphBindings()) return null;

    const state = {
      nodes: nodes.map(toPlainNode),
      edges: edges.map(toPlainEdge)
    };

    if (typeof nextNodeId !== 'undefined') {
      state.nextNodeId = nextNodeId;
    }

    if (typeof isDirected !== 'undefined') {
      state.isDirected = !!isDirected;
    }

    if (typeof sourceId !== 'undefined') {
      state.sourceId = sourceId;
    }

    if (typeof sinkId !== 'undefined') {
      state.sinkId = sinkId;
    }

    if (window.graphViewportController && typeof window.graphViewportController.captureViewport === 'function') {
      const viewport = window.graphViewportController.captureViewport();
      if (viewport) {
        state.viewport = viewport;
      }
    }

    return state;
  }

  function applyRestoredState(state) {
    if (!hasGraphBindings() || !state) return;

    isApplyingState = true;
    try {
      nodes = (Array.isArray(state.nodes) ? state.nodes : []).map(node => ({
        ...node,
        elemCircle: null,
        elemText: null
      }));

      edges = (Array.isArray(state.edges) ? state.edges : []).map(edge => ({
        ...edge,
        elemLine: null,
        elemText: null
      }));

      if (typeof nextNodeId !== 'undefined') {
        if (typeof state.nextNodeId === 'number') {
          nextNodeId = state.nextNodeId;
        } else {
          nextNodeId = nodes.reduce((max, node) => Math.max(max, node.id), -1) + 1;
        }
      }

      if (typeof isDirected !== 'undefined' && typeof state.isDirected === 'boolean') {
        isDirected = state.isDirected;
      }

      if (typeof sourceId !== 'undefined' && Object.prototype.hasOwnProperty.call(state, 'sourceId')) {
        sourceId = state.sourceId;
      }

      if (typeof sinkId !== 'undefined' && Object.prototype.hasOwnProperty.call(state, 'sinkId')) {
        sinkId = state.sinkId;
      }

      if (typeof chooseGraphType === 'function' && typeof isDirected !== 'undefined') {
        chooseGraphType(isDirected);
      }

      if (typeof drawGraph === 'function') {
        drawGraph();
      }

      if (state.viewport) {
        if (window.graphViewportController && typeof window.graphViewportController.restoreViewport === 'function') {
          window.graphViewportController.restoreViewport(state.viewport);
          pendingViewport = null;
        } else {
          pendingViewport = { ...state.viewport };
        }
      }
    } finally {
      isApplyingState = false;
    }
  }

  function applyPendingViewport() {
    if (!pendingViewport || !window.graphViewportController || typeof window.graphViewportController.restoreViewport !== 'function') {
      return;
    }

    window.graphViewportController.restoreViewport(pendingViewport);
    pendingViewport = null;
  }

  function tryRestoreState() {
    if (!hasGraphBindings()) return;

    if (nodes.length || edges.length) return;

    const raw = localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      applyRestoredState(parsed);
      applyPendingViewport();
      restoredStateRegistry[window.location.pathname] = true;
      lastSnapshot = JSON.stringify(captureState());
    } catch {
      localStorage.removeItem(storageKey);
    }
  }

  function persistState() {
    if (isApplyingState || !hasGraphBindings()) return;

    try {
      const state = captureState();
      if (!state) return;

      const snapshot = JSON.stringify(state);
      if (snapshot !== lastSnapshot) {
        localStorage.setItem(storageKey, snapshot);
        lastSnapshot = snapshot;
      }
    } catch {
      // no-op (private mode/quota/etc.)
    }
  }

  tryRestoreState();
  persistState();

  setInterval(persistState, 800);
  window.addEventListener('pagehide', persistState);
  window.addEventListener('beforeunload', persistState);
  window.addEventListener('load', applyPendingViewport);
})();
