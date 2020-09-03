import Typography from 'typography';
import './ibm-plex/index.css';

const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 1.625,
    bodyFontFamily: ['Ibm-flex', 'sans-serif'],
});

// Insert styles directly into the <head>
typography.injectStyles();
export default typography;
