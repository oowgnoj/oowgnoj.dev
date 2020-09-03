import React from 'react';
import Layout from './layout';
import AboutMe from '../components/aboutMe';
import SEO from './seo';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

const PostTemplate: React.FC = React.memo(props => {
    const { title, date, html } = props.pageContext;
    let disqusConfig = {
        identifier: title,
        title: title,
    };

    return (
        <Layout>
            <SEO title={title} />
            <h2>{title}</h2>
            <h4>{date}</h4>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <AboutMe />
            <Disqus config={disqusConfig} />
        </Layout>
    );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
