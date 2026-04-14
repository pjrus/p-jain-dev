/**
 * Shared SVG interaction helpers for graph visualisers.
 * Handles responsive node sizing, viewport pan/zoom, and delegated dragging.
 */

(function () {
  function cloneViewBox(viewBox) {
    return {
      x: viewBox.x,
      y: viewBox.y,
      width: viewBox.width,
      height: viewBox.height
    };
  }

  function getDistance(a, b) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  function getMidpoint(a, b) {
    return {
      x: (a.clientX + b.clientX) / 2,
      y: (a.clientY + b.clientY) / 2
    };
  }

  function updateAdaptiveMetrics(config) {
    const width = window.innerWidth;
    const isMobile = width < config.mobileBreakpoint;
    const scaleFactor = Math.min(1.2, Math.max(0.6, width / config.baseWidth));

    const metrics = {
      nodeRadius: Math.floor(config.maxNodeRadius * scaleFactor),
      fontSize: Math.floor(14 * scaleFactor),
      isMobile,
      scaleFactor
    };

    document.documentElement.style.setProperty('--node-radius', `${metrics.nodeRadius}px`);
    document.documentElement.style.setProperty('--font-size-base', `${metrics.fontSize}px`);
    return metrics;
  }

  function buildDefaultViewBox(svg, config) {
    const rect = svg.getBoundingClientRect();
    const width = Math.max(rect.width || 0, config.baseWidth);
    const height = Math.max(rect.height || 0, config.baseHeight);
    return { x: 0, y: 0, width, height };
  }

  function setViewBox(svg, viewBox) {
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  }

  function getSvgPoint(svg, evt) {
    const pt = svg.createSVGPoint();
    const source = evt.touches && evt.touches.length
      ? evt.touches[0]
      : evt.changedTouches && evt.changedTouches.length
        ? evt.changedTouches[0]
        : evt;

    pt.x = source.clientX;
    pt.y = source.clientY;

    try {
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    } catch {
      return { x: pt.x, y: pt.y };
    }
  }

  function getClientPoint(svg, evt) {
    if (typeof evt.clientX === 'number' && typeof evt.clientY === 'number') {
      return { x: evt.clientX, y: evt.clientY };
    }

    const rect = svg.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function normaliseWheelDelta(delta, deltaMode) {
    const mode = typeof deltaMode === 'number' ? deltaMode : 0;

    if (mode === 1) {
      return delta * 16;
    }

    if (mode === 2) {
      return delta * window.innerHeight;
    }

    return delta;
  }

  const MobileVisualizer = {
    config: {
      minNodeRadius: 12,
      maxNodeRadius: 22,
      baseWidth: 1000,
      baseHeight: 600,
      mobileBreakpoint: 768,
      minZoomWidth: 120,
      maxZoomWidth: 5000,
      wheelZoomIntensity: 0.0025
    },

    getAdaptiveMetrics: function () {
      return updateAdaptiveMetrics(this.config);
    },

    createResponsiveNode: function (id, x, y) {
      const metrics = this.getAdaptiveMetrics();
      return {
        id,
        x,
        y,
        r: metrics.nodeRadius
      };
    },

    createGraphController: function (config) {
      const controller = {
        svg: config.svg,
        getNodes: config.getNodes,
        draw: config.draw,
        createNodeAt: config.createNodeAt,
        isAddNodeMode: config.isAddNodeMode,
        afterInteractiveRedraw: config.afterInteractiveRedraw || null,
        canDragNode: config.canDragNode || (() => true),
        panThresholdPx: config.panThresholdPx || 8,
        activePointers: new Map(),
        pointerCaptureTargets: new Map(),
        primaryInteraction: null,
        pinchState: null,
        gestureState: null,
        suppressClick: false,
        defaultViewBox: null,
        pendingViewport: null,
        isReady: false,

        init: function () {
          const svg = this.svg;
          svg.style.userSelect = 'none';
          svg.style.webkitUserSelect = 'none';
          svg.style.touchAction = 'none';

          updateAdaptiveMetrics(MobileVisualizer.config);
          this.defaultViewBox = buildDefaultViewBox(svg, MobileVisualizer.config);

          if (!svg.getAttribute('viewBox')) {
            this.resetViewport();
          }

          svg.addEventListener('pointerdown', this.handlePointerDown.bind(this));
          svg.addEventListener('pointermove', this.handlePointerMove.bind(this));
          svg.addEventListener('pointerup', this.handlePointerUp.bind(this));
          svg.addEventListener('pointercancel', this.handlePointerUp.bind(this));
          svg.addEventListener('click', this.handleClickCapture.bind(this), true);
          svg.addEventListener('wheel', this.handleWheelZoom.bind(this), { passive: false });
          svg.addEventListener('gesturestart', this.handleGestureStart.bind(this), { passive: false });
          svg.addEventListener('gesturechange', this.handleGestureChange.bind(this), { passive: false });
          svg.addEventListener('gestureend', this.handleGestureEnd.bind(this), { passive: false });

          window.addEventListener('resize', this.handleResize.bind(this));

          this.isReady = true;
          if (this.pendingViewport) {
            this.restoreViewport(this.pendingViewport);
            this.pendingViewport = null;
          }
        },

        handleResize: function () {
          updateAdaptiveMetrics(MobileVisualizer.config);
          if (!this.defaultViewBox) {
            this.defaultViewBox = buildDefaultViewBox(this.svg, MobileVisualizer.config);
          }
        },

        handleClickCapture: function (evt) {
          if (!this.suppressClick) return;
          this.suppressClick = false;
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
        },

        handlePointerDown: function (evt) {
          if (evt.button !== undefined && evt.button !== 0) return;

          this.activePointers.set(evt.pointerId, {
            clientX: evt.clientX,
            clientY: evt.clientY
          });

          if (this.activePointers.size === 2) {
            this.beginPinch();
            return;
          }

          if (this.activePointers.size > 1) {
            return;
          }

          const nodeTarget = evt.target.closest('.node-circle[data-id]');
          if (nodeTarget) {
            this.capturePointer(evt.pointerId, nodeTarget);
            this.startNodeInteraction(evt, nodeTarget);
            return;
          }

          if (evt.target !== this.svg) {
            return;
          }

          this.capturePointer(evt.pointerId, this.svg);
          this.startCanvasInteraction(evt);
        },

        handlePointerMove: function (evt) {
          if (this.activePointers.has(evt.pointerId)) {
            this.activePointers.set(evt.pointerId, {
              clientX: evt.clientX,
              clientY: evt.clientY
            });
          }

          if (this.pinchState) {
            this.updatePinch();
            return;
          }

          if (!this.primaryInteraction || this.primaryInteraction.pointerId !== evt.pointerId) {
            return;
          }

          const interaction = this.primaryInteraction;
          const movedDistance = Math.hypot(
            evt.clientX - interaction.startClientX,
            evt.clientY - interaction.startClientY
          );

          if (!interaction.hasMoved && movedDistance >= this.panThresholdPx) {
            interaction.hasMoved = true;
            this.suppressClick = true;
          }

          if (interaction.type === 'node') {
            if (!interaction.hasMoved) return;

            const point = this.toSvgPoint(evt);
            interaction.node.x = point.x - interaction.dragOffsetX;
            interaction.node.y = point.y - interaction.dragOffsetY;
            this.redrawInteractive();
            return;
          }

          if (interaction.type === 'canvas' && interaction.hasMoved) {
            this.applyPan(evt.clientX - interaction.lastClientX, evt.clientY - interaction.lastClientY);
          }

          interaction.lastClientX = evt.clientX;
          interaction.lastClientY = evt.clientY;
        },

        handlePointerUp: function (evt) {
          this.activePointers.delete(evt.pointerId);

          if (this.pinchState && this.activePointers.size < 2) {
            this.pinchState = null;
            this.primaryInteraction = null;
          }

          if (this.primaryInteraction && this.primaryInteraction.pointerId === evt.pointerId) {
            const interaction = this.primaryInteraction;
            const isTap = interaction.type === 'canvas' && !interaction.hasMoved;
            this.primaryInteraction = null;

            if (isTap && this.isAddNodeMode && this.isAddNodeMode() && typeof this.createNodeAt === 'function') {
              this.createNodeAt(interaction.startSvgPoint);
            }
          }

          this.releasePointer(evt.pointerId);
        },

        handleWheelZoom: function (evt) {
          const deltaX = normaliseWheelDelta(evt.deltaX, evt.deltaMode);
          const deltaY = normaliseWheelDelta(evt.deltaY, evt.deltaMode);

          if (evt.ctrlKey) {
            evt.preventDefault();
            if (!deltaY) return;

            const multiplier = Math.exp(-deltaY * MobileVisualizer.config.wheelZoomIntensity);
            this.applyZoom(multiplier, evt.clientX, evt.clientY);
            return;
          }

          if (!deltaX && !deltaY) return;

          evt.preventDefault();
          this.applyPan(-deltaX, -deltaY);
        },

        handleGestureStart: function (evt) {
          evt.preventDefault();
          this.primaryInteraction = null;
          this.gestureState = {
            scale: typeof evt.scale === 'number' && evt.scale > 0 ? evt.scale : 1
          };
        },

        handleGestureChange: function (evt) {
          evt.preventDefault();

          const scale = typeof evt.scale === 'number' && evt.scale > 0 ? evt.scale : 1;
          const clientPoint = getClientPoint(this.svg, evt);

          if (!this.gestureState) {
            this.gestureState = { scale };
            return;
          }

          const multiplier = scale / this.gestureState.scale;
          this.applyZoom(multiplier, clientPoint.x, clientPoint.y);
          this.gestureState.scale = scale;
        },

        handleGestureEnd: function (evt) {
          evt.preventDefault();
          this.gestureState = null;
        },

        startNodeInteraction: function (evt, nodeTarget) {
          if (!this.canDragNode(nodeTarget, evt)) return;

          const nodeId = parseInt(nodeTarget.dataset.id, 10);
          const node = this.getNodes().find(entry => entry.id === nodeId);
          if (!node) return;

          const point = this.toSvgPoint(evt);
          this.primaryInteraction = {
            type: 'node',
            pointerId: evt.pointerId,
            node,
            startClientX: evt.clientX,
            startClientY: evt.clientY,
            lastClientX: evt.clientX,
            lastClientY: evt.clientY,
            dragOffsetX: point.x - node.x,
            dragOffsetY: point.y - node.y,
            hasMoved: false
          };
        },

        startCanvasInteraction: function (evt) {
          this.primaryInteraction = {
            type: 'canvas',
            pointerId: evt.pointerId,
            startClientX: evt.clientX,
            startClientY: evt.clientY,
            lastClientX: evt.clientX,
            lastClientY: evt.clientY,
            startSvgPoint: this.toSvgPoint(evt),
            hasMoved: false
          };
        },

        beginPinch: function () {
          if (this.activePointers.size < 2) return;
          const [first, second] = [...this.activePointers.values()];
          this.primaryInteraction = null;
          this.suppressClick = true;
          this.pinchState = {
            distance: getDistance(first, second),
            midpoint: getMidpoint(first, second)
          };
        },

        updatePinch: function () {
          const pointers = [...this.activePointers.values()];
          if (pointers.length < 2) return;

          const [first, second] = pointers;
          const nextDistance = getDistance(first, second);
          const nextMidpoint = getMidpoint(first, second);

          if (!this.pinchState) {
            this.pinchState = {
              distance: nextDistance,
              midpoint: nextMidpoint
            };
            return;
          }

          const prevMidpoint = this.pinchState.midpoint;
          this.applyPan(nextMidpoint.x - prevMidpoint.x, nextMidpoint.y - prevMidpoint.y);

          if (this.pinchState.distance > 0 && nextDistance > 0) {
            const multiplier = nextDistance / this.pinchState.distance;
            this.applyZoom(multiplier, nextMidpoint.x, nextMidpoint.y);
          }

          this.pinchState.distance = nextDistance;
          this.pinchState.midpoint = nextMidpoint;
        },

        redrawInteractive: function () {
          this.draw();
          if (typeof this.afterInteractiveRedraw === 'function') {
            this.afterInteractiveRedraw();
          }
        },

        capturePointer: function (pointerId, target) {
          if (!target || typeof target.setPointerCapture !== 'function') return;

          target.setPointerCapture(pointerId);
          this.pointerCaptureTargets.set(pointerId, target);
        },

        releasePointer: function (pointerId) {
          const target = this.pointerCaptureTargets.get(pointerId);
          if (!target) return;

          if (typeof target.hasPointerCapture === 'function' && target.hasPointerCapture(pointerId)) {
            target.releasePointerCapture(pointerId);
          }

          this.pointerCaptureTargets.delete(pointerId);
        },

        toSvgPoint: function (evt) {
          return getSvgPoint(this.svg, evt);
        },

        captureViewport: function () {
          if (!this.svg.viewBox || !this.svg.viewBox.baseVal) {
            return this.defaultViewBox ? { ...this.defaultViewBox } : null;
          }
          const baseVal = this.svg.viewBox.baseVal;
          return cloneViewBox(baseVal);
        },

        restoreViewport: function (viewport) {
          if (!viewport) return;
          if (!this.isReady) {
            this.pendingViewport = { ...viewport };
            return;
          }
          setViewBox(this.svg, viewport);
        },

        resetViewport: function () {
          this.defaultViewBox = buildDefaultViewBox(this.svg, MobileVisualizer.config);
          setViewBox(this.svg, this.defaultViewBox);
        },

        applyPan: function (dx, dy) {
          const viewBox = this.svg.viewBox.baseVal;
          if (!viewBox || !this.svg.clientWidth || !this.svg.clientHeight) return;

          viewBox.x -= dx * (viewBox.width / this.svg.clientWidth);
          viewBox.y -= dy * (viewBox.height / this.svg.clientHeight);
        },

        applyZoom: function (multiplier, centerX, centerY) {
          if (!multiplier || multiplier <= 0) return;

          const viewBox = this.svg.viewBox.baseVal;
          const svgPoint = this.toSvgPoint({ clientX: centerX, clientY: centerY });
          const nextWidth = viewBox.width / multiplier;
          const nextHeight = viewBox.height / multiplier;

          if (
            nextWidth < MobileVisualizer.config.minZoomWidth ||
            nextWidth > MobileVisualizer.config.maxZoomWidth
          ) {
            return;
          }

          viewBox.x += ((viewBox.width - nextWidth) * (svgPoint.x - viewBox.x)) / viewBox.width;
          viewBox.y += ((viewBox.height - nextHeight) * (svgPoint.y - viewBox.y)) / viewBox.height;
          viewBox.width = nextWidth;
          viewBox.height = nextHeight;
        }
      };

      controller.init();
      return controller;
    }
  };

  window.MobileVisualizer = MobileVisualizer;
})();
