import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Categories from '../components/category';
import Layout from '../layout';
import SEO from '../layout/seo';

export default ({ data }) => {
    const [current, setCurrent] = useState('ALL');
    const handleCurrent = category => {
        setCurrent(category);
    };
    return (
        <Layout isMain={true}>
            <SEO title="Home" />
            <Categories current={current} setCurrent={handleCurrent} />
            <PostList>
                {data.allMarkdownRemark.edges
                    .filter(({ node }) => {
                        return current === 'ALL' ? true : current === node.frontmatter.category;
                    })
                    .map(({ node }) => (
                        <PostItem key={node.id}>
                            <PostItemWrapper>
                                <Link to={'/' + node.frontmatter.path} style={{ textDecoration: `none` }}>
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

export const query = graphql`
    query LatestPostListQuery {
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
            edges {
                node {
                    excerpt(truncate: true, pruneLength: 200)
                    frontmatter {
                        path
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
`;

const PostList = styled.li`
    list-style: none;
`;
const PostItem = styled.li`
    margin-bottom: 2rem;
    list-style: none;
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
