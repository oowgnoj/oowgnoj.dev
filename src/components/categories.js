import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import CategoryItem from './categoryItem'
import styled from "styled-components"

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
        <CategoryList>
            <Link style={{textDecoration: `none`}} to={'/'}>
                <LinkItem> index </LinkItem>
            </Link>
            {categoryList.map(category => <CategoryItem item={category}/>)}
        </CategoryList>
    );
}
export default Categories

const CategoryList = styled.div`


`
const LinkItem = styled.span`
  color: #484848;
  cursor: pointer;
`