import React, {useState} from 'react'
import styled from "styled-components"
import Img from "gatsby-image"
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Categories from "../components/categories"

const BackgroundImageComp = ({ node }) => {
  const image = node.frontmatter.photo
    return(
        // <BackgroundImage
        //   fluid={node.frontmatter.photo.childImageSharp.fluid}
        //   preserveStackingContext = {true}
        //   style={{
        //     display: 'inline-flex',
        //     backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        //     backgroundPosition: 'bottom right, left, right',
        //     objectFit: 'cover',
        //     opacity: '0.3',
        //     zIndex: '3',
        //     width: '300px',
        //     height: '300px'
        //   }}
        //   >

        <PostWrapper img={image}> 
              <Link style={{textDecoration: `none`}} to={node.frontmatter.title}>
                <PostTitle> <span> {node.frontmatter.title} </span> </PostTitle>
                <PostDate>{node.frontmatter.date}</PostDate>
                <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
              </Link>
        </PostWrapper>

    )
}



const PostWrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 10px; 
  height: 300px;
  background-size: cover;
  background-image: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url(${props => props.img});
  &:hover {
    background-image: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(${props => props.img});
  }
  div {
    visibility: hidden;
  }


  &:hover div{
    visibility: visible;
  }

`
const PostTitle = styled.div`
  font-size: 26px;
  color: black;
  font-weight: bold;
  padding-bottom: 5px;
  
`

const PostSubtitle = styled.div`
  font-size: 16px;
  color: #484848;
  padding-bottom: 5px;
  
`

const PostPreview = styled.div`
  font-size: 14px;
  color: #484848;
  padding-bottom: 5px;

`
const PostDate = styled.div`
  font-size: 13px;
  color: #484848;
  padding-bottom: 5px;
`
export default BackgroundImageComp;