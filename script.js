/* ============================================
   PPT ENGINE — Renders from config, handles
   navigation, animations, counters, video, gallery
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

    function applyTheme() {
        document.documentElement.style.cssText = getThemeCSS(config);
        document.body.className = 'anim-' + (config.animation || 'fade-up') + ' anim-' + (config.animationSpeed || 'normal');
    }

    // ========== RENDER ALL ==========
    function renderAllSlides() {
        renderIntro();
        renderComparison();
        renderProjections();
        renderStrategy();
        renderThankyou();
    }

    // ----- SLIDE 1: KRA -----
    function renderIntro() {
        const s = config.slides.intro;
        const p = config.presenter;
        setText('introBadge', s.badge);
        setText('introTitle', s.title || p.name);
        setText('introSubtitle', s.subtitle || p.role);
        setText('introDesc', s.description);

        // Profile
        const imgW = document.getElementById('introImageWrap');
        const img = document.getElementById('introImage');
        if (s.profileImage) { img.src = s.profileImage; imgW.style.display = 'block'; } else { imgW.style.display = 'none'; }

        // Brand KRA Cards
        const grid = document.getElementById('brandKraGrid');
        grid.innerHTML = (s.brands || []).map(b => `
            <div class="brand-kra-card" style="--brand-color:${b.color || 'var(--accent-1)'}">
                <style>.brand-kra-card[style*="${b.color}"]::before{background:${b.color}}</style>
                <div class="brand-name" style="color:${b.color}">${b.name}</div>
                <div class="brand-platforms">${b.platforms || ''}</div>
                ${(b.tasks || []).map(t => `<div class="brand-task">${t}</div>`).join('')}
            </div>
        `).join('');

        // Other tasks
        const otherRow = document.getElementById('otherTasksRow');
        otherRow.innerHTML = (s.otherTasks || []).map(t => `<span class="other-task-chip">${t}</span>`).join('');

        renderGallery('introGallery', s.gallery);
        setupVideoBtn('introVideoBtn', s.video);
    }

    // ----- SLIDE 2: COMPARISON -----
    function renderComparison() {
        const s = config.slides.comparison;
        setText('compTitle', s.title);
        setText('compLastLabel', s.lastYearLabel);
        setText('compCurrentLabel', s.currentYearLabel);

        const grid = document.getElementById('compStatsGrid');
        grid.innerHTML = (s.stats || []).map(st => {
            const pct = st.isLower
                ? Math.round((1 - st.currentYear / st.lastYear) * 100) + '% faster'
                : (st.lastYear === 0 ? 'NEW' : '↑' + Math.round((st.currentYear / st.lastYear - 1) * 100) + '%');
            return `<div class="stat-card">
                <div class="stat-icon">${st.icon}</div>
                <div class="stat-label">${st.label}</div>
                <div class="stat-compare">
                    <span class="stat-old">${st.lastYear}${st.suffix}</span>
                    <span class="stat-arrow">→</span>
                    <span class="stat-new counter" data-target="${st.currentYear}" data-suffix="${st.suffix}">${st.currentYear}${st.suffix}</span>
                </div>
                <div class="stat-growth">${pct}</div>
            </div>`;
        }).join('');

        const achBox = document.getElementById('compAchievements');
        if (s.achievements && s.achievements.length) {
            achBox.style.display = 'block';
            achBox.innerHTML = `<h4>KEY ACHIEVEMENTS</h4>` + s.achievements.map(a => `<div class="ach-item"><span class="ach-check">✓</span>${a}</div>`).join('');
        } else { achBox.style.display = 'none'; }

        renderGallery('compGallery', s.gallery);
        setupVideoBtn('compVideoBtn', s.video);
    }

    // ----- SLIDE 3: PROJECTIONS -----
    function renderProjections() {
        const s = config.slides.projections;
        setText('projTitle', s.title);
        setText('projYearLabel', s.yearLabel);

        document.getElementById('projStatsGrid').innerHTML = (s.stats || []).map(st => `
            <div class="proj-card">
                <div class="proj-icon">${st.icon}</div>
                <div class="proj-number counter" data-target="${st.target}" data-suffix="${st.suffix}">${st.target}${st.suffix}</div>
                <div class="proj-label">${st.label}</div>
                <span class="proj-growth ${st.growth === 'NEW' ? 'new-tag' : ''}">${st.growth === 'NEW' ? 'NEW' : '↑ ' + st.growth}</span>
            </div>
        `).join('');

        document.getElementById('projImpactGoals').innerHTML = (s.impactGoals || []).map(g => `
            <div class="impact-chip"><span class="impact-metric">${g.metric}</span><span class="impact-target">${g.target}</span></div>
        `).join('');

        renderGallery('projGallery', s.gallery);
        setupVideoBtn('projVideoBtn', s.video);
    }

    // ----- SLIDE 4: STRATEGY -----
    function renderStrategy() {
        const s = config.slides.strategy;
        setText('stratTitle', s.title);

        document.getElementById('stratGrid').innerHTML = (s.strategies || []).map(st => `
            <div class="strat-card">
                <div class="strat-header"><span class="strat-icon">${st.icon}</span><span class="strat-tag">${st.tag}</span></div>
                <h4>${st.title}</h4><p>${st.description}</p>
            </div>
        `).join('');

        document.getElementById('stratMilestones').innerHTML = (s.milestones || []).map(m => `
            <div class="milestone"><div class="mile-q">${m.quarter}</div><div class="mile-period">${m.period}</div><div class="mile-goal">${m.goal}</div></div>
        `).join('');

        renderGallery('stratGallery', s.gallery);
        setupVideoBtn('stratVideoBtn', s.video);
    }

    // ----- SLIDE 5: THANK YOU -----
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
        document.getElementById('tyAsks').innerHTML = (s.asks || []).map(a => `<span class="ask-chip">${a}</span>`).join('');
        renderGallery('tyGallery', s.gallery);
        setupVideoBtn('tyVideoBtn', s.video);
    }

    // ========== HELPERS ==========
    function setText(id, text) { const el = document.getElementById(id); if (el && text !== undefined) el.textContent = text; }
    function setupVideoBtn(btnId, url) { const btn = document.getElementById(btnId); if (btn) btn.style.display = url ? 'flex' : 'none'; }

    function renderGallery(containerId, images) {
        const el = document.getElementById(containerId);
        if (!el) return;
        if (!images || images.length === 0) { el.innerHTML = ''; return; }
        el.innerHTML = images.filter(u => u).map(url =>
            `<div class="gallery-item" data-img="${url}"><img src="${url}" alt="Work sample" loading="lazy"></div>`
        ).join('');
    }

    // ========== NAVIGATION ==========
    function updateSlide(n) {
        if (n < 1 || n > totalSlides) return;
        document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
        currentSlide = n;
        const active = document.querySelector(`[data-slide="${n}"]`);
        if (active) { active.classList.add('active'); active.scrollTop = 0; triggerAnimations(active); animateCounters(active); }
        document.getElementById('progressBar').style.width = (n / totalSlides * 100) + '%';
        document.getElementById('slideCounter').textContent = String(n).padStart(2, '0') + ' / ' + String(totalSlides).padStart(2, '0');
        document.getElementById('prevBtn').style.opacity = n === 1 ? '0.3' : '1';
        document.getElementById('prevBtn').style.pointerEvents = n === 1 ? 'none' : 'auto';
        document.getElementById('nextBtn').style.opacity = n === totalSlides ? '0.3' : '1';
        document.getElementById('nextBtn').style.pointerEvents = n === totalSlides ? 'none' : 'auto';
    }
    function triggerAnimations(slide) {
        const els = slide.querySelectorAll('.anim-el');
        els.forEach(el => el.classList.remove('visible'));
        els.forEach((el, i) => { setTimeout(() => el.classList.add('visible'), (parseInt(el.getAttribute('data-delay') || i) * 140) + 50); });
    }
    function animateCounters(slide) {
        slide.querySelectorAll('.counter').forEach(c => {
            const target = parseInt(c.getAttribute('data-target'));
            const suffix = c.getAttribute('data-suffix') || '';
            if (isNaN(target)) return;
            const start = performance.now(), dur = 1200;
            (function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                c.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            })(start);
        });
    }

    // ========== VIDEO MODAL ==========
    function openVideo(key) {
        const url = config.slides[key] ? config.slides[key].video : '';
        if (!url) return;
        const embed = getVideoEmbed(url);
        const c = document.getElementById('videoContainer');
        c.innerHTML = embed.match(/\.(mp4|webm|ogg)$/i) ? `<video controls autoplay><source src="${embed}"></video>` : `<iframe src="${embed}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
        document.getElementById('videoModal').classList.add('active');
    }
    function closeVideo() { document.getElementById('videoModal').classList.remove('active'); document.getElementById('videoContainer').innerHTML = ''; }

    // ========== LIGHTBOX ==========
    function openLightbox(src) { document.getElementById('lightboxImg').src = src; document.getElementById('lightbox').classList.add('active'); }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }

    // ========== EVENTS ==========
    function bindEvents() {
        document.getElementById('prevBtn').addEventListener('click', () => updateSlide(currentSlide - 1));
        document.getElementById('nextBtn').addEventListener('click', () => updateSlide(currentSlide + 1));
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
            else document.exitFullscreen().catch(() => {});
        });
        document.querySelectorAll('.video-play-btn').forEach(btn => {
            btn.addEventListener('click', e => { e.stopPropagation(); openVideo(btn.getAttribute('data-slide-key')); });
        });
        document.getElementById('videoClose').addEventListener('click', closeVideo);
        document.getElementById('videoModal').addEventListener('click', e => { if (e.target.id === 'videoModal') closeVideo(); });

        // Lightbox
        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        document.getElementById('lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') closeLightbox(); });
        document.addEventListener('click', e => {
            const item = e.target.closest('.gallery-item');
            if (item) { e.stopPropagation(); openLightbox(item.dataset.img); }
        });

        // Keyboard
        document.addEventListener('keydown', e => {
            if (document.getElementById('lightbox').classList.contains('active')) { if (e.key === 'Escape') closeLightbox(); return; }
            if (document.getElementById('videoModal').classList.contains('active')) { if (e.key === 'Escape') closeVideo(); return; }
            switch (e.key) {
                case 'ArrowRight': case 'ArrowDown': case ' ': case 'Enter': e.preventDefault(); updateSlide(currentSlide + 1); break;
                case 'ArrowLeft': case 'ArrowUp': e.preventDefault(); updateSlide(currentSlide - 1); break;
                case 'f': case 'F': if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); else document.exitFullscreen().catch(() => {}); break;
                case 'Home': e.preventDefault(); updateSlide(1); break;
                case 'End': e.preventDefault(); updateSlide(totalSlides); break;
            }
        });
        // Touch
        let tx = 0;
        document.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
        document.addEventListener('touchend', e => { const dx = tx - e.changedTouches[0].screenX; if (Math.abs(dx) > 50) dx > 0 ? updateSlide(currentSlide + 1) : updateSlide(currentSlide - 1); }, { passive: true });
        // Wheel
        let wt; document.addEventListener('wheel', e => { clearTimeout(wt); wt = setTimeout(() => { if (e.deltaY > 30) updateSlide(currentSlide + 1); else if (e.deltaY < -30) updateSlide(currentSlide - 1); }, 100); }, { passive: true });
        // Click nav
        document.addEventListener('click', e => { if (e.target.closest('.slide-nav, .video-modal, .lightbox, a, button, input, .gallery-item')) return; e.clientX > window.innerWidth / 3 ? updateSlide(currentSlide + 1) : updateSlide(currentSlide - 1); });
        // Storage sync
        window.addEventListener('storage', e => { if (e.key === 'ppt-config') { config = getConfig(); applyTheme(); renderAllSlides(); updateSlide(currentSlide); } });
    }

    init();
})();
