/* ============================================
   ADMIN PANEL — Full CMS for PPT
   Edit content, themes, animations, videos
   ============================================ */
(function () {
    'use strict';

    let config = getConfig();

    function init() {
        renderThemePicker();
        renderAnimPicker();
        renderSpeedPicker();
        populateAllFields();
        renderDynamicEditors();
        bindEvents();
    }

    // ---- THEME PICKER ----
    function renderThemePicker() {
        const grid = document.getElementById('themeGrid');
        grid.innerHTML = Object.entries(THEME_PRESETS).map(([key, t]) => `
            <div class="theme-card ${config.theme === key ? 'active' : ''}" data-theme="${key}">
                <div class="theme-preview">
                    <span style="background:${t.bgPrimary}"></span>
                    <span style="background:${t.accent1}"></span>
                    <span style="background:${t.accent2}"></span>
                    <span style="background:${t.accent3}"></span>
                </div>
                <div class="theme-name">${t.name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                config.theme = card.dataset.theme;
                grid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    }

    // ---- ANIMATION PICKER ----
    function renderAnimPicker() {
        const icons = { 'fade-up': '⬆️', 'slide-left': '➡️', 'scale': '🔍', 'bounce': '🏀', 'blur': '💫' };
        const grid = document.getElementById('animGrid');
        grid.innerHTML = Object.entries(ANIMATION_PRESETS).map(([key, name]) => `
            <div class="anim-card ${config.animation === key ? 'active' : ''}" data-anim="${key}">
                <div class="anim-icon">${icons[key] || '✨'}</div>
                <div class="anim-name">${name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.anim-card').forEach(card => {
            card.addEventListener('click', () => {
                config.animation = card.dataset.anim;
                grid.querySelectorAll('.anim-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    }

    function renderSpeedPicker() {
        const btns = document.querySelectorAll('.speed-btn');
        btns.forEach(btn => {
            if (btn.dataset.speed === config.animationSpeed) btn.classList.add('active');
            btn.addEventListener('click', () => {
                config.animationSpeed = btn.dataset.speed;
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // ---- POPULATE FIELDS ----
    function populateAllFields() {
        const p = config.presenter;
        setVal('pName', p.name);
        setVal('pRole', p.role);
        setVal('pDept', p.department);
        setVal('pCompany', p.company);

        const s = config.slides;
        // Intro
        setVal('introBadgeInput', s.intro.badge);
        setVal('introTitleInput', s.intro.title);
        setVal('introSubtitleInput', s.intro.subtitle);
        setVal('introDescInput', s.intro.description);
        setVal('introProfileImg', s.intro.profileImage);
        setVal('introBrandsInput', (s.intro.brands || []).map(b => b.name).join('\n'));
        setVal('introSkillsInput', (s.intro.skills || []).join(', '));
        setVal('introVideoInput', s.intro.video);

        // Comparison
        setVal('compTitleInput', s.comparison.title);
        setVal('compLastLabelInput', s.comparison.lastYearLabel);
        setVal('compCurrentLabelInput', s.comparison.currentYearLabel);
        setVal('compAchInput', (s.comparison.achievements || []).join('\n'));
        setVal('compImageInput', s.comparison.image);
        setVal('compVideoInput', s.comparison.video);

        // Projections
        setVal('projTitleInput', s.projections.title);
        setVal('projYearInput', s.projections.yearLabel);
        setVal('projImageInput', s.projections.image);
        setVal('projVideoInput', s.projections.video);

        // Strategy
        setVal('stratTitleInput', s.strategy.title);
        setVal('stratImageInput', s.strategy.image);
        setVal('stratVideoInput', s.strategy.video);

        // Thank You
        setVal('tyTitleInput', s.thankyou.title);
        setVal('tyHighlightInput', s.thankyou.highlight);
        setVal('tySubtitleInput', s.thankyou.subtitle);
        setVal('tyAsksInput', (s.thankyou.asks || []).join('\n'));
        setVal('tyImageInput', s.thankyou.image);
        setVal('tyVideoInput', s.thankyou.video);
    }

    // ---- DYNAMIC EDITORS ----
    function renderDynamicEditors() {
        renderCompStats();
        renderProjStats();
        renderProjGoals();
        renderStratCards();
        renderMilestones();
    }

    function renderCompStats() {
        const container = document.getElementById('compStatsEditor');
        container.innerHTML = (config.slides.comparison.stats || []).map((st, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Icon" value="${st.icon}" data-field="icon" style="max-width:50px">
                <input class="input" placeholder="Label" value="${st.label}" data-field="label">
                <input class="input" type="number" placeholder="Last Year" value="${st.lastYear}" data-field="lastYear" style="max-width:80px">
                <input class="input" type="number" placeholder="Current" value="${st.currentYear}" data-field="currentYear" style="max-width:80px">
                <input class="input" placeholder="Suffix" value="${st.suffix}" data-field="suffix" style="max-width:50px">
                <button class="remove-btn" data-idx="${i}" data-type="compStat">✕</button>
            </div>
        `).join('');
    }

    function renderProjStats() {
        const container = document.getElementById('projStatsEditor');
        container.innerHTML = (config.slides.projections.stats || []).map((st, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Icon" value="${st.icon}" data-field="icon" style="max-width:50px">
                <input class="input" placeholder="Label" value="${st.label}" data-field="label">
                <input class="input" type="number" placeholder="Target" value="${st.target}" data-field="target" style="max-width:80px">
                <input class="input" placeholder="Suffix" value="${st.suffix}" data-field="suffix" style="max-width:50px">
                <input class="input" placeholder="Growth" value="${st.growth}" data-field="growth" style="max-width:70px">
                <button class="remove-btn" data-idx="${i}" data-type="projStat">✕</button>
            </div>
        `).join('');
    }

    function renderProjGoals() {
        const container = document.getElementById('projGoalsEditor');
        container.innerHTML = (config.slides.projections.impactGoals || []).map((g, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Metric" value="${g.metric}" data-field="metric">
                <input class="input" placeholder="Target" value="${g.target}" data-field="target" style="max-width:100px">
                <button class="remove-btn" data-idx="${i}" data-type="projGoal">✕</button>
            </div>
        `).join('');
    }

    function renderStratCards() {
        const container = document.getElementById('stratCardsEditor');
        container.innerHTML = (config.slides.strategy.strategies || []).map((st, i) => `
            <div class="stat-editor-row" style="flex-wrap:wrap" data-index="${i}">
                <input class="input" placeholder="Icon" value="${st.icon}" data-field="icon" style="max-width:50px">
                <input class="input" placeholder="Tag" value="${st.tag}" data-field="tag" style="max-width:120px">
                <input class="input" placeholder="Title" value="${st.title}" data-field="title">
                <button class="remove-btn" data-idx="${i}" data-type="stratCard">✕</button>
                <textarea class="input textarea" placeholder="Description" data-field="description" style="width:100%;min-height:50px">${st.description}</textarea>
            </div>
        `).join('');
    }

    function renderMilestones() {
        const container = document.getElementById('stratMilesEditor');
        container.innerHTML = (config.slides.strategy.milestones || []).map((m, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Q1" value="${m.quarter}" data-field="quarter" style="max-width:50px">
                <input class="input" placeholder="Period" value="${m.period}" data-field="period" style="max-width:100px">
                <input class="input" placeholder="Goal" value="${m.goal}" data-field="goal">
                <button class="remove-btn" data-idx="${i}" data-type="milestone">✕</button>
            </div>
        `).join('');
    }

    // ---- COLLECT ALL DATA ----
    function collectAll() {
        config.presenter.name = getVal('pName');
        config.presenter.role = getVal('pRole');
        config.presenter.department = getVal('pDept');
        config.presenter.company = getVal('pCompany');

        // Intro
        config.slides.intro.badge = getVal('introBadgeInput');
        config.slides.intro.title = getVal('introTitleInput');
        config.slides.intro.subtitle = getVal('introSubtitleInput');
        config.slides.intro.description = getVal('introDescInput');
        config.slides.intro.profileImage = getVal('introProfileImg');
        config.slides.intro.brands = getVal('introBrandsInput').split('\n').filter(Boolean).map(n => ({ name: n.trim(), logo: '' }));
        config.slides.intro.skills = getVal('introSkillsInput').split(',').map(s => s.trim()).filter(Boolean);
        config.slides.intro.video = getVal('introVideoInput');

        // Comparison
        config.slides.comparison.title = getVal('compTitleInput');
        config.slides.comparison.lastYearLabel = getVal('compLastLabelInput');
        config.slides.comparison.currentYearLabel = getVal('compCurrentLabelInput');
        config.slides.comparison.achievements = getVal('compAchInput').split('\n').filter(Boolean);
        config.slides.comparison.image = getVal('compImageInput');
        config.slides.comparison.video = getVal('compVideoInput');
        collectDynamicStats('compStatsEditor', config.slides.comparison.stats, ['icon', 'label', 'lastYear', 'currentYear', 'suffix']);

        // Projections
        config.slides.projections.title = getVal('projTitleInput');
        config.slides.projections.yearLabel = getVal('projYearInput');
        config.slides.projections.image = getVal('projImageInput');
        config.slides.projections.video = getVal('projVideoInput');
        collectDynamicStats('projStatsEditor', config.slides.projections.stats, ['icon', 'label', 'target', 'suffix', 'growth']);
        collectDynamicStats('projGoalsEditor', config.slides.projections.impactGoals, ['metric', 'target']);

        // Strategy
        config.slides.strategy.title = getVal('stratTitleInput');
        config.slides.strategy.image = getVal('stratImageInput');
        config.slides.strategy.video = getVal('stratVideoInput');
        collectStratCards();
        collectDynamicStats('stratMilesEditor', config.slides.strategy.milestones, ['quarter', 'period', 'goal']);

        // Thank You
        config.slides.thankyou.title = getVal('tyTitleInput');
        config.slides.thankyou.highlight = getVal('tyHighlightInput');
        config.slides.thankyou.subtitle = getVal('tySubtitleInput');
        config.slides.thankyou.asks = getVal('tyAsksInput').split('\n').filter(Boolean);
        config.slides.thankyou.image = getVal('tyImageInput');
        config.slides.thankyou.video = getVal('tyVideoInput');
    }

    function collectDynamicStats(containerId, arr, fields) {
        const rows = document.getElementById(containerId).querySelectorAll('.stat-editor-row');
        rows.forEach((row, i) => {
            if (!arr[i]) arr[i] = {};
            fields.forEach(f => {
                const inp = row.querySelector(`[data-field="${f}"]`);
                if (inp) {
                    let val = inp.value;
                    if (inp.type === 'number') val = parseInt(val) || 0;
                    arr[i][f] = val;
                }
            });
        });
    }

    function collectStratCards() {
        const rows = document.getElementById('stratCardsEditor').querySelectorAll('.stat-editor-row');
        rows.forEach((row, i) => {
            if (!config.slides.strategy.strategies[i]) config.slides.strategy.strategies[i] = {};
            ['icon', 'tag', 'title', 'description'].forEach(f => {
                const inp = row.querySelector(`[data-field="${f}"]`);
                if (inp) config.slides.strategy.strategies[i][f] = inp.value;
            });
        });
    }

    // ---- HELPERS ----
    function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }
    function getVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg || 'Saved! ✓';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    // ---- EVENTS ----
    function bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
                const panel = document.getElementById('panel-' + btn.dataset.panel);
                if (panel) panel.classList.add('active');
            });
        });

        // Save
        document.getElementById('saveBtn').addEventListener('click', () => {
            collectAll();
            saveConfig(config);
            showToast('Saved! Changes applied ✓');
        });

        // Reset
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Reset all changes to default? This cannot be undone.')) {
                config = resetConfig();
                populateAllFields();
                renderDynamicEditors();
                renderThemePicker();
                renderAnimPicker();
                renderSpeedPicker();
                saveConfig(config);
                showToast('Reset to defaults ✓');
            }
        });

        // Export
        document.getElementById('exportBtn').addEventListener('click', () => {
            collectAll();
            const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'ppt-config.json';
            a.click();
            showToast('Config exported ✓');
        });

        // Import
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    config = JSON.parse(ev.target.result);
                    saveConfig(config);
                    populateAllFields();
                    renderDynamicEditors();
                    renderThemePicker();
                    renderAnimPicker();
                    renderSpeedPicker();
                    showToast('Config imported ✓');
                } catch (err) {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        });

        // Add buttons
        document.getElementById('addCompStat').addEventListener('click', () => {
            config.slides.comparison.stats.push({ label: '', lastYear: 0, currentYear: 0, suffix: '+', icon: '📈' });
            renderCompStats();
        });
        document.getElementById('addProjStat').addEventListener('click', () => {
            config.slides.projections.stats.push({ label: '', target: 0, suffix: '+', growth: '0%', icon: '📈' });
            renderProjStats();
        });
        document.getElementById('addProjGoal').addEventListener('click', () => {
            config.slides.projections.impactGoals.push({ metric: '', target: '' });
            renderProjGoals();
        });
        document.getElementById('addStratCard').addEventListener('click', () => {
            config.slides.strategy.strategies.push({ icon: '🎯', tag: 'NEW', title: '', description: '' });
            renderStratCards();
        });
        document.getElementById('addMilestone').addEventListener('click', () => {
            config.slides.strategy.milestones.push({ quarter: '', period: '', goal: '' });
            renderMilestones();
        });

        // Remove buttons (delegated)
        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-btn')) return;
            const idx = parseInt(e.target.dataset.idx);
            const type = e.target.dataset.type;
            if (type === 'compStat') { config.slides.comparison.stats.splice(idx, 1); renderCompStats(); }
            if (type === 'projStat') { config.slides.projections.stats.splice(idx, 1); renderProjStats(); }
            if (type === 'projGoal') { config.slides.projections.impactGoals.splice(idx, 1); renderProjGoals(); }
            if (type === 'stratCard') { config.slides.strategy.strategies.splice(idx, 1); renderStratCards(); }
            if (type === 'milestone') { config.slides.strategy.milestones.splice(idx, 1); renderMilestones(); }
        });
    }

    init();
})();
