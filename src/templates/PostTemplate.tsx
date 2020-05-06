import React from 'react';
import Layout from '../components/layout';
import AboutMe from '../components/aboutInPost'

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { title, date, html } = props.pageContext;
  return (
    <Layout>
      <h2>{title}</h2>
      <h4>{date}</h4>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <AboutMe />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;