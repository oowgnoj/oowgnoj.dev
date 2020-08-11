import { CreatePagesArgs } from 'gatsby';
import path from 'path';

export async function createPages({ actions, graphql }) {
    const { createPage } = actions;

    const res = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html
                        frontmatter {
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
        createPage({
            path: node.frontmatter.title,
            context: {
                html: node.html,
                title: node.frontmatter.title,
            },
            component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
        });
    });

    res.data.allPostByCategory.group.forEach(({ category, nodes }) => {
        const pagePath = `/category/${category}`;
        createPage({
            path: pagePath,
            context: {
                pagePath: pagePath,
                category: category,
                nodes: nodes,
            },
            component: path.resolve(__dirname, '../templates/PostListTemplate.js'),
        });
    });
}
