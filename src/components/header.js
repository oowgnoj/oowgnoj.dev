import React from 'react';
import { Link, navigate } from 'gatsby';
import GlobalStyles from '../style/globalStyle';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import BackIcon from '../assets/back-btn.svg';

const menus = [
    { label: 'Writing', to: '/' },
    { label: 'Reading', to: '/reading' },
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: 'about' },
];
const Header = props => {
    const { pathname } = useLocation();
    const showMenu = pathname === '/reading' || pathname === '/';

    return (
        <Wrapper>
            <GlobalStyles />
            <Title showMenu={showMenu}>oowgnoj</Title>
            <Menus showMenu={showMenu}>
                {menus.map(el => (
                    <Menu key={el.label} selected={el.to === pathname}>
                        <StyledLink to={el.to}>{el.label}</StyledLink>
                    </Menu>
                ))}
            </Menus>
            <Icon src={BackIcon} onClick={() => window.history.back()} showMenu={showMenu} />
        </Wrapper>
    );
};

export default Header;
const Wrapper = styled.div`
    position: sticky;
    top: 10px;
    right: 10%;
    width: fit-content;
    height: max-content;
    padding-right: 20px;
    z-index: 1000;

    @media (max-width: 767px) {
        position: sticky;
        top: 0;
        width: 100%;
        padding: 0 20px;
        padding-bottom: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        border-bottom: 1px solid #000;
        padding: ${props => !props.showMenu && '10px 20px'};
        magin: ${props => !props.showMenu && '0px'};
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Title = styled.div`
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    @media (max-width: 767px) {
        font-size: ${props => !props.showMenu && '0px'};
    }
`;

const Menus = styled.div`
    @media (max-width: 767px) {
        display: ${props => (props.showMenu ? 'block' : 'none')};
    }
    text-decoration: none;
`;
const Menu = styled.div`
    width: max-content;
    text-decoration: none;
    background-image: ${props =>
        props.selected &&
        `linear-gradient(
        transparent 0%,
        transparent calc(50% - 4px),
        rgb(203, 203, 203) calc(50% - 4px),
        rgb(203, 203, 203) 100%
    )`};
    transition: ${props => props.selected && `background-position 120ms ease-in-out 0s, padding 120ms ease-in-out 0s`};
    background-size: ${props => props.selected && `100% 200%`};
`;

const Icon = styled.img`
    display: none;
    @media (max-width: 767px) {
        display: ${props => (props.showMenu ? 'none' : 'block')};
        width: 25px;
        height: 25px;
        padding: 0;
        margin: 0;
    }
`;
