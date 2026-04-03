/* ============================================
   PPT PRESENTATION ENGINE
   Renders content from config, handles navigation,
   animations, counters, and video playback
   ============================================ */
(function () {
    'use strict';

    let currentSlide = 1;
    const totalSlides = 5;
    let config = getConfig();

    function init() {
        applyTheme();
        renderAllSlides();
        updateSlide(1);
        bindEvents();
    }

    // ---- THEME ----
    function applyTheme() {
        document.documentElement.style.cssText = getThemeCSS(config);
        // Animation class
        document.body.className = '';
        document.body.classList.add('anim-' + (config.animation || 'fade-up'));
        document.body.classList.add('anim-' + (config.animationSpeed || 'normal'));
    }

    // ---- RENDER ALL SLIDES ----
    function renderAllSlides() {
        renderIntro();
        renderComparison();
        renderProjections();
        renderStrategy();
        renderThankyou();
    }

    function renderIntro() {
        const s = config.slides.intro;
        const p = config.presenter;
        setText('introBadge', s.badge);
        setText('introTitle', s.title);
        setText('introSubtitle', s.subtitle);
        setText('introDesc', s.description);
        setText('presenterName', p.name);
        setText('presenterRole', p.role);
        setText('presenterDept', p.department);

        // Profile image
        const imgWrap = document.getElementById('introImageWrap');
        const img = document.getElementById('introImage');
        if (s.profileImage) { img.src = s.profileImage; imgWrap.style.display = 'block'; }
        else { imgWrap.style.display = 'none'; }

        // Brands
        const brandsRow = document.getElementById('brandsRow');
        brandsRow.innerHTML = (s.brands || []).map(b =>
            `<span class="brand-chip">${b.logo ? `<img src="${b.logo}" style="height:14px;margin-right:4px;vertical-align:middle">` : ''}${b.name}</span>`
        ).join('');

        // Skills
        const skillsRow = document.getElementById('skillsRow');
        skillsRow.innerHTML = (s.skills || []).map(sk => `<span class="skill-tag">${sk}</span>`).join('');

        // Video
        setupVideoBtn('introVideoBtn', s.video);
    }

    function renderComparison() {
        const s = config.slides.comparison;
        setText('compTitle', s.title);
        setText('compLastLabel', s.lastYearLabel);
        setText('compCurrentLabel', s.currentYearLabel);

        const grid = document.getElementById('compStatsGrid');
        grid.innerHTML = (s.stats || []).map(st => {
            const pctChange = st.isLower
                ? Math.round((1 - st.currentYear / st.lastYear) * 100) + '% faster'
                : (st.lastYear === 0 ? 'NEW' : '↑' + Math.round((st.currentYear / st.lastYear - 1) * 100) + '%');
            return `
                <div class="stat-card">
                    <div class="stat-icon">${st.icon}</div>
                    <div class="stat-label">${st.label}</div>
                    <div class="stat-compare">
                        <span class="stat-old">${st.lastYear}${st.suffix}</span>
                        <span class="stat-arrow">→</span>
                        <span class="stat-new counter" data-target="${st.currentYear}" data-suffix="${st.suffix}">${st.currentYear}${st.suffix}</span>
                    </div>
                    <div class="stat-growth ${st.isLower ? 'down' : ''}">${pctChange}</div>
                </div>`;
        }).join('');

        // Achievements
        const achBox = document.getElementById('compAchievements');
        if (s.achievements && s.achievements.length) {
            achBox.style.display = 'block';
            achBox.innerHTML = `<h4>KEY ACHIEVEMENTS</h4>` +
                s.achievements.map(a => `<div class="ach-item"><span class="ach-check">✓</span>${a}</div>`).join('');
        } else { achBox.style.display = 'none'; }

        setupImage('compImageWrap', 'compImage', s.image);
        setupVideoBtn('compVideoBtn', s.video);
    }

    function renderProjections() {
        const s = config.slides.projections;
        setText('projTitle', s.title);
        setText('projYearLabel', s.yearLabel);

        const grid = document.getElementById('projStatsGrid');
        grid.innerHTML = (s.stats || []).map(st => `
            <div class="proj-card">
                <div class="proj-icon">${st.icon}</div>
                <div class="proj-number counter" data-target="${st.target}" data-suffix="${st.suffix}">${st.target}${st.suffix}</div>
                <div class="proj-label">${st.label}</div>
                <span class="proj-growth ${st.growth === 'NEW' ? 'new-tag' : ''}">
                    ${st.growth === 'NEW' ? 'NEW' : '↑ ' + st.growth}
                </span>
            </div>
        `).join('');

        const goals = document.getElementById('projImpactGoals');
        goals.innerHTML = (s.impactGoals || []).map(g => `
            <div class="impact-chip">
                <span class="impact-metric">${g.metric}</span>
                <span class="impact-target">${g.target}</span>
            </div>
        `).join('');

        setupImage('projImageWrap', 'projImage', s.image);
        setupVideoBtn('projVideoBtn', s.video);
    }

    function renderStrategy() {
        const s = config.slides.strategy;
        setText('stratTitle', s.title);

        const grid = document.getElementById('stratGrid');
        grid.innerHTML = (s.strategies || []).map(st => `
            <div class="strat-card">
                <div class="strat-header">
                    <span class="strat-icon">${st.icon}</span>
                    <span class="strat-tag">${st.tag}</span>
                </div>
                <h4>${st.title}</h4>
                <p>${st.description}</p>
            </div>
        `).join('');

        const miles = document.getElementById('stratMilestones');
        miles.innerHTML = (s.milestones || []).map(m => `
            <div class="milestone">
                <div class="mile-q">${m.quarter}</div>
                <div class="mile-period">${m.period}</div>
                <div class="mile-goal">${m.goal}</div>
            </div>
        `).join('');

        setupImage('stratImageWrap', 'stratImage', s.image);
        setupVideoBtn('stratVideoBtn', s.video);
    }

    function renderThankyou() {
        const s = config.slides.thankyou;
        const p = config.presenter;
        setText('tyTitle', s.title);
        setText('tyHighlight', s.highlight);
        setText('tySubtitle', s.subtitle);
        setText('tyName2', p.name.toUpperCase());
        setText('tyRole2', p.role);
        setText('tyDept2', p.department.toUpperCase());
        setText('tyCompany2', p.company);

        const asks = document.getElementById('tyAsks');
        asks.innerHTML = (s.asks || []).map(a => `<span class="ask-chip">${a}</span>`).join('');

        setupImage('tyImageWrap', 'tyImage', s.image);
        setupVideoBtn('tyVideoBtn', s.video);
    }

    // ---- HELPERS ----
    function setText(id, text) {
        const el = document.getElementById(id);
        if (el && text !== undefined) el.textContent = text;
    }
    function setupImage(wrapId, imgId, url) {
        const wrap = document.getElementById(wrapId);
        const img = document.getElementById(imgId);
        if (url) { img.src = url; wrap.style.display = 'block'; }
        else { wrap.style.display = 'none'; }
    }
    function setupVideoBtn(btnId, url) {
        const btn = document.getElementById(btnId);
        if (url) { btn.style.display = 'flex'; }
        else { btn.style.display = 'none'; }
    }

    // ---- NAVIGATION ----
    function updateSlide(n) {
        if (n < 1 || n > totalSlides) return;
        document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
        currentSlide = n;
        const active = document.querySelector(`[data-slide="${n}"]`);
        if (active) {
            active.classList.add('active');
            triggerAnimations(active);
            animateCounters(active);
        }
        document.getElementById('progressBar').style.width = (n / totalSlides * 100) + '%';
        document.getElementById('slideCounter').textContent =
            String(n).padStart(2, '0') + ' / ' + String(totalSlides).padStart(2, '0');
        document.getElementById('prevBtn').style.opacity = n === 1 ? '0.3' : '1';
        document.getElementById('prevBtn').style.pointerEvents = n === 1 ? 'none' : 'auto';
        document.getElementById('nextBtn').style.opacity = n === totalSlides ? '0.3' : '1';
        document.getElementById('nextBtn').style.pointerEvents = n === totalSlides ? 'none' : 'auto';
    }

    function triggerAnimations(slide) {
        const els = slide.querySelectorAll('.anim-el');
        els.forEach(el => el.classList.remove('visible'));
        els.forEach((el, i) => {
            const delay = parseInt(el.getAttribute('data-delay') || i) * 150;
            setTimeout(() => el.classList.add('visible'), delay + 50);
        });
    }

    function animateCounters(slide) {
        const counters = slide.querySelectorAll('.counter');
        counters.forEach(c => {
            const target = parseInt(c.getAttribute('data-target'));
            const suffix = c.getAttribute('data-suffix') || '';
            if (isNaN(target)) return;
            const start = performance.now();
            const duration = 1200;
            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                c.textContent = Math.round(eased * target) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }

    // ---- VIDEO MODAL ----
    function openVideo(slideKey) {
        const slides = config.slides;
        const url = slides[slideKey] ? slides[slideKey].video : '';
        if (!url) return;
        const embed = getVideoEmbed(url);
        const container = document.getElementById('videoContainer');
        if (embed.match(/\.(mp4|webm|ogg)$/i)) {
            container.innerHTML = `<video controls autoplay><source src="${embed}"></video>`;
        } else {
            container.innerHTML = `<iframe src="${embed}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
        }
        document.getElementById('videoModal').classList.add('active');
    }
    function closeVideo() {
        document.getElementById('videoModal').classList.remove('active');
        document.getElementById('videoContainer').innerHTML = '';
    }

    // ---- EVENTS ----
    function bindEvents() {
        document.getElementById('prevBtn').addEventListener('click', () => updateSlide(currentSlide - 1));
        document.getElementById('nextBtn').addEventListener('click', () => updateSlide(currentSlide + 1));
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
            else document.exitFullscreen().catch(() => {});
        });

        // Video buttons
        document.querySelectorAll('.video-play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openVideo(btn.getAttribute('data-slide-key'));
            });
        });
        document.getElementById('videoClose').addEventListener('click', closeVideo);
        document.getElementById('videoModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('videoModal')) closeVideo();
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('videoModal').classList.contains('active')) {
                if (e.key === 'Escape') closeVideo();
                return;
            }
            switch (e.key) {
                case 'ArrowRight': case 'ArrowDown': case ' ': case 'Enter':
                    e.preventDefault(); updateSlide(currentSlide + 1); break;
                case 'ArrowLeft': case 'ArrowUp':
                    e.preventDefault(); updateSlide(currentSlide - 1); break;
                case 'f': case 'F':
                    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
                    else document.exitFullscreen().catch(() => {}); break;
                case 'Home': e.preventDefault(); updateSlide(1); break;
                case 'End': e.preventDefault(); updateSlide(totalSlides); break;
            }
        });

        // Touch
        let tx = 0;
        document.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
        document.addEventListener('touchend', e => {
            const dx = tx - e.changedTouches[0].screenX;
            if (Math.abs(dx) > 50) { dx > 0 ? updateSlide(currentSlide + 1) : updateSlide(currentSlide - 1); }
        }, { passive: true });

        // Wheel
        let wt;
        document.addEventListener('wheel', e => {
            clearTimeout(wt);
            wt = setTimeout(() => {
                if (e.deltaY > 30) updateSlide(currentSlide + 1);
                else if (e.deltaY < -30) updateSlide(currentSlide - 1);
            }, 100);
        }, { passive: true });

        // Click nav
        document.addEventListener('click', e => {
            if (e.target.closest('.slide-nav, .video-modal, a, button, input')) return;
            e.clientX > window.innerWidth / 3 ? updateSlide(currentSlide + 1) : updateSlide(currentSlide - 1);
        });

        // Listen for config changes from admin (same-origin)
        window.addEventListener('storage', (e) => {
            if (e.key === 'ppt-config') {
                config = getConfig();
                applyTheme();
                renderAllSlides();
                updateSlide(currentSlide);
            }
        });
    }

    init();
})();
