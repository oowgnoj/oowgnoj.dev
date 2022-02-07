import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import Header from '../components/header';
import MobileHeader from '../components/header.mobile';
import styled from 'styled-components';
import './index.css';

deckDeckGoHighlightElement();

const Layout = ({ children }) => {
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
            <Header metaData={data.site.siteMetadata} />
            <Main>
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
    max-width: 1024px;
    @media (max-width: 767px) {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0 0;
    }
`;

const Contents = styled.div`
    padding: 0 20px;
    @media (max-width: 767px) {
    }
`;

const Main = styled.div`
    margin: 0 auto;
    max-width: 680px;
    margin-top: -144px;
    @media (max-width: 767px) {
        /* padding: 0 !important; */
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0 0;
        /* padding: 0 !important; */
    }
`;

const Footer = styled.footer`
    display: flex;
    margin-top: 100px;
    font-size: 15px;
    font-weight: 700;
`;

export default Layout;
