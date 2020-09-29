import React from 'react';
import { Link } from 'gatsby';
import GlobalStyles from '../style/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import useDarkMode from '../hooks/useDarkMode';
import { lightTheme, darkTheme } from '../style/theme';
import Sun from '../../images/logo/sun.png';
import Moon from '../../images/logo/moon.png';

const Header = ({ siteTitle }) => {
    const [theme, themeToggler] = useDarkMode();
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Title>
                <StyledLink to="/" theme={theme}>
                    {siteTitle}
                </StyledLink>
                <DarkModeIcon theme={theme} onClick={themeToggler} src={theme === 'light' ? Moon : Sun} />
            </Title>
        </ThemeProvider>
    );
};

export default Header;

const Title = styled.h1`
    display: flex;
    justify-content: space-between;
`;
const DarkModeIcon = styled.img`
    width: 44px;
    height: 44px;
    margin: 0;
    align-self: center;
    filter: ${props => (props.theme === 'light' ? null : 'invert(100%)')};
`;

const StyledLink = styled(Link)`
    font-size: 32px;
    padding: 45px 20px;
    text-decoration: none;
    color: ${props => (props.theme === 'light' ? 'black' : 'white')};
`;
