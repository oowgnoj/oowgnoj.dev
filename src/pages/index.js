import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Categories from "../components/categories"
import styled from "styled-components"


const IndexPage = () => {
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
  `
)

  return(
    <Layout>
    <SEO title="Home" />
    <Categories></Categories>
      <PostList>
        {postData.allMarkdownRemark.edges.map(({ node }) => (
          <PostWrapper>
              <Link style={{textDecoration: `none`}} to={node.frontmatter.title}>
                <PostTitle> {node.frontmatter.title} </PostTitle>

                <PostDate>{node.frontmatter.date}</PostDate>
                <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
              </Link>
        </PostWrapper>
        ))}
      </PostList>
  </Layout>
  )
}
export default IndexPage


const PostList = styled.li`
  list-style: none;
`

const PostWrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 10px;
  &:hover{
    box-shadow:inset 0 -3px 0 #90AFC5;
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
