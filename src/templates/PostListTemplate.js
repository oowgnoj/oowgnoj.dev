import React from 'react';
import SEO from '../components/seo';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Categories from '../components/categories';
import styled from 'styled-components';
require('../font/fonts.css');

const PostListTemplate = ({ location, pageContext }) => {
    const { nodes } = pageContext;
    const current = location.state ? location.state.current : undefined;

    return (
        <Layout isMain={true}>
            <SEO title="글 목록" />
            <Categories current={current} />
            {nodes.map(node => (
                <PostItem key={node.id}>
                    <PostItemWrapper>
                        <Link to={node.frontmatter.title} style={{ textDecoration: `none` }}>
                            <PostTitle> {node.frontmatter.title} </PostTitle>
                            <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
                            <PostDate>{node.frontmatter.date ? node.frontmatter.date.slice(0, 10) : null}</PostDate>
                        </Link>
                    </PostItemWrapper>
                </PostItem>
            ))}
        </Layout>
    );
};

export default PostListTemplate;

const PostItem = styled.li`
    list-style: none;
`;

const PostItemWrapper = styled.div`
    padding: 20px 0;
    &:hover {
        padding-bottom: 20px;
        box-shadow: inset 0 -3px 0 #90afc5;
    }
`;
const PostTitle = styled.div`
    font-family: IBM-flex-mono;
    font-weight: bold;
    font-size: 26px;
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

const PostPreview = styled.div`
    font-size: 14px;
    padding-bottom: 5px;
    @media (max-width: 767px) {
        font-size: 12px;
    }
`;
const PostDate = styled.div`
    font-size: 13px;
    padding-bottom: 5px;
    @media (max-width: 767px) {
        font-size: 12px;
    }
`;
