(function () {
  var DEFAULT_THEME = 'dark';
  var DEFAULT_SCHEME = 'soft-ash';
  var LIGHT_AESTHETIC = 'light';
  var STORAGE_THEME = 'theme';
  var STORAGE_SCHEME = 'theme-scheme';
  var STORAGE_AESTHETIC = 'theme-aesthetic';
  var STORAGE_LAST_DARK_SCHEME = 'theme-last-dark-scheme';
  var html = document.documentElement;
  var toggleButton = document.getElementById('theme-toggle');
  var schemeSelect = document.getElementById('theme-scheme-select');
  var validAesthetics = schemeSelect
    ? Array.prototype.map.call(schemeSelect.options, function (option) {
        return option.value;
      })
    : [LIGHT_AESTHETIC, DEFAULT_SCHEME];

  if (!toggleButton) {
    return;
  }

  var icon = toggleButton.querySelector('i');
  var darkAesthetics = validAesthetics.filter(function (value) {
    return value !== LIGHT_AESTHETIC;
  });

  if (darkAesthetics.indexOf(DEFAULT_SCHEME) === -1) {
    darkAesthetics.unshift(DEFAULT_SCHEME);
  }

  function isValidDarkScheme(value) {
    return darkAesthetics.indexOf(value) >= 0;
  }

  function getStoredDarkScheme() {
    var storedLastDark = localStorage.getItem(STORAGE_LAST_DARK_SCHEME);
    if (isValidDarkScheme(storedLastDark)) {
      return storedLastDark;
    }

    var storedScheme = localStorage.getItem(STORAGE_SCHEME);
    if (isValidDarkScheme(storedScheme)) {
      return storedScheme;
    }

    return DEFAULT_SCHEME;
  }

  function getStoredAesthetic() {
    var storedAesthetic = localStorage.getItem(STORAGE_AESTHETIC);
    if (validAesthetics.indexOf(storedAesthetic) >= 0) {
      return storedAesthetic;
    }

    var storedTheme = localStorage.getItem(STORAGE_THEME) || DEFAULT_THEME;
    if (storedTheme === LIGHT_AESTHETIC) {
      return LIGHT_AESTHETIC;
    }

    return getStoredDarkScheme();
  }

  function getSelectLabel(value) {
    if (!schemeSelect) {
      return value;
    }

    var selectedOption = Array.prototype.find.call(schemeSelect.options, function (option) {
      return option.value === value;
    });

    return selectedOption ? selectedOption.text : value;
  }

  function syncControls(currentAesthetic, darkScheme) {
    if (icon) {
      icon.className = currentAesthetic === LIGHT_AESTHETIC ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
    }

    if (schemeSelect) {
      schemeSelect.value = currentAesthetic;
      schemeSelect.title = 'Current aesthetic: ' + getSelectLabel(currentAesthetic);
    }

    var toggleLabel = currentAesthetic === LIGHT_AESTHETIC
      ? 'Switch to ' + getSelectLabel(darkScheme)
      : 'Switch to Light';

    toggleButton.setAttribute('aria-label', toggleLabel);
    toggleButton.title = toggleLabel;
  }

  function applyAesthetic(aesthetic) {
    var nextAesthetic = validAesthetics.indexOf(aesthetic) >= 0 ? aesthetic : DEFAULT_SCHEME;
    var darkScheme = nextAesthetic === LIGHT_AESTHETIC ? getStoredDarkScheme() : nextAesthetic;

    html.setAttribute('data-theme-scheme', darkScheme);

    if (nextAesthetic === LIGHT_AESTHETIC) {
      html.setAttribute('data-theme', LIGHT_AESTHETIC);
      localStorage.setItem(STORAGE_THEME, LIGHT_AESTHETIC);
      localStorage.setItem(STORAGE_AESTHETIC, LIGHT_AESTHETIC);
      localStorage.setItem(STORAGE_SCHEME, darkScheme);
      syncControls(nextAesthetic, darkScheme);
      return;
    }

    html.removeAttribute('data-theme');
    localStorage.setItem(STORAGE_THEME, DEFAULT_THEME);
    localStorage.setItem(STORAGE_SCHEME, darkScheme);
    localStorage.setItem(STORAGE_LAST_DARK_SCHEME, darkScheme);
    localStorage.setItem(STORAGE_AESTHETIC, darkScheme);
    syncControls(darkScheme, darkScheme);
  }

  applyAesthetic(getStoredAesthetic());

  toggleButton.addEventListener('click', function () {
    var currentTheme = html.getAttribute('data-theme');
    applyAesthetic(currentTheme === LIGHT_AESTHETIC ? getStoredDarkScheme() : LIGHT_AESTHETIC);
  });

  if (schemeSelect) {
    schemeSelect.addEventListener('change', function (event) {
      applyAesthetic(event.target.value);
    });
  }
})();
