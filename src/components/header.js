import React from 'react';
import { Link } from 'gatsby';
import GlobalStyles from '../style/globalStyle';
import styled from 'styled-components';
// const menus = ['Writing', 'Reading', 'Projects', 'About',];

const menus = [
    { label: 'Writing', to: '/' },
    { label: 'Projects', to: 'projects' },
    { label: 'About', to: 'about' },
];
const Header = ({ siteTitle }) => {
    return (
        <Wrapper>
            <GlobalStyles />
            <Title>{siteTitle}</Title>
            <Menus>
                {menus.map(el => (
                    <Menu>
                        <StyledLink to={el.to}>{el.label}</StyledLink>
                    </Menu>
                ))}
            </Menus>
        </Wrapper>
    );
};

export default Header;
const Wrapper = styled.div`
    position: absolute;
    right: 50%;
    margin-right: 340px !important;
    padding-right: 20px;
    @media (max-width: 767px) {
        position: inherit;
        width: 100%;
        padding: 0 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #000;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    text-weight: 500;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Menus = styled.div`
    text-decoration: none;
    text-weight: 500;
`;
const Menu = styled.div`
    text-decoration: none;
    text-weight: 500;
`;
