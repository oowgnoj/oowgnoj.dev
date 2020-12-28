import React from 'react';
import styled from 'styled-components';
import Layout from '../layout';
import SEO from '../layout/seo';
import Myro from '../../images/projects/myro.png';
import Travelcalculator from '../../images/projects/travelcalculator.png';
import Booktogether from '../../images/projects/booktogether.png';

const PROJECTS = [
    {
        name: 'Myro',
        image: Myro,
        description: '목표를 이룬 사람들의 다양한 습관을 소개합니다. 알림과 습관 tracking 기능을 지원합니다.',
        link: 'https://www.notion.so/oowgonj/MYRO-b7fa1126cc3241fab699db93de66c9ae',
    },
    {
        name: 'Travel Calculator',
        image: Travelcalculator,
        description:
            "'7박 8일 일정으로 런던 다녀오려면 총 얼마정도 들지?'에 대한 신속한 정보를 제공하는 웹 서비스 입니다.",
        link: 'https://www.notion.so/oowgonj/229c32de2c7f4dc7b8249ea8f308b382',
    },
    {
        name: '서로모임',
        image: Booktogether,
        description: '서평 / 큐레이션 작성 및 공유하는 커뮤니티 사이트 입니다.',
        link: 'https://www.notion.so/oowgonj/229c32de2c7f4dc7b8249ea8f308b382',
    },
];

export default () => {
    return (
        <Layout>
            <SEO title="project" />
            <Contents>
                {PROJECTS.map((el, i) => (
                    <a href={el.link} key={i} target="_blank">
                        <ProjectImage src={el.image}></ProjectImage>
                        <ProjectName>{el.name}</ProjectName>
                        <ProjectDescription>{' ' + el.description}</ProjectDescription>
                    </a>
                ))}
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

const ProjectImage = styled.img`
    display: block;
    margin-bottom: 10px;
    max-height: 270px;
`;

const ProjectName = styled.span`
    font-weight: 700;
`;

const ProjectDescription = styled.span``;
