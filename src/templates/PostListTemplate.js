  
import React from 'react';
import PostCategory from '../components/categories';
import SEO from '../components/seo';
import { useStaticQuery, Link } from "gatsby"
import Layout from "../components/layout"
import Categories from "../components/categories"


const PostListTemplate = (props) => {
  const { cagtegory, pagePath, nodes } = props.pageContext;
  return (
    <Layout>
    <SEO title="Home" />
    <Categories></Categories>
      <ul>
        {nodes.map( node => (
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
  );
};


export default PostListTemplate;