/* ============================================
   ADMIN PANEL — Full CMS for PPT
   Brands KRA, Gallery, Themes, Videos
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

    // ---- THEME ----
    function renderThemePicker() {
        const grid = document.getElementById('themeGrid');
        grid.innerHTML = Object.entries(THEME_PRESETS).map(([key, t]) => `
            <div class="theme-card ${config.theme === key ? 'active' : ''}" data-theme="${key}">
                <div class="theme-preview"><span style="background:${t.bgPrimary}"></span><span style="background:${t.accent1}"></span><span style="background:${t.accent2}"></span><span style="background:${t.accent3}"></span></div>
                <div class="theme-name">${t.name}</div>
            </div>`).join('');
        grid.querySelectorAll('.theme-card').forEach(c => c.addEventListener('click', () => { config.theme = c.dataset.theme; grid.querySelectorAll('.theme-card').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));
    }
    function renderAnimPicker() {
        const icons = { 'fade-up': '⬆️', 'slide-left': '➡️', 'scale': '🔍', 'bounce': '🏀', 'blur': '💫' };
        const grid = document.getElementById('animGrid');
        grid.innerHTML = Object.entries(ANIMATION_PRESETS).map(([key, name]) => `
            <div class="anim-card ${config.animation === key ? 'active' : ''}" data-anim="${key}"><div class="anim-icon">${icons[key]}</div><div class="anim-name">${name}</div></div>`).join('');
        grid.querySelectorAll('.anim-card').forEach(c => c.addEventListener('click', () => { config.animation = c.dataset.anim; grid.querySelectorAll('.anim-card').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));
    }
    function renderSpeedPicker() {
        document.querySelectorAll('.speed-btn').forEach(b => {
            if (b.dataset.speed === config.animationSpeed) b.classList.add('active');
            b.addEventListener('click', () => { config.animationSpeed = b.dataset.speed; document.querySelectorAll('.speed-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); });
        });
    }

    // ---- POPULATE ----
    function populateAllFields() {
        const p = config.presenter, s = config.slides;
        setVal('pName', p.name); setVal('pRole', p.role); setVal('pDept', p.department); setVal('pCompany', p.company);
        // Intro
        setVal('introBadgeInput', s.intro.badge); setVal('introTitleInput', s.intro.title);
        setVal('introSubtitleInput', s.intro.subtitle); setVal('introDescInput', s.intro.description);
        setVal('introProfileImg', s.intro.profileImage);
        setVal('introOtherTasks', (s.intro.otherTasks || []).join('\n'));
        setVal('introVideoInput', s.intro.video);
        setVal('introGalleryInput', (s.intro.gallery || []).join('\n'));
        // Comparison
        setVal('compTitleInput', s.comparison.title);
        setVal('compLastLabelInput', s.comparison.lastYearLabel); setVal('compCurrentLabelInput', s.comparison.currentYearLabel);
        setVal('compAchInput', (s.comparison.achievements || []).join('\n'));
        setVal('compVideoInput', s.comparison.video); setVal('compGalleryInput', (s.comparison.gallery || []).join('\n'));
        // Projections
        setVal('projTitleInput', s.projections.title); setVal('projYearInput', s.projections.yearLabel);
        setVal('projVideoInput', s.projections.video); setVal('projGalleryInput', (s.projections.gallery || []).join('\n'));
        // Strategy
        setVal('stratTitleInput', s.strategy.title);
        setVal('stratVideoInput', s.strategy.video); setVal('stratGalleryInput', (s.strategy.gallery || []).join('\n'));
        // Thank You
        setVal('tyTitleInput', s.thankyou.title); setVal('tyHighlightInput', s.thankyou.highlight);
        setVal('tySubtitleInput', s.thankyou.subtitle);
        setVal('tyAsksInput', (s.thankyou.asks || []).join('\n'));
        setVal('tyVideoInput', s.thankyou.video); setVal('tyGalleryInput', (s.thankyou.gallery || []).join('\n'));
    }

    // ---- DYNAMIC EDITORS ----
    function renderDynamicEditors() { renderBrands(); renderCompStats(); renderProjStats(); renderProjGoals(); renderStratCards(); renderMilestones(); }

    function renderBrands() {
        const c = document.getElementById('brandsEditor');
        c.innerHTML = (config.slides.intro.brands || []).map((b, i) => `
            <div class="brand-editor-block" data-index="${i}">
                <div class="stat-editor-row">
                    <input class="input" placeholder="Brand Name" value="${b.name}" data-field="name">
                    <input class="input" placeholder="Platforms" value="${b.platforms || ''}" data-field="platforms">
                    <input class="input" placeholder="Color #hex" value="${b.color || '#6c5ce7'}" data-field="color" style="max-width:80px">
                    <button class="remove-btn" data-idx="${i}" data-type="brand">✕</button>
                </div>
                <div class="form-group" style="margin:6px 0 12px;padding-left:8px">
                    <label style="font-size:11px">Tasks (one per line)</label>
                    <textarea class="input textarea" data-field="tasks" style="min-height:60px">${(b.tasks || []).join('\n')}</textarea>
                </div>
            </div>
        `).join('');
    }

    function renderCompStats() {
        document.getElementById('compStatsEditor').innerHTML = (config.slides.comparison.stats || []).map((st, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Icon" value="${st.icon}" data-field="icon" style="max-width:50px">
                <input class="input" placeholder="Label" value="${st.label}" data-field="label">
                <input class="input" type="number" placeholder="Last Year" value="${st.lastYear}" data-field="lastYear" style="max-width:70px">
                <input class="input" type="number" placeholder="Current" value="${st.currentYear}" data-field="currentYear" style="max-width:70px">
                <input class="input" placeholder="Suffix" value="${st.suffix}" data-field="suffix" style="max-width:45px">
                <button class="remove-btn" data-idx="${i}" data-type="compStat">✕</button>
            </div>`).join('');
    }
    function renderProjStats() {
        document.getElementById('projStatsEditor').innerHTML = (config.slides.projections.stats || []).map((st, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Icon" value="${st.icon}" data-field="icon" style="max-width:50px">
                <input class="input" placeholder="Label" value="${st.label}" data-field="label">
                <input class="input" type="number" placeholder="Target" value="${st.target}" data-field="target" style="max-width:70px">
                <input class="input" placeholder="Suffix" value="${st.suffix}" data-field="suffix" style="max-width:45px">
                <input class="input" placeholder="Growth" value="${st.growth}" data-field="growth" style="max-width:60px">
                <button class="remove-btn" data-idx="${i}" data-type="projStat">✕</button>
            </div>`).join('');
    }
    function renderProjGoals() {
        document.getElementById('projGoalsEditor').innerHTML = (config.slides.projections.impactGoals || []).map((g, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Metric" value="${g.metric}" data-field="metric">
                <input class="input" placeholder="Target" value="${g.target}" data-field="target" style="max-width:90px">
                <button class="remove-btn" data-idx="${i}" data-type="projGoal">✕</button>
            </div>`).join('');
    }
    function renderStratCards() {
        document.getElementById('stratCardsEditor').innerHTML = (config.slides.strategy.strategies || []).map((st, i) => `
            <div class="stat-editor-row" style="flex-wrap:wrap" data-index="${i}">
                <input class="input" placeholder="Icon" value="${st.icon}" data-field="icon" style="max-width:50px">
                <input class="input" placeholder="Tag" value="${st.tag}" data-field="tag" style="max-width:110px">
                <input class="input" placeholder="Title" value="${st.title}" data-field="title">
                <button class="remove-btn" data-idx="${i}" data-type="stratCard">✕</button>
                <textarea class="input textarea" placeholder="Description" data-field="description" style="width:100%;min-height:45px">${st.description}</textarea>
            </div>`).join('');
    }
    function renderMilestones() {
        document.getElementById('stratMilesEditor').innerHTML = (config.slides.strategy.milestones || []).map((m, i) => `
            <div class="stat-editor-row" data-index="${i}">
                <input class="input" placeholder="Q1" value="${m.quarter}" data-field="quarter" style="max-width:45px">
                <input class="input" placeholder="Period" value="${m.period}" data-field="period" style="max-width:90px">
                <input class="input" placeholder="Goal" value="${m.goal}" data-field="goal">
                <button class="remove-btn" data-idx="${i}" data-type="milestone">✕</button>
            </div>`).join('');
    }

    // ---- COLLECT ALL ----
    function collectAll() {
        config.presenter = { name: getVal('pName'), role: getVal('pRole'), department: getVal('pDept'), company: getVal('pCompany') };

        // Intro
        config.slides.intro.badge = getVal('introBadgeInput');
        config.slides.intro.title = getVal('introTitleInput');
        config.slides.intro.subtitle = getVal('introSubtitleInput');
        config.slides.intro.description = getVal('introDescInput');
        config.slides.intro.profileImage = getVal('introProfileImg');
        config.slides.intro.otherTasks = getVal('introOtherTasks').split('\n').filter(Boolean);
        config.slides.intro.video = getVal('introVideoInput');
        config.slides.intro.gallery = getVal('introGalleryInput').split('\n').filter(Boolean);
        collectBrands();

        // Comparison
        config.slides.comparison.title = getVal('compTitleInput');
        config.slides.comparison.lastYearLabel = getVal('compLastLabelInput');
        config.slides.comparison.currentYearLabel = getVal('compCurrentLabelInput');
        config.slides.comparison.achievements = getVal('compAchInput').split('\n').filter(Boolean);
        config.slides.comparison.video = getVal('compVideoInput');
        config.slides.comparison.gallery = getVal('compGalleryInput').split('\n').filter(Boolean);
        collectDynamic('compStatsEditor', config.slides.comparison.stats, ['icon', 'label', 'lastYear', 'currentYear', 'suffix']);

        // Projections
        config.slides.projections.title = getVal('projTitleInput');
        config.slides.projections.yearLabel = getVal('projYearInput');
        config.slides.projections.video = getVal('projVideoInput');
        config.slides.projections.gallery = getVal('projGalleryInput').split('\n').filter(Boolean);
        collectDynamic('projStatsEditor', config.slides.projections.stats, ['icon', 'label', 'target', 'suffix', 'growth']);
        collectDynamic('projGoalsEditor', config.slides.projections.impactGoals, ['metric', 'target']);

        // Strategy
        config.slides.strategy.title = getVal('stratTitleInput');
        config.slides.strategy.video = getVal('stratVideoInput');
        config.slides.strategy.gallery = getVal('stratGalleryInput').split('\n').filter(Boolean);
        collectStratCards2();
        collectDynamic('stratMilesEditor', config.slides.strategy.milestones, ['quarter', 'period', 'goal']);

        // Thank You
        config.slides.thankyou.title = getVal('tyTitleInput');
        config.slides.thankyou.highlight = getVal('tyHighlightInput');
        config.slides.thankyou.subtitle = getVal('tySubtitleInput');
        config.slides.thankyou.asks = getVal('tyAsksInput').split('\n').filter(Boolean);
        config.slides.thankyou.video = getVal('tyVideoInput');
        config.slides.thankyou.gallery = getVal('tyGalleryInput').split('\n').filter(Boolean);
    }

    function collectBrands() {
        const blocks = document.getElementById('brandsEditor').querySelectorAll('.brand-editor-block');
        config.slides.intro.brands = [];
        blocks.forEach(block => {
            const row = block.querySelector('.stat-editor-row');
            config.slides.intro.brands.push({
                name: row.querySelector('[data-field="name"]').value,
                platforms: row.querySelector('[data-field="platforms"]').value,
                color: row.querySelector('[data-field="color"]').value,
                tasks: block.querySelector('[data-field="tasks"]').value.split('\n').filter(Boolean),
            });
        });
    }
    function collectDynamic(cid, arr, fields) {
        document.getElementById(cid).querySelectorAll('.stat-editor-row').forEach((row, i) => {
            if (!arr[i]) arr[i] = {};
            fields.forEach(f => { const inp = row.querySelector(`[data-field="${f}"]`); if (inp) arr[i][f] = inp.type === 'number' ? (parseInt(inp.value) || 0) : inp.value; });
        });
    }
    function collectStratCards2() {
        document.getElementById('stratCardsEditor').querySelectorAll('.stat-editor-row').forEach((row, i) => {
            if (!config.slides.strategy.strategies[i]) config.slides.strategy.strategies[i] = {};
            ['icon', 'tag', 'title', 'description'].forEach(f => { const inp = row.querySelector(`[data-field="${f}"]`); if (inp) config.slides.strategy.strategies[i][f] = inp.value; });
        });
    }

    // ---- HELPERS ----
    function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }
    function getVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }
    function showToast(msg) { const t = document.getElementById('toast'); t.textContent = msg || 'Saved! ✓'; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }

    // ---- EVENTS ----
    function bindEvents() {
        document.querySelectorAll('.sidebar-btn').forEach(btn => btn.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById('panel-' + btn.dataset.panel);
            if (panel) panel.classList.add('active');
        }));

        document.getElementById('saveBtn').addEventListener('click', () => { collectAll(); saveConfig(config); showToast('Saved! Changes applied ✓'); });
        document.getElementById('resetBtn').addEventListener('click', () => { if (confirm('Reset all?')) { config = resetConfig(); populateAllFields(); renderDynamicEditors(); renderThemePicker(); renderAnimPicker(); renderSpeedPicker(); saveConfig(config); showToast('Reset ✓'); } });
        document.getElementById('exportBtn').addEventListener('click', () => { collectAll(); const b = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'ppt-config.json'; a.click(); showToast('Exported ✓'); });
        document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
        document.getElementById('importFile').addEventListener('change', e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => { try { config = JSON.parse(ev.target.result); saveConfig(config); populateAllFields(); renderDynamicEditors(); renderThemePicker(); renderAnimPicker(); renderSpeedPicker(); showToast('Imported ✓'); } catch (err) { alert('Invalid JSON'); } }; r.readAsText(f); });

        // Add buttons
        document.getElementById('addBrand').addEventListener('click', () => { config.slides.intro.brands.push({ name: '', platforms: '', color: '#00cec9', tasks: [] }); renderBrands(); });
        document.getElementById('addCompStat').addEventListener('click', () => { config.slides.comparison.stats.push({ label: '', lastYear: 0, currentYear: 0, suffix: '+', icon: '📈' }); renderCompStats(); });
        document.getElementById('addProjStat').addEventListener('click', () => { config.slides.projections.stats.push({ label: '', target: 0, suffix: '+', growth: '0%', icon: '📈' }); renderProjStats(); });
        document.getElementById('addProjGoal').addEventListener('click', () => { config.slides.projections.impactGoals.push({ metric: '', target: '' }); renderProjGoals(); });
        document.getElementById('addStratCard').addEventListener('click', () => { config.slides.strategy.strategies.push({ icon: '🎯', tag: 'NEW', title: '', description: '' }); renderStratCards(); });
        document.getElementById('addMilestone').addEventListener('click', () => { config.slides.strategy.milestones.push({ quarter: '', period: '', goal: '' }); renderMilestones(); });

        // Remove (delegated)
        document.addEventListener('click', e => {
            if (!e.target.classList.contains('remove-btn')) return;
            const idx = parseInt(e.target.dataset.idx), type = e.target.dataset.type;
            if (type === 'brand') { config.slides.intro.brands.splice(idx, 1); renderBrands(); }
            if (type === 'compStat') { config.slides.comparison.stats.splice(idx, 1); renderCompStats(); }
            if (type === 'projStat') { config.slides.projections.stats.splice(idx, 1); renderProjStats(); }
            if (type === 'projGoal') { config.slides.projections.impactGoals.splice(idx, 1); renderProjGoals(); }
            if (type === 'stratCard') { config.slides.strategy.strategies.splice(idx, 1); renderStratCards(); }
            if (type === 'milestone') { config.slides.strategy.milestones.splice(idx, 1); renderMilestones(); }
        });
    }

    init();
})();
