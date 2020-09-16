module.exports = {
    siteMetadata: {
        title: `Front-end & Back-end Developer`,
        description: ``,
        author: `Krzysztof Talar`,
        url: 'https://viphon.com',
        keywords: [
            `front-end`,
            `back-end`,
            `web developer`,
            `C# developer`,
            `React developer`,
            `portfolio`,
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
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [`montserrat\:400,500,600,700,800,900`],
                display: 'swap',
            },
        },
    ],
};
