import React, {Fragment} from "react"
import { useStaticQuery, Link } from "gatsby"
import { Query } from '../../graphql-types';
import styled from "styled-components"
import Me from "./../images/me.png"


const AboutInpost = ({item}) => {
  const linkto = 'https://github.com/oowgnoj';
  return(
    <Fragment>
        <hr />
        <img src={Me} style={{ borderRadius:'50%', width:'80px', height: '80px', display:'inline'}}/><span> 박종우 </span>
        <a style={{textDecoration: `none`}} href={linkto}>
          <LinkItem> github </LinkItem>
        </a>
    </Fragment>
    );
}

export default AboutInpost

const LinkItem = styled.span`
  color: grey;
  margin-left: 5px;
  cursor: pointer;
`
