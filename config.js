/* ============================================
   PPT CONFIG — All Data Lives Here
   Stored in localStorage, editable via Admin Panel
   ============================================ */

const THEME_PRESETS = {
    midnight: { name: 'Midnight', bgPrimary: '#08090d', bgSecondary: '#0e1017', bgCard: 'rgba(255,255,255,0.03)', bgCardHover: 'rgba(255,255,255,0.06)', borderCard: 'rgba(255,255,255,0.08)', accent1: '#6c5ce7', accent2: '#00cec9', accent3: '#fd79a8', textPrimary: '#f0f0f5', textSecondary: 'rgba(240,240,245,0.6)', textMuted: 'rgba(240,240,245,0.35)', gradientDir: '135deg' },
    ocean: { name: 'Ocean', bgPrimary: '#0a1628', bgSecondary: '#0d1f3c', bgCard: 'rgba(255,255,255,0.04)', bgCardHover: 'rgba(255,255,255,0.07)', borderCard: 'rgba(100,180,255,0.1)', accent1: '#0984e3', accent2: '#74b9ff', accent3: '#a29bfe', textPrimary: '#eaf4ff', textSecondary: 'rgba(234,244,255,0.6)', textMuted: 'rgba(234,244,255,0.35)', gradientDir: '135deg' },
    ember: { name: 'Ember', bgPrimary: '#120a0a', bgSecondary: '#1a0e0e', bgCard: 'rgba(255,100,50,0.04)', bgCardHover: 'rgba(255,100,50,0.08)', borderCard: 'rgba(255,100,50,0.12)', accent1: '#e17055', accent2: '#fdcb6e', accent3: '#ff7675', textPrimary: '#fff5f0', textSecondary: 'rgba(255,245,240,0.6)', textMuted: 'rgba(255,245,240,0.35)', gradientDir: '135deg' },
    forest: { name: 'Forest', bgPrimary: '#0a120e', bgSecondary: '#0e1a14', bgCard: 'rgba(0,200,150,0.04)', bgCardHover: 'rgba(0,200,150,0.07)', borderCard: 'rgba(0,200,150,0.1)', accent1: '#00b894', accent2: '#55efc4', accent3: '#81ecec', textPrimary: '#f0fff8', textSecondary: 'rgba(240,255,248,0.6)', textMuted: 'rgba(240,255,248,0.35)', gradientDir: '135deg' },
    royal: { name: 'Royal', bgPrimary: '#0d0a14', bgSecondary: '#120e1e', bgCard: 'rgba(160,100,255,0.04)', bgCardHover: 'rgba(160,100,255,0.07)', borderCard: 'rgba(160,100,255,0.1)', accent1: '#a855f7', accent2: '#c084fc', accent3: '#e879f9', textPrimary: '#f5f0ff', textSecondary: 'rgba(245,240,255,0.6)', textMuted: 'rgba(245,240,255,0.35)', gradientDir: '135deg' },
};

const ANIMATION_PRESETS = { 'fade-up': 'Fade Up', 'slide-left': 'Slide Left', 'scale': 'Scale In', 'bounce': 'Bounce In', 'blur': 'Blur In' };

