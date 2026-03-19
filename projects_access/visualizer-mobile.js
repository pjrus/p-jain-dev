/**
 * visualizer-mobile.js
 * Comprehensive mobile optimization layer for algorithm visualizers.
 * Provides adaptive scaling, touch gesture support (pan/zoom), 
 * and responsive utility functions.
 */

window.MobileVisualizer = {
    // Current Scale context
    scale: 1,
    offset: { x: 0, y: 0 },
    
    // Configurable breakpoints and constants
    config: {
        minNodeRadius: 12,
        maxNodeRadius: 22,
        baseWidth: 1000, // Standard "virtual" width
        baseHeight: 600,
        mobileBreakpoint: 768
    },

    /**
     * Initialize mobile-friendly SVG behavior
     * @param {SVGElement} svg 
     * @param {Function} onRedrawCallback
     */
    init: function(svg, onRedrawCallback) {
        this.svg = svg;
        this.onRedraw = onRedrawCallback;
        
        // Prevent default browser behaviors
        this.svg.style.userSelect = 'none';
        this.svg.style.webkitUserSelect = 'none';
        this.svg.style.touchAction = 'none';
        
        this.updateViewport();
        window.addEventListener('resize', () => {
            this.updateViewport();
            if (this.onRedraw) this.onRedraw();
        });

        this.setupGestures();
    },

    /**
     * Compute adaptive sizes based on current screen width
     */
    getAdaptiveMetrics: function() {
        const width = window.innerWidth;
        const isMobile = width < this.config.mobileBreakpoint;
        
        // Dynamic node radius: smaller on mobile, larger on desktop
        // Scale is roughly based on viewport width vs baseWidth
        const scaleFactor = Math.min(1.2, Math.max(0.6, width / this.config.baseWidth));
        
        return {
            nodeRadius: Math.floor(this.config.maxNodeRadius * scaleFactor),
            fontSize: Math.floor(14 * scaleFactor),
            isMobile: isMobile,
            scaleFactor: scaleFactor
        };
    },

    /**
     * Updates the SVG viewBox for proper responsiveness
     */
    updateViewport: function() {
        if (!this.svg) return;
        
        const metrics = this.getAdaptiveMetrics();
        document.documentElement.style.setProperty('--node-radius', `${metrics.nodeRadius}px`);
        document.documentElement.style.setProperty('--font-size-base', `${metrics.fontSize}px`);
        
        // If no explicit viewBox is set, we might want to center the content
        // For now, let's just make sure the SVG coordinate space is consistent
        if (!this.svg.getAttribute('viewBox')) {
            const rect = this.svg.getBoundingClientRect();
            this.svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
        }
    },

    /**
     * Setup Pan and Zoom (Pinch) behaviors
     */
    setupGestures: function() {
        let lastTouches = [];
        let isPanning = false;

        this.svg.addEventListener('pointerdown', (e) => {
            // Only start panning if we aren't clicking on a node (handled by the visualizer)
            // Or if we are using two fingers
            if (e.target === this.svg) {
                isPanning = true;
                this.lastX = e.clientX;
                this.lastY = e.clientY;
            }
        });

        window.addEventListener('pointermove', (e) => {
            if (isPanning) {
                const dx = e.clientX - this.lastX;
                const dy = e.clientY - this.lastY;
                this.applyPan(dx, dy);
                this.lastX = e.clientX;
                this.lastY = e.clientY;
            }
        });

        window.addEventListener('pointerup', () => {
            isPanning = false;
        });

        // Pinch to zoom (Standard implementation using Pointer Events)
        const evCache = [];
        let prevDiff = -1;

        this.svg.addEventListener('pointerdown', (ev) => { 
            evCache.push(ev); 
        });

        this.svg.addEventListener('pointermove', (ev) => {
            // Find this event in the cache and update its record with this event
            const index = evCache.findIndex((cachedEv) => cachedEv.pointerId === ev.pointerId);
            if (index >= 0) evCache[index] = ev;

            // If two pointers are down, check for pinch gestures
            if (evCache.length === 2) {
                const curDiff = Math.hypot(evCache[0].clientX - evCache[1].clientX, evCache[0].clientY - evCache[1].clientY);

                if (prevDiff > 0) {
                    const zoomChange = curDiff / prevDiff;
                    const centerX = (evCache[0].clientX + evCache[1].clientX) / 2;
                    const centerY = (evCache[0].clientY + evCache[1].clientY) / 2;
                    this.applyZoom(zoomChange, centerX, centerY);
                }
                prevDiff = curDiff;
            }
        });

        const onPointerUp = (ev) => {
            const index = evCache.findIndex((cachedEv) => cachedEv.pointerId === ev.pointerId);
            if (index >= 0) evCache.splice(index, 1);
            if (evCache.length < 2) prevDiff = -1;
        };

        this.svg.addEventListener('pointerup', onPointerUp);
        this.svg.addEventListener('pointercancel', onPointerUp);
        this.svg.addEventListener('pointerout', onPointerUp);
        this.svg.addEventListener('pointerleave', onPointerUp);
    },

    applyPan: function(dx, dy) {
        const vb = this.svg.viewBox.baseVal;
        // Adjust for scale
        vb.x -= dx * (vb.width / this.svg.clientWidth);
        vb.y -= dy * (vb.height / this.svg.clientHeight);
    },

    applyZoom: function(multiplier, centerX, centerY) {
        const vb = this.svg.viewBox.baseVal;
        const pt = this.svg.createSVGPoint();
        pt.x = centerX;
        pt.y = centerY;
        const svgPt = pt.matrixTransform(this.svg.getScreenCTM().inverse());

        const newWidth = vb.width / multiplier;
        const newHeight = vb.height / multiplier;

        // Keep it within reasonable bounds
        if (newWidth > 100 && newWidth < 5000) {
            vb.x += (vb.width - newWidth) * (svgPt.x - vb.x) / vb.width;
            vb.y += (vb.height - newHeight) * (svgPt.y - vb.y) / vb.height;
            vb.width = newWidth;
            vb.height = newHeight;
        }
    },

    /**
     * Utility to create a node that is responsive to the current theme
     */
    createResponsiveNode: function(id, x, y) {
        const metrics = this.getAdaptiveMetrics();
        return {
            id: id,
            x: x,
            y: y,
            r: metrics.nodeRadius
        };
    }
};
