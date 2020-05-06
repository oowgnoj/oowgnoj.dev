  
import React from 'react';
import PostCategory from '../components/categories';
import SEO from '../components/seo';
import { useStaticQuery, Link } from "gatsby"
import Layout from "../components/layout"
import Categories from "../components/categories"
import styled from "styled-components"


const PostListTemplate = ({location, pageContext}) => {
  const { cagtegory, pagePath, nodes} = pageContext;
  const current = location.state ? location.state.current : undefined;

  return (
    <Layout>
    <SEO title="Home" />
    <Categories current={current}></Categories>
        {nodes.map( node => (
          <PostItem key={node.id}>
            <PostItemWrapper>
            {console.log(node.frontmatter)}
              <Link to={node.frontmatter.title}  style={{textDecoration: `none`}}>
                <PostTitle> {node.frontmatter.title} </PostTitle>
                <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
                <PostDate>{node.frontmatter.date? node.frontmatter.date.slice(0,10):null}</PostDate>
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
`

const PostItemWrapper = styled.div`
  padding-top: 20px;
  &:hover{
    box-shadow:inset 0 -3px 0 #90AFC5;
  }
`
const PostTitle = styled.div`
  font-size: 26px;
  color: rgb(72,72,72);
  font-weight: bold;
  padding-bottom: 5px;
  @media(max-width:767px){
    font-size: 21px;  
  }
`

const PostSubtitle = styled.div`
  font-size: 16px;
  color: #484848;
  padding-bottom: 5px;
  @media(max-width:767px){
    font-size: 15px;  
  }
  
`

const PostPreview = styled.div`
  font-size: 14px;
  color: #484848;
  padding-bottom: 5px;
  @media(max-width:767px){
    font-size: 12px;  
  }

`
const PostDate = styled.div`
  font-size: 13px;
  color: #484848;
  padding-bottom: 5px;
  @media(max-width:767px){
    font-size: 12px;  
  }
`
