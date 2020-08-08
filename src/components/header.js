import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../utils/globalStyle';
import { lightTheme, darkTheme } from '../utils/Theme';
import styled, { ThemeProvider } from 'styled-components';
import Sun from '../images/sun.png';
import Moon from '../images/moon.png';
function useStickyState(defaultValue, key) {
    if (typeof window !== 'undefined') {
        const [value, setValue] = React.useState(() => {
            const stickyValue = window.localStorage.getItem(key);
            return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
        });
        React.useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(value));
        }, [key, value]);
        return [value, setValue];
    } else {
        return ['light', 'mode_jp'];
    }
}

const Header = ({ siteTitle }) => {
    const [theme, setTheme] = useStickyState('light', 'mode_jp');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            fontSize: '2',
                            color: theme === 'light' ? 'black' : 'white',
                            padding: '45px 20px',
                        }}
                    >
                        {siteTitle}
                    </Link>
                    <DarkModeIcon theme={theme} onClick={themeToggler} src={theme === 'light' ? Moon : Sun} />
                </h1>
            </>
        </ThemeProvider>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: '',
};

export default Header;

const DarkModeIcon = styled.img`
    width: 44px;
    height: 44px;
    margin: 0;
    align-self: center;
    -webkit-filter: ${props => (props.theme === 'light' ? null : 'invert(100%)')};
`;
