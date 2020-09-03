import React from 'react';
import { Link } from 'gatsby';
import GlobalStyles from '../style/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../style/theme';
import Sun from '../../images/logo/sun.png';
import Moon from '../../images/logo/moon.png';

function useLocalStorage(defaultValue, key) {
    if (typeof window !== 'undefined') {
        const [value, setValue] = React.useState(() => {
            const stickyValue = window.localStorage.getItem(key);
            return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
        });
        React.useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(value));
        }, [key, value]);
        return [value, setValue];
        // } else {
        // return ['light', 'oowgnoj_dev'];
        // }
    }
}

const Header = ({ siteTitle }) => {
    const [theme, setTheme] = useLocalStorage('light', 'oowgnoj_dev');
    const changeTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Title>
                <StyledLink to="/" theme={theme}>
                    {siteTitle}
                </StyledLink>
                <DarkModeIcon theme={theme} onClick={changeTheme} src={theme === 'light' ? Moon : Sun} />
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
    padding: 45px 20px;
    text-decoration: none;
    color: ${props => (props.theme === 'light' ? 'black' : 'white')};
`;
