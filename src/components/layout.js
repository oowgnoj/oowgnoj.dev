/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import styled from 'styled-components';

const Layout = ({ children, isMain }) => {
    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };
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
            <Main
                style={{
                    margin: `0 auto`,
                    maxWidth: isMain ? 1200 : 800,
                    padding: `45px 20px`,
                }}
            >
                <main>{children}</main>
                <footer style={{ marginTop: '20px', marginBottom: '20px', fontWeight: '500'}}>
                    © {new Date().getFullYear()}, by oowgnoj
                    {` `}
                </footer>
            </Main>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 1024px;
    padding: 2rem;
    margin: 0 auto;
    @media (max-width: 767px) {
        padding: 1rem;
    }
`;

const Main = styled.div`
    max-width: 960;
    padding: 0 5rem 0 5rem;
    @media (max-width: 767px) {
        padding: 0 !important;
    }
`;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
