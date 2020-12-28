import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout';
import SEO from '../layout/seo';

export default ({ data }) => {
    return (
        <Layout>
            <SEO title="Home" />
            <PostList>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                    const { path, title, date } = node.frontmatter;
                    return (
                        <React.Fragment key={title}>
                            <PostTitle>
                                <Link to={'/' + path}>{title}</Link>
                            </PostTitle>
                            <PostDate>{date ? date.slice(0, 10) : null}</PostDate>
                        </React.Fragment>
                    );
                })}
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

const PostList = styled.main`
    display: grid;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    grid-template-columns: 1fr min-content;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-row-gap: 0;
    }
`;

const PostTitle = styled.div`
    white-space: nowrap;
    overflow: hidden;
    font-weight: 500;

    @media (max-width: 767px) {
        text-decoration: underline;
    }

    &:hover {
        text-decoration: underline;
    }
`;

const PostDate = styled.div`
    white-space: pre;
    font-variant-numeric: tabular-nums;
`;
