/* ============================================
   PPT CONFIG — All Data Lives Here
   Stored in localStorage, editable via Admin Panel
   ============================================ */

const THEME_PRESETS = {
    midnight: {
        name: 'Midnight',
        bgPrimary: '#08090d',
        bgSecondary: '#0e1017',
        bgCard: 'rgba(255,255,255,0.03)',
        bgCardHover: 'rgba(255,255,255,0.06)',
        borderCard: 'rgba(255,255,255,0.08)',
        accent1: '#6c5ce7',
        accent2: '#00cec9',
        accent3: '#fd79a8',
        textPrimary: '#f0f0f5',
        textSecondary: 'rgba(240,240,245,0.6)',
        textMuted: 'rgba(240,240,245,0.35)',
        gradientDir: '135deg',
    },
    ocean: {
        name: 'Ocean',
        bgPrimary: '#0a1628',
        bgSecondary: '#0d1f3c',
        bgCard: 'rgba(255,255,255,0.04)',
        bgCardHover: 'rgba(255,255,255,0.07)',
        borderCard: 'rgba(100,180,255,0.1)',
        accent1: '#0984e3',
        accent2: '#74b9ff',
        accent3: '#a29bfe',
        textPrimary: '#eaf4ff',
        textSecondary: 'rgba(234,244,255,0.6)',
        textMuted: 'rgba(234,244,255,0.35)',
        gradientDir: '135deg',
    },
    ember: {
        name: 'Ember',
        bgPrimary: '#120a0a',
        bgSecondary: '#1a0e0e',
        bgCard: 'rgba(255,100,50,0.04)',
        bgCardHover: 'rgba(255,100,50,0.08)',
        borderCard: 'rgba(255,100,50,0.12)',
        accent1: '#e17055',
        accent2: '#fdcb6e',
        accent3: '#ff7675',
        textPrimary: '#fff5f0',
        textSecondary: 'rgba(255,245,240,0.6)',
        textMuted: 'rgba(255,245,240,0.35)',
        gradientDir: '135deg',
    },
    forest: {
        name: 'Forest',
        bgPrimary: '#0a120e',
        bgSecondary: '#0e1a14',
        bgCard: 'rgba(0,200,150,0.04)',
        bgCardHover: 'rgba(0,200,150,0.07)',
        borderCard: 'rgba(0,200,150,0.1)',
        accent1: '#00b894',
        accent2: '#55efc4',
        accent3: '#81ecec',
        textPrimary: '#f0fff8',
        textSecondary: 'rgba(240,255,248,0.6)',
        textMuted: 'rgba(240,255,248,0.35)',
        gradientDir: '135deg',
    },
    royal: {
        name: 'Royal',
        bgPrimary: '#0d0a14',
        bgSecondary: '#120e1e',
        bgCard: 'rgba(160,100,255,0.04)',
        bgCardHover: 'rgba(160,100,255,0.07)',
        borderCard: 'rgba(160,100,255,0.1)',
        accent1: '#a855f7',
        accent2: '#c084fc',
        accent3: '#e879f9',
        textPrimary: '#f5f0ff',
        textSecondary: 'rgba(245,240,255,0.6)',
        textMuted: 'rgba(245,240,255,0.35)',
        gradientDir: '135deg',
    },
};

const ANIMATION_PRESETS = {
    'fade-up': 'Fade Up',
    'slide-left': 'Slide Left',
    'scale': 'Scale In',
    'bounce': 'Bounce In',
    'blur': 'Blur In',
};

