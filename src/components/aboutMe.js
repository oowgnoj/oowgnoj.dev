import React from 'react';
import styled from 'styled-components';
import Me from './../logo/me.png';

const AboutInpost = () => {
    const linkto = 'https://github.com/oowgnoj';
    return (
        <Warpper>
            <Img src={Me} />
            <About>
                {' '}
                반복의 느린 變化
                <LineBreak />
                <Nickname>
                    {' '}
                    oowgnoj{' '}
                    <Link href={linkto}>
                        <LinkItem> github </LinkItem>{' '}
                    </Link>
                </Nickname>
            </About>
        </Warpper>
    );
};

export default AboutInpost;
// 반복의 느린 變化

const Warpper = styled.footer`
    display: flex;
    margin-top: 100px;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 100px;
`;
const Img = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    margin: 0;
`;

const About = styled.div`
    padding-left: 20px;
    padding-top: 6px;
    width: 70%;
`;

const Nickname = styled.div`
    margin-top: 6px;
`;
const LineBreak = styled.div`
    width: 100%;
`;

const Link = styled.a`
    text-decoration: none;
`;
const LinkItem = styled.span`
    display: inline;
    color: grey;
    cursor: pointer;
`;
