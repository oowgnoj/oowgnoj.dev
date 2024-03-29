module.exports = {
    siteMetadata: {
        title: '@oowgnoj',
        description: '기억하기 위해 기록합니다.',
        author: `@oowgnoj`,
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/style/font/typography.js',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/posts`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/images`,
            },
        },

        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'fonts',
                path: `${__dirname}/src/style/font`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-plugin-graphql-codegen`,
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `oowgnoj-dev`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'images',
                path: `${__dirname}/images`,
            },
        },
        {
            resolve: 'gatsby-background-image',
            options: {
                // add your own characters to escape, replacing the default ':/'
                specialChars: '/:',
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-120228926-2',
            },
        },

        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-highlight-code`,
                        options: {
                            terminal: 'carbon',
                            theme: 'nord',
                        },
                    },
                    'gatsby-remark-static-images',
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1000,
                        },
                    },
                    {
                        resolve: `gatsby-remark-figure-caption`,
                        options: { figureClassName: 'md-figure' },
                    },
                ],
            },
        },

        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `minimal-ui`,
                icon: `images/logo/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