const DEFAULT_CONFIG = {
    theme: 'midnight',
    animation: 'fade-up',
    animationSpeed: 'normal', // slow, normal, fast

    presenter: {
        name: 'Aman Kumar',
        role: 'Graphic Designer & Video Editor',
        department: 'Digital Department',
        company: 'Manmachine Group',
    },

    slides: {
        // SLIDE 1: Introduction
        intro: {
            badge: 'ANNUAL BUSINESS PLAN & REVIEW',
            title: 'Digital Department',
            subtitle: 'FY 2026-27',
            description: 'Graphic Design & Video Production — Individual Performance Review',
            profileImage: '',
            brands: [
                { name: 'Manmachine', logo: '' },
                { name: 'Exppress Car Wash', logo: '' },
                { name: 'Tools Depot India', logo: '' },
                { name: 'Manmachine Works', logo: '' },
            ],
            skills: ['Adobe Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Canva Pro', 'Midjourney AI', 'Video Editing', 'Motion Graphics'],
            video: '',
        },

        // SLIDE 2: Last Year vs Current Year
        comparison: {
            title: 'From Where We Started → To Where We Are',
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
                'Brand consistency maintained across all digital platforms',
                'Template system created — 35% faster production',
                'Video content launched — 2x engagement vs static posts',
                'AI-powered workflows adopted (Midjourney, Firefly)',
            ],
            image: '',
            video: '',
        },

        // SLIDE 3: Future Projections
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
            image: '',
            video: '',
        },

        // SLIDE 4: Strategy
        strategy: {
            title: 'The Roadmap to Get There',
            strategies: [
                {
                    icon: '🎨',
                    tag: 'DESIGN SYSTEM',
                    title: 'Template & Design System',
                    description: 'Standardized templates for social media, emailers, and ads — 40% faster production with 100% brand consistency.',
                },
                {
                    icon: '🎬',
                    tag: 'VIDEO-FIRST',
                    title: 'Short-Form Video Factory',
                    description: 'Weekly Reels & Shorts pipeline — trend-jacking, tutorials, product showcases for organic reach explosion.',
                },
                {
                    icon: '🤖',
                    tag: 'AI-POWERED',
                    title: 'AI-Enhanced Workflows',
                    description: 'Midjourney, Adobe Firefly & Runway ML for 3x faster ideation, concepting, and rapid prototyping.',
                },
                {
                    icon: '📊',
                    tag: 'PERFORMANCE',
                    title: 'Data-Driven Design',
                    description: 'A/B testing creatives, connecting design decisions to analytics — better CTR, lower CPC, higher ROAS.',
                },
            ],
            milestones: [
                { quarter: 'Q1', period: 'Apr-Jun', goal: 'Template system + Motion graphics kickoff' },
                { quarter: 'Q2', period: 'Jul-Sep', goal: 'Video-first strategy live + AI workflows' },
                { quarter: 'Q3', period: 'Oct-Dec', goal: '3D elements + Original asset library' },
                { quarter: 'Q4', period: 'Jan-Mar', goal: 'Full system matured + Year review' },
            ],
            image: '',
            video: '',
        },

        // SLIDE 5: Thank You
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
            image: '',
            video: '',
        },
    },
};

// Load/Save Config
function getConfig() {
    try {
        const saved = localStorage.getItem('ppt-config');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Deep merge with defaults to handle new fields
            return deepMerge(DEFAULT_CONFIG, parsed);
        }
    } catch (e) {
        console.warn('Config load failed, using defaults', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function saveConfig(config) {
    localStorage.setItem('ppt-config', JSON.stringify(config));
}

function resetConfig() {
    localStorage.removeItem('ppt-config');
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

function getThemeCSS(config) {
    const preset = THEME_PRESETS[config.theme] || THEME_PRESETS.midnight;
    return `
        --bg-primary: ${preset.bgPrimary};
        --bg-secondary: ${preset.bgSecondary};
        --bg-card: ${preset.bgCard};
        --bg-card-hover: ${preset.bgCardHover};
        --border-card: ${preset.borderCard};
        --accent-1: ${preset.accent1};
        --accent-2: ${preset.accent2};
        --accent-3: ${preset.accent3};
        --text-primary: ${preset.textPrimary};
        --text-secondary: ${preset.textSecondary};
        --text-muted: ${preset.textMuted};
        --gradient: linear-gradient(${preset.gradientDir}, ${preset.accent1}, ${preset.accent2});
        --gradient-2: linear-gradient(${preset.gradientDir}, ${preset.accent3}, ${preset.accent1});
    `;
}

function getVideoEmbed(url) {
    if (!url) return '';
    // YouTube
    let match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    // Instagram
    match = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.instagram.com/p/${match[1]}/embed`;
    // Direct video URL
    if (url.match(/\.(mp4|webm|ogg)$/i)) return url;
    return url;
}
