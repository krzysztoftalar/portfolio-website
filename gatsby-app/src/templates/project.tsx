import React from 'react';
import { graphql } from 'gatsby';
// Imports from src
import ProjectSlider from '../components/projectPage/ProjectSlider';
import ProjectAbout from '../components/projectPage/ProjectAbout';
import ProjectNav from '../components/projectPage/ProjectNav';
import { IProject } from '../models/project';
import PageLayout from '../components/layout/PageLayout';
import SEO from '../components/ui/SEO';

interface IProps {
    data: {
        mdx: IProject;
    };
    pageContext: {
        slug: string;
        previousProject: IProject;
        nextProject: IProject;
    };
    location: Location;
}

const Project: React.FC<IProps> = ({
    data,
    pageContext,
    location,
}: IProps): JSX.Element => {
    const project = data.mdx;
    const { previousProject, nextProject } = pageContext;

    return (
        <PageLayout>
            <SEO
                title={`${project.frontmatter.title} ${project.frontmatter.subtitle}`}
                pathname={location.pathname}
                description={project.frontmatter.metaDescription}
            />
            <ProjectSlider images={project.frontmatter.images} />
            <ProjectAbout project={project} />
            <ProjectNav
                previousProject={previousProject}
                nextProject={nextProject}
            />
        </PageLayout>
    );
};

export default Project;

export const query = graphql`
    query ProjectBySlug($slug: String!) {
        mdx(slug: { eq: $slug }) {
            body
            frontmatter {
                title
                subtitle
                repoLink
                liveLink
                metaDescription
                images {
                    childImageSharp {
                        fluid(maxWidth: 1400, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
