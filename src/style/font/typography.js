import Typography from 'typography';
import './ibm-plex/index.css';

const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 1.7,
    baseLetterSpacing: '-0.004em',
    bodyFontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Helvetica Neue',
        'Apple SD Gothic Neo',
        'Ibm-flex',
        'sans-serif',
    ],
});

// Insert styles directly into the <head>
typography.injectStyles();
export default typography;
