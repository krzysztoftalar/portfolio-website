module.exports = {
    siteMetadata: {
        title: `Front-end & Back-end Developer`,
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
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
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
                name: `content`,
                path: `${__dirname}/src/data`,
            },
        },
        `gatsby-plugin-typescript`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Montserrat:500,600,700,800,900'],
                },
            },
        },
    ],
};
