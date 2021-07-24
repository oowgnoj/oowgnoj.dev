import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image"

import Layout from '../layout';
import SEO from '../layout/seo';


const Myro =  {
    name: 'Myro',
    description: '목표를 이룬 사람들의 다양한 습관을 소개합니다. 알림과 습관 tracking 기능을 지원합니다.',
    link: 'https://www.notion.so/oowgonj/MYRO-b7fa1126cc3241fab699db93de66c9ae',
}

const TravelCalculator =  {
    name: 'Travel Calculator',
    description:
        "'7박 8일 일정으로 런던 다녀오려면 총 얼마정도 들지?'에 대한 신속한 정보를 제공하는 웹 서비스 입니다.",
    link: 'https://www.notion.so/oowgonj/229c32de2c7f4dc7b8249ea8f308b382',
}

const BookTogether = 
{
    name: '서로모임',
    description: '서평 / 큐레이션 작성 및 공유하는 커뮤니티 사이트 입니다.',
    link: 'https://www.notion.so/oowgonj/229c32de2c7f4dc7b8249ea8f308b382',
}

export default ({data}) => {

    return (
        <Layout>
            <SEO title="project" />
            <Contents>
                <div>
                <a href={Myro.link} target="_blank">
                    <div style={{ maxHeight: "100%", height: "270px", display: 'block'}}>
                        <Img style={{ maxHeight: "100%" }} imgStyle={{objectFit:"contain"}} fluid={data.myro_image.childImageSharp.fluid}></Img>
                    </div>
                    <ProjectName>{Myro.name}</ProjectName>
                    <ProjectDescription>{' ' + Myro.description}</ProjectDescription>
                </a>
                </div>
                <div>
                    <a href={TravelCalculator.link} target="_blank">
                    <div style={{ maxHeight: "100%", height: "270px", display: 'block'}}>
                        <Img style={{ maxHeight: "100%" }} imgStyle={{objectFit:"contain"}} fluid={data.travel_image.childImageSharp.fluid}></Img>
                    </div>
                        <ProjectName>{TravelCalculator.name}</ProjectName>
                        <ProjectDescription>{' ' + TravelCalculator.description}</ProjectDescription>
                    </a>

                </div>
                <div>
                    <a href={BookTogether.link} target="_blank">
                    <div style={{ maxHeight: "270px", display: 'block'}}>
                        <Img style={{ maxHeight: "100%" }} imgStyle={{objectFit:"contain"}} fluid={data.bt_image.childImageSharp.fluid}></Img>
                    </div>
                        <ProjectName>{BookTogether.name}</ProjectName>
                        <ProjectDescription>{' ' + BookTogether.description}</ProjectDescription>
                    </a>
                </div>

            </Contents>
        </Layout>
    );
};


const Contents = styled.main`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    @media (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 0;
    }
`;



const ProjectName = styled.div`
    font-weight: 700;
`;

const ProjectDescription = styled.div``;



export const query = graphql`
  query MyQuery {
    myro_image: file(relativePath: { eq: "projects/myro.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bt_image: file(relativePath: { eq: "projects/booktogether.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    },
    travel_image: file(relativePath: { eq: "projects/travelcalculator.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
