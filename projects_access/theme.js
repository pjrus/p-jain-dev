(function () {
    // Shared Contrast Logic (Exported to window for use in drawGraph)
    window.updateNodeTextContrast = function() {
        const texts = document.querySelectorAll('svg text');
        texts.forEach(text => {
            const parent = text.parentElement;
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(text);
            
            let bgElement = null;
            for (let i = index - 1; i >= 0; i--) {
                const tag = siblings[i].tagName.toLowerCase();
                if (tag === 'circle' || tag === 'rect' || tag === 'ellipse') {
                    bgElement = siblings[i];
                    break;
                }
            }

            if (bgElement) {
                const fill = window.getComputedStyle(bgElement).fill;
                const luminance = (function(color) {
                    let r, g, b;
                    if (color.startsWith('rgb')) {
                        const values = color.match(/\d+/g);
                        [r, g, b] = values.slice(0, 3).map(Number);
                    } else if (color.startsWith('#')) {
                        const hex = color.slice(1);
                        r = parseInt(hex.substring(0, 2), 16);
                        g = parseInt(hex.substring(2, 4), 16);
                        b = parseInt(hex.substring(4, 6), 16);
                    } else return 0.5;
                    
                    const a = [r, g, b].map(v => {
                        v /= 255;
                        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
                    });
                    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
                })(fill);
                text.style.setProperty('fill', (luminance > 0.45) ? '#000000' : '#ffffff', 'important');
            }
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        // Core Theme Detection and Application
        const html = document.documentElement;
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

        function setTheme(theme, persist = true) {
            if (theme === 'light') {
                html.setAttribute('data-theme', 'light');
                if (persist) localStorage.setItem('theme', 'light');
            } else {
                html.removeAttribute('data-theme');
                if (persist) localStorage.setItem('theme', 'dark');
            }
            updateToggleButton();
            setTimeout(window.updateNodeTextContrast, 100);
        }

        function updateToggleButton() {
            const btn = document.getElementById('theme-toggle-btn');
            if (btn) {
                const isLight = html.getAttribute('data-theme') === 'light';
                btn.innerHTML = isLight ? '<i class="bi bi-moon-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
                btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
            }
        }

        // Initialize UI
        if (!document.querySelector('link[href*="bootstrap-icons"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css';
            document.head.appendChild(link);
        }

        let btn = document.getElementById('theme-toggle-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'theme-toggle-btn';
            document.body.appendChild(btn);
        }

        btn.addEventListener('click', () => {
            const isLight = html.getAttribute('data-theme') === 'light';
            setTheme(isLight ? 'dark' : 'light');
        });

        if (!document.querySelector('.back-link')) {
            const link = document.createElement('a');
            link.className = 'back-link';
            link.href = 'index.html';
            link.innerHTML = '<i class="bi bi-arrow-left"></i> Back';
            document.body.appendChild(link);
        }

        // Apply Initial Theme
        setTheme(initialTheme, false);

        // UI Polish: Replace icons in existing buttons
        document.querySelectorAll('button').forEach(button => {
            button.innerHTML = button.innerHTML
                .replace('◀', '<i class="bi bi-caret-left-fill"></i>')
                .replace('▶', '<i class="bi bi-caret-right-fill"></i>')
                .replace('←', '<i class="bi bi-arrow-left"></i>');
        });

        // Add visualizer footer
        const isVisualizerPage = document.querySelector('svg') !== null;
        if (isVisualizerPage && !document.querySelector('.visualizer-footer')) {
            const footer = document.createElement('footer');
            footer.className = 'visualizer-footer';
            footer.innerHTML = 'Built for interactive learning • Practice by creating your own examples<br>© 2026 Paarangat Jain';
            document.body.appendChild(footer);
        }
    });

    // Handle system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            window.location.reload(); // Hard reload for system sync if no manual override exists
        }
    });
})();
