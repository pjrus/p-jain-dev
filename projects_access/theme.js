(function () {
  var PAGE_META = {
    'avl_tree_balance.html': {
      family: 'Trees',
      description: 'Insert, remove, and step through rebalancing decisions while the tree updates live.'
    },
    'two_three_tree.html': {
      family: 'Trees',
      description: 'Explore split and merge behavior in a 2-3 tree with guided insert and remove actions.'
    },
    'tree-visualiser.html': {
      family: 'Trees',
      description: 'Visualize left-leaning red-black tree operations and inspect the balancing rules step by step.'
    },
    'prefix_trie.html': {
      family: 'Tries',
      description: 'Build a prefix trie interactively and watch words branch into shared prefixes.'
    },
    'suffix_trie.html': {
      family: 'Tries',
      description: 'Construct and compress suffix tries to compare raw and optimized representations.'
    },
    'graph_traversal_visualiser.html': {
      family: 'Traversals',
      description: 'Switch between BFS and DFS while building your own directed or undirected graphs.'
    },
    'dfs_visualiser.html': {
      family: 'Traversals',
      description: 'Step through DFS state changes with explicit traversal controls and graph editing tools.'
    },
    'dijkstra_visualiser.html': {
      family: 'Shortest Paths',
      description: 'Run Dijkstra step by step and inspect how distances and parent choices evolve.'
    },
    'bellman_ford.html': {
      family: 'Shortest Paths',
      description: 'Trace Bellman-Ford relaxations across weighted graphs, including difficult edge configurations.'
    },
    'ford_fulkerson.html': {
      family: 'Flows',
      description: 'Experiment with augmenting paths and max-flow updates in an interactive network.'
    },
    'mst_visualiser.html': {
      family: 'Minimum Spanning Trees',
      description: 'Compare Prim and Kruskal workflows on the same graph inside one visual workspace.'
    },
    'prims_algorithm.html': {
      family: 'Minimum Spanning Trees',
      description: 'Focus on Prim\'s algorithm with step-by-step controls and interactive graph editing.'
    }
  };

  var STORAGE_THEME = 'theme';
  var html = document.documentElement;

  function inferLuminance(color) {
    var r;
    var g;
    var b;

    if (!color) {
      return 0.5;
    }

    if (color.indexOf('rgb') === 0) {
      var values = color.match(/\d+/g) || [];
      r = Number(values[0] || 0);
      g = Number(values[1] || 0);
      b = Number(values[2] || 0);
    } else if (color[0] === '#') {
      var hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex.split('').map(function (char) { return char + char; }).join('');
      }
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      return 0.5;
    }

    var normalized = [r, g, b].map(function (value) {
      var channel = value / 255;
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    });

    return normalized[0] * 0.2126 + normalized[1] * 0.7152 + normalized[2] * 0.0722;
  }

  window.updateNodeTextContrast = function () {
    var texts = document.querySelectorAll('svg text');

    texts.forEach(function (text) {
      var parent = text.parentElement;
      if (!parent) {
        return;
      }

      var siblings = Array.from(parent.children);
      var index = siblings.indexOf(text);
      var bgElement = null;

      for (var i = index - 1; i >= 0; i -= 1) {
        var tag = siblings[i].tagName ? siblings[i].tagName.toLowerCase() : '';
        if (tag === 'circle' || tag === 'rect' || tag === 'ellipse') {
          bgElement = siblings[i];
          break;
        }
      }

      if (bgElement) {
        var fill = window.getComputedStyle(bgElement).fill;
        text.style.setProperty('fill', inferLuminance(fill) > 0.45 ? '#000000' : '#ffffff', 'important');
      }
    });
  };

  function getPageName() {
    var parts = window.location.pathname.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  function getPageMeta() {
    return PAGE_META[getPageName()] || {
      family: 'Visualizer',
      description: 'Interactive algorithm playground styled to match the main site dark palette.'
    };
  }

  function ensureBootstrapIcons() {
    if (document.querySelector('link[href*="bootstrap-icons"]')) {
      return;
    }

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(link);
  }

  function setTheme(theme, persist) {
    var nextTheme = theme === 'light' ? 'light' : 'dark';
    if (nextTheme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }

    if (persist !== false) {
      localStorage.setItem(STORAGE_THEME, nextTheme);
    }

    updateToggleButton();
    window.setTimeout(window.updateNodeTextContrast, 80);
  }

  function updateToggleButton() {
    var button = document.getElementById('theme-toggle-btn');
    if (!button) {
      return;
    }

    var isLight = html.getAttribute('data-theme') === 'light';
    button.innerHTML = isLight ? '<i class="bi bi-moon-stars-fill"></i>' : '<i class="bi bi-brightness-high-fill"></i>';
    button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    button.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  }

  function ensureToggleButton() {
    var button = document.getElementById('theme-toggle-btn');
    if (!button) {
      button = document.createElement('button');
      button.id = 'theme-toggle-btn';
      document.body.appendChild(button);
    }

    button.addEventListener('click', function () {
      var isLight = html.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light', true);
    });
  }

  function ensureBackLink() {
    if (document.querySelector('.back-link') || getPageName() === 'index.html') {
      return;
    }

    var link = document.createElement('a');
    link.className = 'back-link';
    link.href = 'index.html';
    link.innerHTML = '<i class="bi bi-arrow-left"></i><span>All Apps</span>';
    document.body.appendChild(link);
  }

  function ensureFooter() {
    if (document.querySelector('.visualizer-footer')) {
      return;
    }

    var footer = document.createElement('footer');
    footer.className = 'visualizer-footer';
    footer.innerHTML = 'Built for interactive learning and fast experimentation.<br>&copy; 2026 Paarangat Jain';
    document.body.appendChild(footer);
  }

  function addSectionLabel(panel, text) {
    if (!panel || panel.querySelector('.project-section-label')) {
      return;
    }

    var label = document.createElement('p');
    label.className = 'project-section-label';
    label.textContent = text;
    panel.insertBefore(label, panel.firstChild);
  }

  function wrapSvg(svg) {
    if (!svg || svg.closest('.project-canvas-panel') || svg.closest('#svgContainer, .svg-container, #treesContainer')) {
      return;
    }

    var panel = document.createElement('section');
    panel.className = 'project-canvas-panel';
    addSectionLabel(panel, 'Workspace');
    svg.parentNode.insertBefore(panel, svg);
    panel.appendChild(svg);
  }

  function enhanceControlGroup(selector, label, extraClass) {
    var element = document.querySelector(selector);
    if (!element) {
      return;
    }

    element.classList.add('project-panel');
    if (extraClass) {
      element.classList.add(extraClass);
    }
    addSectionLabel(element, label);
  }

  function buildShell() {
    if (getPageName() === 'index.html' || document.querySelector('.project-page-shell')) {
      return;
    }

    document.body.classList.add('projects-visualizer-page');

    var title = document.querySelector('h1');
    if (!title) {
      return;
    }

    var meta = getPageMeta();
    var shell = document.createElement('div');
    shell.className = 'project-page-shell';

    var header = document.createElement('header');
    header.className = 'project-page-header';

    var kicker = document.createElement('div');
    kicker.className = 'project-page-kicker';
    kicker.innerHTML = '<i class="bi bi-grid-1x2-fill"></i><span>' + meta.family + '</span>';
    header.appendChild(kicker);

    title.classList.add('project-title');
    header.appendChild(title);

    var description = document.createElement('p');
    description.className = 'project-page-description';
    description.textContent = meta.description;
    header.appendChild(description);

    var content = document.createElement('div');
    content.className = 'project-page-content';

    shell.appendChild(header);
    shell.appendChild(content);

    var children = Array.from(document.body.children);
    var inserted = false;

    children.forEach(function (child) {
      if (child === shell || child.classList.contains('back-link') || child.id === 'theme-toggle-btn' || child.classList.contains('visualizer-footer')) {
        return;
      }

      if (!inserted && child.tagName && child.tagName.toLowerCase() === 'script') {
        document.body.insertBefore(shell, child);
        inserted = true;
      }

      if (child.tagName && child.tagName.toLowerCase() !== 'script' && child !== shell) {
        content.appendChild(child);
      }
    });

    if (!inserted) {
      document.body.insertBefore(shell, document.body.firstChild);
    }

    enhanceControlGroup('#typeControls', 'Mode', 'project-toolbar');
    enhanceControlGroup('#toolbar', 'Controls', 'project-toolbar');
    enhanceControlGroup('#controls', 'Controls', 'project-inline-controls');
    enhanceControlGroup('#manualControls', 'Manual Input', 'project-inline-controls');
    enhanceControlGroup('#randomControls', 'Generate Sample', 'project-inline-controls');
    enhanceControlGroup('#buildControls', 'Build', 'project-inline-controls');
    enhanceControlGroup('#compressControls', 'Compression', 'project-inline-controls');
    enhanceControlGroup('#stepToggle', 'Playback', 'project-inline-controls');
    enhanceControlGroup('#stepControls', 'Step Controls', 'project-step-panel');

    Array.from(document.querySelectorAll('svg')).forEach(wrapSvg);

    ['#svgContainer', '.svg-container', '#treesContainer'].forEach(function (selector) {
      Array.from(document.querySelectorAll(selector)).forEach(function (element) {
        if (element.closest('.project-canvas-panel')) {
          return;
        }

        var panel = document.createElement('section');
        panel.className = 'project-canvas-panel';
        addSectionLabel(panel, 'Workspace');
        element.parentNode.insertBefore(panel, element);
        panel.appendChild(element);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureBootstrapIcons();

    var storedTheme = localStorage.getItem(STORAGE_THEME);
    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(storedTheme || (systemPrefersDark ? 'dark' : 'light'), false);

    if (getPageName() === 'index.html') {
      document.body.classList.add('projects-index-page');
    } else {
      buildShell();
      ensureBackLink();
      ensureFooter();
    }

    ensureToggleButton();
    updateToggleButton();

    document.querySelectorAll('button').forEach(function (button) {
      button.innerHTML = button.innerHTML
        .replace('◀', '<i class="bi bi-caret-left-fill"></i>')
        .replace('▶', '<i class="bi bi-caret-right-fill"></i>')
        .replace('←', '<i class="bi bi-arrow-left"></i>');
    });

    window.setTimeout(window.updateNodeTextContrast, 120);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
    if (!localStorage.getItem(STORAGE_THEME)) {
      setTheme(event.matches ? 'dark' : 'light', false);
    }
  });
})();
