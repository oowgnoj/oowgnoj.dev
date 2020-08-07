import '../font/fonts.css';

import Typography from 'typography';

const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 1.625,
    headerFontFamily: ['IBM-flex-mono', 'sans-serif'],
    bodyFontFamily: ['Ibm-flex', 'sans-serif'],
    bodyFontWeight: 700,
});

// Insert styles directly into the <head>
typography.injectStyles();

export default typography;
