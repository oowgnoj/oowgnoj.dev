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
        allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
          edges {
            node {
              excerpt(truncate: true, pruneLength: 200)
              frontmatter {
                title
                category
                subtitle
                tags
                date(formatString: "YYYY-MM-DD HH:mm:ss")
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
          <li key={node.id}>
              <Link style={{textDecoration: `none`}} to={node.frontmatter.title}>
                <PostTitle> {node.frontmatter.title} </PostTitle>
              </Link>
            <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
            <PostPreview>{node.excerpt.slice(0, 100)}</PostPreview>
            <PostDate>{node.frontmatter.date}</PostDate>
            <hr />
          </li>
        ))}
      </PostList>
  </Layout>
  )
}
export default IndexPage


const PostList = styled.li`
  list-style: none;
`

const PostTitle = styled.div`
  font-size: 26px;
  color: black;
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
  padding-bottom: 9px;
  font-style: italic;
`
