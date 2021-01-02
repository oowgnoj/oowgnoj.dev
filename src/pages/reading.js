import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout';
import SEO from '../layout/seo';
import Star from '../../images/star.png';

export default ({ data }) => {
    return (
        <Layout>
            <SEO title="Home" />
            <PostList>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                    const { path, title, date, author, rating } = node.frontmatter;
                    return (
                        <React.Fragment key={title}>
                            <PostTitle>
                                <Link to={'/' + path}>{title}</Link>
                            </PostTitle>
                            <PostAuthor>
                                <Link to={'/' + path}>{author}</Link>
                            </PostAuthor>
                            <PostDate>{date ? date.slice(0, 10) : null}</PostDate>
                            {console.log(rating)}
                            <PostAuthor>{Array(rating).fill(<StarIcon src={Star} />)}</PostAuthor>
                        </React.Fragment>
                    );
                })}
            </PostList>
        </Layout>
    );
};

export const query = graphql`
    query LatestReadingQuery {
        allMarkdownRemark(
            filter: { frontmatter: { layout: { eq: "reading" } } }
            sort: { order: DESC, fields: frontmatter___date }
        ) {
            edges {
                node {
                    excerpt(truncate: true, pruneLength: 200)
                    frontmatter {
                        path
                        title
                        category
                        subtitle
                        tags
                        author
                        rating
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
    grid-template-columns: 1fr 0.75fr min-content 70px;

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

const PostAuthor = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PostDate = styled.div`
    white-space: pre;
    font-variant-numeric: tabular-nums;
`;

const StarIcon = styled.img`
    width: 13px;
    height: 12px;
`;
