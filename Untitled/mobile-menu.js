(function () {
    var MQ = 768;
    var initialized = false;

    function injectDrawer() {
        var navUl = document.querySelector('#nav-bar ul');
        if (!navUl) return null;

        var links = navUl.querySelectorAll('.nav-link');

        // Build overlay
        var overlay = document.createElement('div');
        overlay.className = 'side-drawer-overlay';
        overlay.id = 'side-drawer-overlay';

        // Build drawer
        var drawer = document.createElement('div');
        drawer.className = 'side-drawer';
        drawer.id = 'side-drawer';

        var handle = document.createElement('div');
        handle.className = 'side-drawer-handle';
        drawer.appendChild(handle);

        var drawerNav = document.createElement('nav');
        drawerNav.className = 'side-drawer-nav';
        links.forEach(function (link) {
            var a = document.createElement('a');
            a.href = link.href;
            a.className = 'side-drawer-link';
            if (link.classList.contains('active')) {
                a.classList.add('active');
            }
            a.textContent = link.textContent;
            drawerNav.appendChild(a);
        });
        drawer.appendChild(drawerNav);

        document.body.appendChild(overlay);
        document.body.appendChild(drawer);

        // Add hamburger button
        var navContainer = document.querySelector('.nav-container');
        var hamburger = document.createElement('button');
        hamburger.className = 'hamburger-btn';
        hamburger.id = 'hamburger-btn';
        hamburger.setAttribute('aria-label', 'Open Menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        navContainer.insertBefore(hamburger, navContainer.firstChild);

        return { overlay: overlay, drawer: drawer, hamburger: hamburger };
    }

    function initMobileMenu() {
        if (initialized) return;
        initialized = true;

        var elements = injectDrawer();
        if (!elements) return;

        var overlay = elements.overlay;
        var drawer = elements.drawer;
        var hamburger = elements.hamburger;

        var isOpen = false;

        // Drag state
        var startX = 0;
        var lastX = 0;
        var isDragging = false;
        var drawerWidth = 0;

        function openDrawer() {
            isOpen = true;
            drawer.classList.add('open');
            overlay.classList.add('open');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Clear any leftover inline styles
            drawer.style.transform = '';
            drawer.style.transition = '';
            overlay.style.opacity = '';
            overlay.style.transition = '';
        }

        function closeDrawer() {
            isOpen = false;
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            // Clear all inline styles so CSS takes over
            drawer.style.transform = '';
            drawer.style.transition = '';
            overlay.style.opacity = '';
            overlay.style.transition = '';
        }

        function resetDragState() {
            isDragging = false;
            startX = 0;
            lastX = 0;
            drawerWidth = 0;
            // Restore CSS transitions
            drawer.style.transition = '';
            overlay.style.transition = '';
        }

        // Hamburger toggle
        hamburger.addEventListener('click', function () {
            if (isOpen) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        // Close on overlay click
        overlay.addEventListener('click', function () {
            if (isOpen) closeDrawer();
        });

        // Close on link click
        drawer.querySelectorAll('.side-drawer-link').forEach(function (link) {
            link.addEventListener('click', function () {
                closeDrawer();
            });
        });

        // --- Touch/swipe to close ---

        drawer.addEventListener('touchstart', function (e) {
            if (!isOpen) return;
            startX = e.touches[0].clientX;
            lastX = startX;
            isDragging = true;
            drawerWidth = drawer.offsetWidth;
            // Disable CSS transitions during drag for direct manipulation
            drawer.style.transition = 'none';
            overlay.style.transition = 'none';
        }, { passive: true });

        drawer.addEventListener('touchmove', function (e) {
            if (!isDragging || !isOpen) return;

            lastX = e.touches[0].clientX;
            var diff = lastX - startX;

            // Clamp: only allow leftward drag (negative diff), not past -drawerWidth
            var clampedDiff = Math.max(Math.min(diff, 0), -drawerWidth);

            // Direct 1:1 mapping — drawer follows the finger exactly
            drawer.style.transform = 'translateX(' + clampedDiff + 'px)';

            // Overlay opacity: proportional to how much drawer is still visible
            // Using a gentle ease so it doesn't vanish too aggressively
            var openRatio = 1 - Math.abs(clampedDiff) / drawerWidth; // 1 = fully open, 0 = fully closed
            var easedOpacity = openRatio * openRatio; // quadratic ease for smoother fade
            overlay.style.opacity = easedOpacity;
        }, { passive: true });

        drawer.addEventListener('touchend', function () {
            if (!isDragging) return;

            var diff = lastX - startX;
            var clampedDiff = Math.max(Math.min(diff, 0), -drawerWidth);
            var progress = Math.abs(clampedDiff) / drawerWidth; // 0 = open, 1 = closed

            // Reset drag state and restore transitions BEFORE triggering close/snap
            resetDragState();

            // If dragged past 30% or beyond, close; otherwise snap back
            if (progress > 0.3) {
                closeDrawer();
            } else {
                // Snap back to fully open — clear inline transform so CSS .open takes over
                drawer.style.transform = '';
                overlay.style.opacity = '';
            }
        });

        // Handle touch cancel (e.g., incoming call, browser gesture conflict)
        drawer.addEventListener('touchcancel', function () {
            if (!isDragging) return;
            resetDragState();
            // Snap back to current state without closing
            if (isOpen) {
                drawer.style.transform = '';
                overlay.style.opacity = '';
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) closeDrawer();
        });

        // Sync isOpen with resize (e.g., rotating phone, DevTools resize)
        window.addEventListener('resize', function () {
            if (window.innerWidth > MQ && isOpen) {
                closeDrawer();
            }
        });
    }

    // Init on mobile
    if (window.innerWidth <= MQ) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMobileMenu);
        } else {
            initMobileMenu();
        }
    }

    // Also init if window is resized down to mobile (e.g., DevTools responsive mode)
    window.addEventListener('resize', function () {
        if (window.innerWidth <= MQ && !initialized) {
            initMobileMenu();
        }
    });
})();
