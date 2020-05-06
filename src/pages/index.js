import React, {useState} from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Categories from "../components/categories"
import ImagePost from "../components/imagePost"
import styled from "styled-components"
import Img from "gatsby-image"
// import ImagePost from 'gatsby-background-image'


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
                photo
                date(formatString: "YYYY-MM-DD")
              }
              id
            }
          }
        }
      }
  `
)
  // const ImagePost = isHover ? postData.node.frontmatter.photo.childImageSharp.fluid : null
  return(
    <Layout>
    <SEO title="Home" />
    <Categories/>
      <PostList>
        {postData.allMarkdownRemark.edges.map(({ node }) => (
           <ImagePost node={node}/>
        ))}
      </PostList>
  </Layout>
  )
}
export default IndexPage


const PostList = styled.li`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 60px;
  grid-auto-rows: minmax(100px, auto);
  @media(max-width: 767px){
    grid-template-columns: repeat(1, 1fr);
  }
`



const Slogan = styled.div`
  font-size: 100px;
`