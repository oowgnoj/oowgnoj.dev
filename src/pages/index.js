import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Categories from "../components/categories"


const IndexPage = () => {
  const postData = useStaticQuery(graphql`
    query LatestPostListQuery {
        allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
          edges {
            node {
              excerpt(truncate: true, pruneLength: 200)
              frontmatter {
                title
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
      <ul>
        {postData.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>
              <Link to={node.frontmatter.title}>{node.frontmatter.title}</Link>
            </h2>
            <h3>{node.frontmatter.date}</h3>
            <p>{node.excerpt}</p>
            <hr />
          </li>
        ))}
      </ul>
  </Layout>
  )
}
export default IndexPage
