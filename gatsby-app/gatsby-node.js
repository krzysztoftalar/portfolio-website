const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, `src`), `node_modules`],
        },
    });
};

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode });
        createNodeField({
            node,
            name: 'slug',
            value: value,
        });
    }
};

exports.createPages = async ({
    actions: { createPage },
    graphql,
    reporter,
}) => {
    const result = await graphql(`
        query {
            allMdx(
                filter: { frontmatter: { category: { eq: "projects" } } }
                sort: { frontmatter: { year: ASC } }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    internal {
                        contentFilePath
                    }
                    frontmatter {
                        title
                        subtitle
                        cover {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    placeholder: BLURRED
                                )
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
    }

    const projectTemplate = path.resolve(`src/templates/project.tsx`);

    const projects = result.data.allMdx.nodes;

    projects.forEach((project, index) => {
        const previousProject =
            index === 0 ? projects[projects.length - 1] : projects[index - 1];

        const nextProject =
            index === projects.length - 1 ? projects[0] : projects[index + 1];

        createPage({
            path: `${project.fields.slug}`,
            component: `${projectTemplate}?__contentFilePath=${project.internal.contentFilePath}`,
            context: {
                slug: `${project.fields.slug}`,
                previousProject,
                nextProject,
            },
        });
    });
};
