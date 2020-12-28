import React from 'react';
import Layout from '../layout';
import SEO from '../layout/seo';
import About from '../components/about';
import { Disqus } from 'gatsby-plugin-disqus';

const PostTemplate = React.memo(props => {
    const { title, date, html } = props.pageContext;
    const disqusConfig = {
        identifier: title,
        title: title,
    };

    return (
        <Layout>
            <SEO title={title} />
            <h1>{title}</h1>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <About date={date} />
            <Disqus config={disqusConfig} />
        </Layout>
    );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
