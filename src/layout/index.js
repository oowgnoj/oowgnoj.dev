import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import Header from '../components/header';
import styled from 'styled-components';
import './index.css';

deckDeckGoHighlightElement();

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
                <Contents>
                    <main>{children}</main>
                </Contents>
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

const Contents = styled.div`
    padding: 0 20px;
    @media (max-width: 767px) {
        padding: 0
    }
`;

const Main = styled.div`
    margin: 0 auto;
    max-width: 680px;
    @media (max-width: 767px) {
        padding: 0 !important;
    }
`;

const Footer = styled.footer`
    margin-top: 100px;
    font-size: 15px;
    font-weight: 700;
`;

export default Layout;
