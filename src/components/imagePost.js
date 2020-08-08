import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
// import Img from "gatsby-image"
// import BackgroundImage from 'gatsby-background-image'
import { Link } from 'gatsby';
// import { Query } from '../../graphql-types';
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import Categories from "../components/categories"

const Post = ({ node }) => {
    const image = node.frontmatter.photo;
    const touchRef = useRef('');
    const [mobileTouch, setTouch] = useState(false);
    useEffect(() => {
        touchRef.current.addEventListener('touchstart', () => {
            setTouch(true);
        });
        touchRef.current.addEventListener('touchend', () => {
            setTouch(false);
        });
    }, []);
    return (
        <Link style={{ textDecoration: `none` }} to={node.frontmatter.title}>
            <PostWrapper img={image} ref={touchRef} mobileTouch={mobileTouch}>
                <TextWrapper>
                    <PostTitle>
                        {' '}
                        <span> {node.frontmatter.title} </span>{' '}
                    </PostTitle>
                    <PostDate>{node.frontmatter.date}</PostDate>
                    <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
                </TextWrapper>
            </PostWrapper>
        </Link>
    );
};

const PostWrapper = styled.div`
    height: 300px;
    width: auto;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url(${props => props.img});
    &:hover {
        background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
            url(${props => props.img});
    }
    div {
        visibility: hidden;
    }
    &:hover div {
        visibility: visible;
    }
`;

const TextWrapper = styled.div`
    height: 300px;
    background-color: rgba(256, 256, 256, 0.6);
    padding: 30px;
`;
const PostTitle = styled.h2`
    font-size: 26px;
    color: black;
    font-weight: bold;
    padding-bottom: 5px;
    padding-top: 60px;
`;

const PostSubtitle = styled.div`
    font-size: 16px;
    color: #484848;
    padding-bottom: 5px;
`;

const PostPreview = styled.div`
    font-size: 14px;
    color: #484848;
    padding-bottom: 5px;
`;
const PostDate = styled.div`
    font-size: 15px;
    color: #484848;
    padding-bottom: 5px;
`;
export default Post;

// mobile touch 보정

// @media(max-width: 767px){
//   border: black;
//   background-size: 100% 60%;
//   background-image: ${props => props.mobileTouch ? `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(${props => props.img})` : `linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1)), url(${props => props.img})`};
// }
