module.exports = {
    siteMetadata: {
        title: `Full-Stack Developer`,
        description: `Krzysztof is a Full-Stack Developer based in Poland.`,
        author: `Krzysztof Talar`,
        url: 'https://www.sivonte.com',
        keywords: [
            `Developer`,
            `Front-end Development`,
            `Back-end Development`,
            `React`,
            `C#`,
            `.NET`,
            `Azure`,
            `Portfolio`,
        ],
    },
    plugins: [
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    quality: 100,
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
    ],
};
