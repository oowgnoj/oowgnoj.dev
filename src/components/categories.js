import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import CategoryItem from './categoryItem'

const Categories =  () => {
  const data =  useStaticQuery(graphql`
        query getCategories {
        allMarkdownRemark {
            totalCount
            group(field: frontmatter___category) {
            category: field
            fieldValue
            nodes {
                id
            }
            }
        }
        }
     `);
    const categoryList = data.allMarkdownRemark.group.map((category) => {
        return {category: category.fieldValue, num: category.nodes.length}
        });

  return(
        <div>
        {categoryList.map(category => <CategoryItem item={category}/>)}
        </div>
    );
}
export default Categories


