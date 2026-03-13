(function () {
    // 1. Inject Theme Stylesheet if not already present (failsafe)
    // We assume the HTML files will link it, but good to ensure variables depend on it.

    // 2. Inject Toggle Button and Back Link
    document.addEventListener('DOMContentLoaded', () => {
        const controlButtonSelector = '#typeControls button, #toolbar button, #stepControls button, #manualControls button, #randomControls button, #controls button, #buildControls button, #compressControls button';
        const lightModeButtonClasses = [
            '!bg-slate-50',
            '!text-slate-950',
            '!border-slate-300',
            '!shadow-sm',
            'hover:!bg-slate-100',
            'hover:!border-slate-400'
        ];

        function applyButtonThemeClasses(isLight) {
            const buttons = document.querySelectorAll(controlButtonSelector);
            buttons.forEach(button => {
                lightModeButtonClasses.forEach(className => {
                    button.classList.toggle(className, isLight);
                });
            });
        }

        // Create Toggle Button
        const btn = document.createElement('button');
        btn.id = 'theme-toggle-btn';
        btn.setAttribute('aria-label', 'Toggle Dark Mode');
        btn.innerHTML = '☀️'; // Default icon
        document.body.appendChild(btn);

        // Create Back Link if not present
        if (!document.querySelector('.back-link')) {
            const link = document.createElement('a');
            link.className = 'back-link';
            link.href = 'index.html'; // Points to playground index
            link.innerHTML = '← Back';
            document.body.appendChild(link);
        }

        // Theme Logic
        const html = document.documentElement;
        const storedTheme = localStorage.getItem('theme');

        // Default to Dark if no preference
        const currentTheme = storedTheme || 'dark';
        setTheme(currentTheme);

        function setTheme(theme) {
            if (theme === 'light') {
                html.setAttribute('data-theme', 'light');
                btn.innerHTML = '🌙'; // Icon to switch to dark
                localStorage.setItem('theme', 'light');
                applyButtonThemeClasses(true);
            } else {
                html.removeAttribute('data-theme');
                btn.innerHTML = '☀️'; // Icon to switch to light
                localStorage.setItem('theme', 'dark');
                applyButtonThemeClasses(false);
            }
        }

        btn.addEventListener('click', () => {
            const isLight = html.getAttribute('data-theme') === 'light';
            setTheme(isLight ? 'dark' : 'light');
        });

        const isVisualizerPage = document.querySelector('svg') !== null;
        if (isVisualizerPage && !document.querySelector('.visualizer-footer')) {
            const footer = document.createElement('footer');
            footer.className = 'visualizer-footer mt-6 mb-4 text-center text-sm';
            footer.innerHTML = 'Built for interactive learning • Practice by creating your own examples';
            document.body.appendChild(footer);
        }
    });
})();
