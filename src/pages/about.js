import React from 'react';
import styled from 'styled-components';
import Layout from '../layout';
import SEO from '../layout/seo';
import Me from '../../images/me-black.jpg';

export default () => {
    return (
        <Layout>
            <SEO title="about" />
            <ProfileImage src={Me} />
            <Contents>
                안녕하세요. 박종우 입니다.
                <p>
                    데이터 분석으로 처음 프로그래밍을 시작했습니다. 2020 년에는{' '}
                    <a href="http://www.atommerce.com/">아토머스</a>에서 프론트엔드를 개발했습니다. 생각을 실체로 구현할
                    수 있어 프로그래밍을 좋아합니다. 웹을 처음 배우며 주머니 사정에 맞추어 여행지를 알아보고자{' '}
                    <a
                        href="https://www.notion.so/oowgonj/Travel-Calculator-28ccc8f49ad241cda94894985d2a23cf"
                        target="_blank"
                    >
                        여행 계산기
                    </a>
                    를 만들었습니다. 그 밖에,{' '}
                    <a href="https://www.notion.so/oowgonj/229c32de2c7f4dc7b8249ea8f308b382" target="_blank">
                        책
                    </a>
                    {', '}
                    <a href="https://www.notion.so/oowgonj/MYRO-b7fa1126cc3241fab699db93de66c9ae" target="_blank">
                        습관
                    </a>{' '}
                    등 관심있는 것을 재미있게 개발하고 있습니다.
                </p>
                <br />
                <h4>contact</h4>
                <p>Email: jongwoopark423@gmail.com</p>
            </Contents>
        </Layout>
    );
};

const Contents = styled.div``;
const ProfileImage = styled.img`
    display: block;
    margin: 0px auto;
`;
