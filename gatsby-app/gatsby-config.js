require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: `Full-Stack .NET Developer | Azure Cloud & DevOps Engineer`,
        description: `Krzysztof is a Full-Stack Developer based in Poland.`,
        author: `Krzysztof Talar`,
        url: 'https://www.sivonte.com',
        keywords: [
            `Software Engineer`,
            `Software Developer`,
            `Frontend Development`,
            `Backend Development`,
            `React`,
            `C#`,
            `.NET`,
            `Azure`,
            `Portfolio`,
            `DevOps`,
        ],
    },
    plugins: [
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    quality: 100,
                    placeholder: `blurred`,
                },
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-image',
        'gatsby-plugin-mdx',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `svg`,
                path: `${__dirname}/src/assets/svg`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `videos`,
                path: `${__dirname}/src/assets/videos`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        `gatsby-plugin-typescript`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-postcss`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Montserrat:500,600,700,800,900&display=swap'],
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`],
                pluginConfig: {
                    head: true, // Puts tracking script in the head instead of the body
                },
            },
        },
    ],
};
