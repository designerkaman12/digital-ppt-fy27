/* ============================================
   PPTX EXPORT — Uses PptxGenJS (loaded via CDN)
   Generates editable .pptx from config data
   ============================================ */

function exportToPPTX() {
    if (typeof PptxGenJS === 'undefined') { alert('PptxGenJS not loaded. Check internet connection.'); return; }
    const config = getConfig();
    const pptx = new PptxGenJS();
    pptx.author = config.presenter.name;
    pptx.subject = 'Individual Performance Review';
    pptx.title = config.presenter.name + ' — Performance Review FY 2026-27';
    pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5

    const BG = '08090d';
    const WHITE = 'f0f0f5';
    const MUTED = '888899';
    const ACC1 = '6c5ce7';
    const ACC2 = '00cec9';
    const CARD_BG = '12131a';

    // ===== SLIDE 1: INTRO + KRA =====
    (function () {
        const s = config.slides.intro, p = config.presenter;
        const slide = pptx.addSlide();
        slide.background = { color: BG };

        // Gradient accent bar top
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: ACC1 } });

        // Badge
        slide.addText(s.badge || 'INDIVIDUAL PERFORMANCE REVIEW', { x: 0.5, y: 0.25, w: 5, h: 0.35, fontSize: 8, fontFace: 'Arial', color: ACC2, bold: true, letterSpacing: 3 });

        // Name
        slide.addText(s.title || p.name, { x: 0.5, y: 0.65, w: 4, h: 0.6, fontSize: 28, fontFace: 'Arial', color: WHITE, bold: true });
        slide.addText(s.subtitle || p.role, { x: 0.5, y: 1.2, w: 4, h: 0.4, fontSize: 14, fontFace: 'Arial', color: ACC1, bold: true });
        slide.addText(s.description || '', { x: 0.5, y: 1.6, w: 4, h: 0.35, fontSize: 9, fontFace: 'Arial', color: MUTED });

        // Skills
        const skills = s.skills || ['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Canva Pro', 'Midjourney AI'];
        slide.addText(skills.join('  •  '), { x: 0.5, y: 2.05, w: 4.2, h: 0.3, fontSize: 7, fontFace: 'Arial', color: ACC1 });

        // KRA Title
        slide.addText('MY ROLES & RESPONSIBILITIES', { x: 5.2, y: 0.25, w: 7.5, h: 0.35, fontSize: 9, fontFace: 'Arial', color: ACC2, bold: true, letterSpacing: 2 });

        // Brand KRA Cards
        const brands = s.brands || [];
        brands.forEach((b, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const bx = 5.2 + col * 3.9;
            const by = 0.7 + row * 2.8;
            const bColor = b.color ? b.color.replace('#', '') : ACC1;

            // Card bg
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: 3.7, h: 2.6, fill: { color: CARD_BG }, rectRadius: 0.1 });
            // Color top bar
            slide.addShape(pptx.shapes.RECTANGLE, { x: bx, y: by, w: 3.7, h: 0.04, fill: { color: bColor } });
            // Brand name
            slide.addText(b.name, { x: bx + 0.15, y: by + 0.12, w: 3.4, h: 0.3, fontSize: 11, fontFace: 'Arial', color: bColor, bold: true });
            // Platforms
            slide.addText(b.platforms || '', { x: bx + 0.15, y: by + 0.38, w: 3.4, h: 0.2, fontSize: 7, fontFace: 'Arial', color: MUTED });
            // Tasks
            (b.tasks || []).forEach((t, ti) => {
                slide.addText('▸  ' + t, { x: bx + 0.15, y: by + 0.62 + ti * 0.32, w: 3.4, h: 0.28, fontSize: 8, fontFace: 'Arial', color: 'ccccdd', valign: 'top' });
            });
        });

        // Other tasks at bottom
        const otherTasks = s.otherTasks || [];
        if (otherTasks.length) {
            slide.addText('Other: ' + otherTasks.join(' • '), { x: 0.5, y: 6.8, w: 12, h: 0.3, fontSize: 8, fontFace: 'Arial', color: MUTED });
        }
    })();

    // ===== SLIDE 2: COMPARISON =====
    (function () {
        const s = config.slides.comparison;
        const slide = pptx.addSlide();
        slide.background = { color: BG };
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: ACC1 } });

        slide.addText('YEAR-ON-YEAR COMPARISON', { x: 0.5, y: 0.2, w: 6, h: 0.3, fontSize: 8, fontFace: 'Arial', color: ACC2, bold: true, letterSpacing: 3 });
        slide.addText(s.title || '', { x: 0.5, y: 0.5, w: 12, h: 0.5, fontSize: 22, fontFace: 'Arial', color: WHITE, bold: true });

        // Labels
        slide.addText(s.lastYearLabel || 'FY 2024-25', { x: 3.5, y: 1.1, w: 2, h: 0.35, fontSize: 12, fontFace: 'Arial', color: MUTED, bold: true, align: 'center' });
        slide.addText('VS', { x: 5.7, y: 1.1, w: 0.8, h: 0.35, fontSize: 10, fontFace: 'Arial', color: MUTED, bold: true, align: 'center' });
        slide.addText(s.currentYearLabel || 'FY 2025-26', { x: 6.7, y: 1.1, w: 2.5, h: 0.35, fontSize: 12, fontFace: 'Arial', color: ACC2, bold: true, align: 'center' });

        // Stats
        const stats = s.stats || [];
        stats.forEach((st, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const sx = 0.5 + col * 4.1;
            const sy = 1.65 + row * 1.9;
            const pct = st.isLower
                ? Math.round((1 - st.currentYear / st.lastYear) * 100) + '% faster'
                : (st.lastYear === 0 ? 'NEW' : '↑' + Math.round((st.currentYear / st.lastYear - 1) * 100) + '%');

            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: sx, y: sy, w: 3.9, h: 1.7, fill: { color: CARD_BG }, rectRadius: 0.1 });
            slide.addText(st.icon + '  ' + st.label, { x: sx + 0.15, y: sy + 0.1, w: 3.6, h: 0.3, fontSize: 9, fontFace: 'Arial', color: 'aaaacc' });
            slide.addText(st.lastYear + st.suffix, { x: sx + 0.15, y: sy + 0.45, w: 1, h: 0.35, fontSize: 12, fontFace: 'Arial', color: MUTED, strike: true });
            slide.addText('→', { x: sx + 1.15, y: sy + 0.45, w: 0.4, h: 0.35, fontSize: 12, fontFace: 'Arial', color: ACC2, align: 'center' });
            slide.addText(st.currentYear + st.suffix, { x: sx + 1.55, y: sy + 0.4, w: 2, h: 0.45, fontSize: 20, fontFace: 'Arial', color: ACC1, bold: true });
            // Bar
            const barW = Math.min((st.currentYear / Math.max(...stats.map(x => x.currentYear), 1)) * 3.5, 3.5);
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: sx + 0.15, y: sy + 0.95, w: 3.6, h: 0.1, fill: { color: '1a1b25' }, rectRadius: 0.05 });
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: sx + 0.15, y: sy + 0.95, w: barW, h: 0.1, fill: { color: ACC1 }, rectRadius: 0.05 });
            slide.addText(pct, { x: sx + 0.15, y: sy + 1.1, w: 2, h: 0.25, fontSize: 8, fontFace: 'Arial', color: '00b894', bold: true });
        });

        // Achievements
        const ach = s.achievements || [];
        if (ach.length) {
            const ay = 1.65 + Math.ceil(stats.length / 3) * 1.9 + 0.15;
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: ay, w: 12.3, h: 0.35 + ach.length * 0.25, fill: { color: CARD_BG }, rectRadius: 0.1 });
            slide.addText('KEY ACHIEVEMENTS', { x: 0.65, y: ay + 0.05, w: 6, h: 0.22, fontSize: 8, fontFace: 'Arial', color: ACC2, bold: true });
            ach.forEach((a, ai) => {
                slide.addText('✓  ' + a, { x: 0.65, y: ay + 0.28 + ai * 0.25, w: 11.5, h: 0.22, fontSize: 8, fontFace: 'Arial', color: 'aaaacc' });
            });
        }
    })();

    // ===== SLIDE 3: PROJECTIONS =====
    (function () {
        const s = config.slides.projections;
        const slide = pptx.addSlide();
        slide.background = { color: BG };
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: ACC1 } });

        slide.addText('FUTURE PROJECTIONS', { x: 0.5, y: 0.2, w: 6, h: 0.3, fontSize: 8, fontFace: 'Arial', color: ACC2, bold: true, letterSpacing: 3 });
        slide.addText(s.title || '', { x: 0.5, y: 0.5, w: 12, h: 0.5, fontSize: 22, fontFace: 'Arial', color: WHITE, bold: true });
        slide.addText(s.yearLabel || '', { x: 0.5, y: 1.05, w: 3, h: 0.35, fontSize: 11, fontFace: 'Arial', color: ACC1, bold: true });

        const stats = s.stats || [];
        stats.forEach((st, i) => {
            const col = i % 3, row = Math.floor(i / 3);
            const sx = 0.5 + col * 4.1, sy = 1.55 + row * 1.9;
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: sx, y: sy, w: 3.9, h: 1.7, fill: { color: CARD_BG }, rectRadius: 0.1 });
            slide.addText(st.icon, { x: sx + 0.15, y: sy + 0.1, w: 1, h: 0.35, fontSize: 18, fontFace: 'Arial' });
            slide.addText(st.target + st.suffix, { x: sx + 0.15, y: sy + 0.5, w: 3.6, h: 0.5, fontSize: 24, fontFace: 'Arial', color: ACC1, bold: true, align: 'center' });
            slide.addText(st.label, { x: sx + 0.15, y: sy + 1.0, w: 3.6, h: 0.25, fontSize: 9, fontFace: 'Arial', color: 'aaaacc', align: 'center' });
            const growthColor = st.growth === 'NEW' ? '0984e3' : '00b894';
            slide.addText(st.growth === 'NEW' ? 'NEW' : '↑ ' + st.growth, { x: sx + 0.15, y: sy + 1.3, w: 3.6, h: 0.22, fontSize: 8, fontFace: 'Arial', color: growthColor, bold: true, align: 'center' });
        });

        // Goals
        const goals = s.impactGoals || [];
        const gy = 1.55 + Math.ceil(stats.length / 3) * 1.9 + 0.2;
        goals.forEach((g, i) => {
            const gx = 0.5 + i * 3.15;
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: gx, y: gy, w: 3, h: 0.55, fill: { color: CARD_BG }, rectRadius: 0.08 });
            slide.addText(g.metric, { x: gx + 0.1, y: gy + 0.05, w: 1.8, h: 0.2, fontSize: 7, fontFace: 'Arial', color: MUTED });
            slide.addText(g.target, { x: gx + 1.9, y: gy + 0.05, w: 1, h: 0.45, fontSize: 14, fontFace: 'Arial', color: ACC2, bold: true, align: 'right' });
        });
    })();

    // ===== SLIDE 4: STRATEGY =====
    (function () {
        const s = config.slides.strategy;
        const slide = pptx.addSlide();
        slide.background = { color: BG };
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: ACC1 } });

        slide.addText('STRATEGY & ROADMAP', { x: 0.5, y: 0.2, w: 6, h: 0.3, fontSize: 8, fontFace: 'Arial', color: ACC2, bold: true, letterSpacing: 3 });
        slide.addText(s.title || '', { x: 0.5, y: 0.5, w: 12, h: 0.5, fontSize: 22, fontFace: 'Arial', color: WHITE, bold: true });

        (s.strategies || []).forEach((st, i) => {
            const col = i % 2, row = Math.floor(i / 2);
            const sx = 0.5 + col * 6.3, sy = 1.15 + row * 2.2;
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: sx, y: sy, w: 6, h: 2, fill: { color: CARD_BG }, rectRadius: 0.1 });
            slide.addText(st.icon + '  ' + st.tag, { x: sx + 0.15, y: sy + 0.1, w: 5.5, h: 0.25, fontSize: 8, fontFace: 'Arial', color: ACC1, bold: true });
            slide.addText(st.title, { x: sx + 0.15, y: sy + 0.4, w: 5.5, h: 0.3, fontSize: 12, fontFace: 'Arial', color: WHITE, bold: true });
            slide.addText(st.description, { x: sx + 0.15, y: sy + 0.75, w: 5.5, h: 1.1, fontSize: 8, fontFace: 'Arial', color: 'aaaacc', valign: 'top', lineSpacing: 14 });
        });

        // Milestones
        const my = 1.15 + Math.ceil((s.strategies || []).length / 2) * 2.2 + 0.2;
        (s.milestones || []).forEach((m, i) => {
            const mx = 0.5 + i * 3.15;
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: mx, y: my, w: 3, h: 1.2, fill: { color: CARD_BG }, rectRadius: 0.08 });
            slide.addShape(pptx.shapes.RECTANGLE, { x: mx, y: my, w: 3, h: 0.04, fill: { color: i === (s.milestones.length - 1) ? ACC1 : '222233' } });
            slide.addText(m.quarter, { x: mx + 0.1, y: my + 0.1, w: 1, h: 0.3, fontSize: 14, fontFace: 'Arial', color: ACC1, bold: true });
            slide.addText(m.period, { x: mx + 0.1, y: my + 0.4, w: 2.8, h: 0.2, fontSize: 7, fontFace: 'Arial', color: MUTED });
            slide.addText(m.goal, { x: mx + 0.1, y: my + 0.65, w: 2.8, h: 0.45, fontSize: 8, fontFace: 'Arial', color: 'aaaacc', valign: 'top' });
        });
    })();

    // ===== SLIDE 5: THANK YOU =====
    (function () {
        const s = config.slides.thankyou, p = config.presenter;
        const slide = pptx.addSlide();
        slide.background = { color: BG };
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: ACC1 } });

        slide.addText('THANK YOU', { x: 0, y: 1.3, w: '100%', h: 0.4, fontSize: 10, fontFace: 'Arial', color: ACC2, bold: true, align: 'center', letterSpacing: 4 });
        slide.addText(s.title || 'Let\'s Make', { x: 0, y: 1.8, w: '100%', h: 0.7, fontSize: 36, fontFace: 'Arial', color: WHITE, bold: true, align: 'center' });
        slide.addText(s.highlight || 'FY27 Iconic', { x: 0, y: 2.5, w: '100%', h: 0.7, fontSize: 36, fontFace: 'Arial', color: ACC1, bold: true, align: 'center' });
        slide.addText(s.subtitle || '', { x: 2, y: 3.3, w: 9.33, h: 0.5, fontSize: 11, fontFace: 'Arial', color: MUTED, align: 'center' });

        // Asks
        const asks = s.asks || [];
        asks.forEach((a, i) => {
            const ax = 1.5 + (i % 3) * 3.5;
            const ay = 4.1 + Math.floor(i / 3) * 0.45;
            slide.addText(a, { x: ax, y: ay, w: 3.3, h: 0.35, fontSize: 9, fontFace: 'Arial', color: 'aaaacc', align: 'center' });
        });

        // Presenter card
        const py = 5.6;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 3.5, y: py, w: 6.33, h: 0.8, fill: { color: CARD_BG }, rectRadius: 0.08 });
        slide.addText(p.name.toUpperCase(), { x: 3.7, y: py + 0.05, w: 3, h: 0.2, fontSize: 7, fontFace: 'Arial', color: MUTED, letterSpacing: 1 });
        slide.addText(p.role, { x: 3.7, y: py + 0.28, w: 3, h: 0.2, fontSize: 9, fontFace: 'Arial', color: WHITE, bold: true });
        slide.addText(p.department.toUpperCase(), { x: 6.8, y: py + 0.05, w: 2.8, h: 0.2, fontSize: 7, fontFace: 'Arial', color: MUTED, letterSpacing: 1, align: 'right' });
        slide.addText(p.company, { x: 6.8, y: py + 0.28, w: 2.8, h: 0.2, fontSize: 9, fontFace: 'Arial', color: WHITE, bold: true, align: 'right' });
    })();

    // fileName
    const fileName = (config.presenter.name || 'PPT').replace(/\s+/g, '_') + '_Performance_Review_FY27.pptx';
    pptx.writeFile({ fileName }).then(() => {
        // Toast if available
        const t = document.getElementById('toast');
        if (t) { t.textContent = 'PPTX Downloaded! ✓'; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500); }
    });
}
