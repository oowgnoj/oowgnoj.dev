import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from '../components/header';
import styled from 'styled-components';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();
require('./layout.css');

const Layout = ({ children, isMain }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <Wrapper>
            <Header siteTitle={data.site.siteMetadata.title} />
            <Main isMain={isMain}>
                <main>{children}</main>
                <Footer>
                    © {new Date().getFullYear()}, by oowgnoj
                    {` `}
                </Footer>
            </Main>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    max-width: 1024px;
    @media (max-width: 767px) {
        padding: 1rem;
    }
`;

const Main = styled.div`
    margin: 0 auto;
    max-width: ${props => (props.isMain ? 1200 : 800)};
    padding: 45px 20px;
    max-width: 960;
    @media (max-width: 767px) {
        padding: 0 !important;
    }
`;

const Footer = styled.footer`
    margin: 0 20px;
    font-weight: 500;
`;

export default Layout;
