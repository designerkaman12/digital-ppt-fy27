/* ============================================
   DIGITAL DEPARTMENT PPT — SLIDE ENGINE
   Navigation, Animations, Counter Effects
   ============================================ */

(function () {
    'use strict';

    // State
    let currentSlide = 1;
    const totalSlides = document.querySelectorAll('.slide').length;
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progressBar');
    const slideCounter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const keyboardHint = document.getElementById('keyboardHint');
    const hintClose = document.getElementById('hintClose');

    // Initialize
    function init() {
        updateSlide(1);
        bindEvents();
        showHint();
    }

    // Show/hide keyboard hint
    function showHint() {
        if (sessionStorage.getItem('ppt-hint-shown')) {
            keyboardHint.classList.add('hidden');
            return;
        }
        setTimeout(() => {
            keyboardHint.classList.add('hidden');
            sessionStorage.setItem('ppt-hint-shown', 'true');
        }, 5000);
    }

    hintClose.addEventListener('click', () => {
        keyboardHint.classList.add('hidden');
        sessionStorage.setItem('ppt-hint-shown', 'true');
    });

    // Update slide
    function updateSlide(n) {
        if (n < 1 || n > totalSlides) return;

        // Remove active from all
        slides.forEach(s => s.classList.remove('active'));

        currentSlide = n;

        // Add active to current
        const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
        if (activeSlide) {
            activeSlide.classList.add('active');
        }

        // Update progress bar
        const progress = (currentSlide / totalSlides) * 100;
        progressBar.style.width = progress + '%';

        // Update counter
        const current = String(currentSlide).padStart(2, '0');
        const total = String(totalSlides).padStart(2, '0');
        slideCounter.textContent = `${current} / ${total}`;

        // Update button states
        prevBtn.style.opacity = currentSlide === 1 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentSlide === 1 ? 'none' : 'auto';
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentSlide === totalSlides ? 'none' : 'auto';

        // Trigger counter animations if on metrics slide
        if (activeSlide && activeSlide.classList.contains('slide-dashboard')) {
            animateCounters(activeSlide);
        }
    }

    // Navigate
    function goNext() {
        if (currentSlide < totalSlides) {
            updateSlide(currentSlide + 1);
        }
    }

    function goPrev() {
        if (currentSlide > 1) {
            updateSlide(currentSlide - 1);
        }
    }

    // Counter animation
    function animateCounters(slide) {
        const counters = slide.querySelectorAll('.metric-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;

            const duration = 1500;
            const startTime = performance.now();

            function tick(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                if (counter.classList.contains('suffix-hrs')) {
                    counter.textContent = current + ' hrs';
                } else {
                    counter.textContent = current + '+';
                }

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }

            requestAnimationFrame(tick);
        });
    }

    // Fullscreen toggle
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    }

    // Bind events
    function bindEvents() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    goNext();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    goPrev();
                    break;
                case 'Home':
                    e.preventDefault();
                    updateSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    updateSlide(totalSlides);
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (keyboardHint && !keyboardHint.classList.contains('hidden')) {
                        keyboardHint.classList.add('hidden');
                    }
                    break;
            }
        });

        // Navigation buttons
        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);
        fullscreenBtn.addEventListener('click', toggleFullscreen);

        // Touch/Swipe support
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    goNext();
                } else {
                    goPrev();
                }
            }
        }, { passive: true });

        // Mouse wheel
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 30) goNext();
                else if (e.deltaY < -30) goPrev();
            }, 80);
        }, { passive: true });

        // Click on slide to advance (but not on nav or interactive elements)
        document.addEventListener('click', (e) => {
            const nav = document.getElementById('slideNav');
            const hint = document.getElementById('keyboardHint');

            if (nav && nav.contains(e.target)) return;
            if (hint && hint.contains(e.target)) return;
            if (e.target.closest('a, button, input')) return;

            // Right 2/3 of screen = next, left 1/3 = prev
            const x = e.clientX;
            const width = window.innerWidth;
            if (x > width / 3) {
                goNext();
            } else {
                goPrev();
            }
        });
    }

    // Go!
    init();
})();
