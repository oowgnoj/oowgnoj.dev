import Typography from 'typography';
import './ibm-plex/index.css';

const typography = new Typography({
    baseFontSize: '18px',
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

    // -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
});

// Insert styles directly into the <head>
typography.injectStyles();
export default typography;
