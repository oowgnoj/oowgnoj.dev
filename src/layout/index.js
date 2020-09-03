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
    padding: 45px 20px;
    max-width: ${props => (props.isMain ? '100%' : '640px')};
    @media (max-width: 767px) {
        padding: 0 !important;
    }
`;

const Footer = styled.footer`
    margin: 0 20px;
    font-weight: 500;
`;

export default Layout;
