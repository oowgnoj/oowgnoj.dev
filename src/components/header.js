import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../utils/globalStyle';
import { lightTheme, darkTheme } from '../utils/Theme';
import { ThemeProvider } from 'styled-components';

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
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
                <h1>
                    <Link
                        to="/"
                        style={{
                            color: 'rgb(72,72,72)',
                            textDecoration: 'none',
                            fontSize: '1.875rem',
                            padding: '45px 20px',
                        }}
                    >
                        {siteTitle}
                    </Link>
                    <button onClick={themeToggler}>Switch Theme</button>
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
