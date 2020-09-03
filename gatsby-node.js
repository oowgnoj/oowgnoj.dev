const path = require(`path`);

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);

    const res = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html
                        frontmatter {
                            path
                            title
                        }
                    }
                }
            }
            allPostByCategory: allMarkdownRemark(
                sort: { order: DESC, fields: frontmatter___date }
                filter: { frontmatter: {} }
            ) {
                group(field: frontmatter___category) {
                    category: fieldValue
                    nodes {
                        frontmatter {
                            title
                            subtitle
                            category
                            author
                            date(formatString: "YYYY-MM-DD")
                            tags
                        }
                        excerpt(truncate: true, pruneLength: 150)
                        id
                    }
                }
            }
        }
    `);

    if (res.errors) {
        throw res.errors;
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { path, title } = node.frontmatter;
        createPage({
            path: path,
            context: {
                html: node.html,
                title: title,
            },
            component: blogPostTemplate,
        });
    });
};
