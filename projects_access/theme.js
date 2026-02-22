(function () {
    // 1. Inject Theme Stylesheet if not already present (failsafe)
    // We assume the HTML files will link it, but good to ensure variables depend on it.

    // 2. Inject Toggle Button and Back Link
    document.addEventListener('DOMContentLoaded', () => {
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
            } else {
                html.removeAttribute('data-theme');
                btn.innerHTML = '☀️'; // Icon to switch to light
                localStorage.setItem('theme', 'dark');
            }
        }

        btn.addEventListener('click', () => {
            const isLight = html.getAttribute('data-theme') === 'light';
            setTheme(isLight ? 'dark' : 'light');
        });
    });
})();
