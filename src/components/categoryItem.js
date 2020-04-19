import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import styled from "styled-components"


const CategoryItem = ({item}) => {
  console.log(item);
  const linkto = '/category/' + item.category
  return(
          <Link style={{textDecoration: `none`}}to={linkto}><LinkItem> {item.category} {item.num} </LinkItem></Link>

    );
}
export default CategoryItem

const LinkItem = styled.span`
  color: tomato;
  cursor: pointer;
`