const DEFAULT_CONFIG = {
    theme: 'midnight',
    animation: 'fade-up',
    animationSpeed: 'normal',

    presenter: {
        name: 'Aman Kumar',
        role: 'Graphic Designer & Video Editor',
        department: 'Digital Department',
        company: 'Manmachine Group',
    },

    slides: {
        // ===== SLIDE 1: INTRODUCTION — "What I Do" =====
        intro: {
            badge: 'INDIVIDUAL PERFORMANCE REVIEW',
            title: 'Aman Kumar',
            subtitle: 'Visual Growth Strategist',
            description: 'Graphic Designer & Video Editor — Digital Department, Manmachine Group',
            profileImage: '',
            // Brand-wise KRA breakdown
            brands: [
                {
                    name: 'ManMachineWorks',
                    platforms: 'Instagram, YouTube, LinkedIn',
                    color: '#0984e3',
                    tasks: ['Video Shoot & Editing', 'Daily & Occasional Creatives', 'Internal Sales Work (Banners, Brochures)', 'Dos & Don\'ts Posters'],
                },
                {
                    name: 'Exppress Car Wash',
                    platforms: 'Instagram, YouTube, LinkedIn',
                    color: '#e17055',
                    tasks: ['Video Shoot & Editing (Reels + Long form)', 'Creatives (Daily + Franchise)', 'Franchise Work (Main Board, Countdown, Coming Soon)', 'Blog Images & Logo Design'],
                },
                {
                    name: 'Menzerna India',
                    platforms: 'Instagram, YouTube',
                    color: '#e74c3c',
                    tasks: ['Video Editing & Revisions', 'Daily & Occasional Creatives'],
                },
                {
                    name: 'Ecommerce',
                    platforms: 'Amazon & Flipkart',
                    color: '#00b894',
                    tasks: ['Product Images', 'A+ Content Creatives', 'Product Videos'],
                },
            ],
            otherTasks: ['Research & Trend Analysis', 'New Trends & AI Implementation', 'Team & Manager Meetings', 'Assigned Ad-hoc Work'],
            gallery: [], // Add image URLs to show sample work
            video: '',
        },

        // ===== SLIDE 2: LAST YEAR → CURRENT YEAR =====
        comparison: {
            title: 'Where We Were → Where We Are',
            lastYearLabel: 'FY 2024-25',
            currentYearLabel: 'FY 2025-26',
            stats: [
                { label: 'Social Media Creatives', lastYear: 280, currentYear: 420, suffix: '+', icon: '🎨' },
                { label: 'Videos Produced', lastYear: 35, currentYear: 78, suffix: '+', icon: '🎬' },
                { label: 'Reels & Shorts', lastYear: 0, currentYear: 45, suffix: '+', icon: '📱' },
                { label: 'Brand Collaterals', lastYear: 30, currentYear: 52, suffix: '+', icon: '📄' },
                { label: 'Avg. Turnaround', lastYear: 8, currentYear: 4, suffix: ' hrs', icon: '⚡', isLower: true },
                { label: 'Campaign Creatives', lastYear: 100, currentYear: 180, suffix: '+', icon: '📢' },
            ],
            achievements: [
                'Brand consistency maintained across all platforms',
                'Template system created — 35% faster output',
                'Video content launched — 2x engagement vs static',
                'AI tools adopted for faster ideation',
            ],
            gallery: [], // Add before/after work screenshots, best creatives
            video: '',
        },

        // ===== SLIDE 3: FUTURE PROJECTIONS =====
        projections: {
            title: 'Where We\'re Heading Next',
            yearLabel: 'FY 2026-27 Targets',
            stats: [
                { label: 'Social Media Creatives', target: 600, suffix: '+', growth: '43%', icon: '🎨' },
                { label: 'Video Content (All)', target: 150, suffix: '+', growth: '92%', icon: '🎬' },
                { label: 'Reels & Shorts', target: 120, suffix: '+', growth: '167%', icon: '📱' },
                { label: 'Motion Graphics', target: 100, suffix: '+', growth: 'NEW', icon: '✨' },
                { label: 'Ad Campaign Creatives', target: 250, suffix: '+', growth: '39%', icon: '📢' },
                { label: 'Total Annual Output', target: 1200, suffix: '+', growth: '55%', icon: '🚀' },
            ],
            impactGoals: [
                { metric: 'Social Media Engagement', target: '+40%' },
                { metric: 'Content Production Speed', target: '+35%' },
                { metric: 'Brand Consistency', target: '100%' },
                { metric: 'Video Content Reach', target: '2x' },
            ],
            gallery: [], // Add mockups, vision board screenshots
            video: '',
        },

        // ===== SLIDE 4: STRATEGY =====
        strategy: {
            title: 'The Roadmap to Get There',
            strategies: [
                { icon: '🎨', tag: 'DESIGN SYSTEM', title: 'Template & Design System', description: 'Standardized templates for social media, emailers, and ads — 40% faster production with 100% brand consistency.' },
                { icon: '🎬', tag: 'VIDEO-FIRST', title: 'Short-Form Video Factory', description: 'Weekly Reels & Shorts pipeline — trend-jacking, tutorials, product showcases for organic reach explosion.' },
                { icon: '🤖', tag: 'AI-POWERED', title: 'AI-Enhanced Workflows', description: 'Midjourney, Adobe Firefly & Runway ML for 3x faster ideation, concepting, and rapid prototyping.' },
                { icon: '📊', tag: 'PERFORMANCE', title: 'Data-Driven Design', description: 'A/B testing creatives, connecting design decisions to analytics — better CTR, lower CPC, higher ROAS.' },
            ],
            milestones: [
                { quarter: 'Q1', period: 'Apr-Jun', goal: 'Template system + Motion graphics kickoff' },
                { quarter: 'Q2', period: 'Jul-Sep', goal: 'Video-first strategy live + AI workflows' },
                { quarter: 'Q3', period: 'Oct-Dec', goal: '3D elements + Original asset library' },
                { quarter: 'Q4', period: 'Jan-Mar', goal: 'Full system matured + Year review' },
            ],
            gallery: [], // Add process visuals, workflow screenshots
            video: '',
        },

        // ===== SLIDE 5: THANK YOU =====
        thankyou: {
            title: 'Let\'s Make',
            highlight: 'FY27 Iconic',
            subtitle: 'Ready to elevate every pixel, every frame, every brand touchpoint.',
            asks: [
                '🖥️ Hardware/Software Upgrades',
                '📚 Training Budget for Courses',
                '🔑 Premium Tool Licenses',
                '⏰ Clear Brief & Feedback SLAs',
                '🧪 Freedom to Experiment',
            ],
            gallery: [],
            video: '',
        },
    },
};

// ===== UTILITY FUNCTIONS =====
function getConfig() {
    try {
        const saved = localStorage.getItem('ppt-config');
        if (saved) return deepMerge(DEFAULT_CONFIG, JSON.parse(saved));
    } catch (e) { console.warn('Config load failed', e); }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}
function saveConfig(config) { localStorage.setItem('ppt-config', JSON.stringify(config)); }
function resetConfig() { localStorage.removeItem('ppt-config'); return JSON.parse(JSON.stringify(DEFAULT_CONFIG)); }
function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else { result[key] = source[key]; }
    }
    return result;
}
function getThemeCSS(config) {
    const p = THEME_PRESETS[config.theme] || THEME_PRESETS.midnight;
    return `--bg-primary:${p.bgPrimary};--bg-secondary:${p.bgSecondary};--bg-card:${p.bgCard};--bg-card-hover:${p.bgCardHover};--border-card:${p.borderCard};--accent-1:${p.accent1};--accent-2:${p.accent2};--accent-3:${p.accent3};--text-primary:${p.textPrimary};--text-secondary:${p.textSecondary};--text-muted:${p.textMuted};--gradient:linear-gradient(${p.gradientDir},${p.accent1},${p.accent2});--gradient-2:linear-gradient(${p.gradientDir},${p.accent3},${p.accent1});`;
}
function getVideoEmbed(url) {
    if (!url) return '';
    let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
    m = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
    if (m) return `https://www.instagram.com/p/${m[1]}/embed`;
    if (url.match(/\.(mp4|webm|ogg)$/i)) return url;
    return url;
}
