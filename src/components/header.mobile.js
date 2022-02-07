import React from 'react';
import { Link } from 'gatsby';
import GlobalStyles from '../style/globalStyle';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import BackIcon from '../assets/back-btn.svg';

const MobileHeader = props => {
    return (
        <Wrapper>
            <GlobalStyles />
            <Icon url={BackIcon} />
        </Wrapper>
    );
};

export default MobileHeader;
const Wrapper = styled.div`
    position: sticky;
    display: flex;
    top: 10px;
    height: fit-content;
    flex-direction: column;
    background-color: #fff;

    @media (max-width: 767px) {
        position: sticky;
        top: 0;
        width: 100%;
        padding: 0 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        background-color: none;
    }
`;

const Icon = styled.span`
    background-image: url(${props => props.url});
`;
