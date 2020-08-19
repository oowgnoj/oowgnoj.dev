import '../font/fonts.css';

import Typography from 'typography';

const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 1.625,
    bodyFontFamily: ['Ibm-flex', 'sans-serif'],
});

// Insert styles directly into the <head>
typography.injectStyles();

export default typography;
