import React, { useState, useEffect } from 'react';
import { useStaticQuery, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Categories from '../components/categories';
import styled, { ThemeProvider } from 'styled-components';
require('../font/fonts.css');

const IndexPage = () => {
    const [current, setCurrent] = useState('ALL');
    const handleCurrent = category => {
        setCurrent(category);
    };

    const postData = useStaticQuery(graphql`
        query LatestPostListQuery {
            allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
                edges {
                    node {
                        excerpt(truncate: true, pruneLength: 200)
                        frontmatter {
                            title
                            category
                            subtitle
                            tags
                            date(formatString: "YYYY-MM-DD")
                        }
                        id
                    }
                }
            }
        }
    `);

    return (
        <Layout isMain={true}>
            <SEO title="Home" />
            <Categories current={current} setCurrent={handleCurrent} />
            <PostList>
                {postData.allMarkdownRemark.edges
                    .filter(({ node }) => {
                        return current === 'ALL' ? true : current == node.frontmatter.category;
                    })
                    .map(({ node }) => (
                        <PostItem key={node.id}>
                            <PostItemWrapper>
                                <Link to={node.frontmatter.title} style={{ textDecoration: `none` }}>
                                    <PostTitle> {node.frontmatter.title} </PostTitle>
                                    <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
                                    <PostDate>
                                        {node.frontmatter.date ? node.frontmatter.date.slice(0, 10) : null}
                                    </PostDate>
                                </Link>
                            </PostItemWrapper>
                        </PostItem>
                    ))}
            </PostList>
        </Layout>
    );
};
export default IndexPage;

const PostList = styled.li`
    list-style: none;
`;
const PostItem = styled.li`
    list-style: none;
    margin-bottm: 2rem;
`;

const PostItemWrapper = styled.div`
    padding-top: 20px;
    &:hover {
        box-shadow: inset 0 -3px 0 #90afc5;
    }
`;
const PostTitle = styled.div`
    font-size: 26px;
    font-weight: bold;
    padding-bottom: 5px;
    @media (max-width: 767px) {
        font-size: 21px;
    }
`;

const PostSubtitle = styled.div`
    font-size: 16px;
    padding-bottom: 5px;
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;

const PostDate = styled.div`
    font-size: 13px;
    padding-bottom: 5px;
    @media (max-width: 767px) {
        font-size: 12px;
    }
`;
