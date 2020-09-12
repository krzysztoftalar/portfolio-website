const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, `src`), `node_modules`],
        },
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: 'slug',
            node,
            value,
        });
    }
};

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            allMdx(
                filter: { frontmatter: { category: { eq: "projects" } } }
                sort: { order: ASC, fields: frontmatter___year }
            ) {
                edges {
                    node {
                        slug
                        frontmatter {
                            title
                            subtitle
                            cover {
                                childImageSharp {
                                    fluid {
                                        originalImg
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const { createPage } = actions;
    const projectTemplate = path.resolve(`src/templates/project.tsx`);

    const projects = data.allMdx.edges;

    projects.forEach((project, index) => {
        const previousProject =
            index === 0
                ? projects[projects.length - 1].node
                : projects[index - 1].node;

        const nextProject =
            index === projects.length - 1
                ? projects[0].node
                : projects[index + 1].node;

        createPage({
            path: `${project.node.slug}`,
            component: projectTemplate,
            context: {
                slug: `${project.node.slug}`,
                previousProject,
                nextProject,
            },
        });
    });
};
