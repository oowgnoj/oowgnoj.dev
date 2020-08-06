import Typography from 'typography';

const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.45,
    headerFontFamily: ['Playfair Display', 'serif'],
    bodyFontFamily: ['Roboto', 'sans-serif'],
});

// Insert styles directly into the <head>
typography.injectStyles();

export default typography;
