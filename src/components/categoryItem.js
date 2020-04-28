import React, { useState, useEffect} from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import styled from "styled-components"


const CategoryItem = ({key, item, current ,setCurrent, location}) => {
  const linkto = '/category/' + item.category;
  const handleCurrent = () => {
    setCurrent(item.category);
  };

  return(
    <Link style={{textDecoration: `none`}} to={linkto} state={{current: item.category}}>
      <LinkItem hilight={current == item.category ? true : false}>{item.category} ({item.num}) </LinkItem>
    </Link>
    );
}
export default CategoryItem

const LinkItem = styled.span`
  color: ${props => props.hilight? '#ffffff' : '#868686'};
  margin-left: 5px;
  background-color: ${props => props.hilight? '#336B87' : null};
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
`
