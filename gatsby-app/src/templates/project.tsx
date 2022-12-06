import { graphql } from 'gatsby';
import React from 'react';

import PageLayout from '../components/layout/PageLayout';
import ProjectAbout from '../components/projectPage/ProjectAbout';
import ProjectNav from '../components/projectPage/ProjectNav';
import ProjectSlider from '../components/projectPage/ProjectSlider';
import SEO from '../components/ui/SEO';
import { IProject } from '../models/project';

interface IProps {
    data: {
        mdx: IProject;
    };
    children: React.ReactNode;
    pageContext: {
        slug: string;
        previousProject: IProject;
        nextProject: IProject;
    };
    location: Location;
}

const Project: React.FC<IProps> = ({
    data,
    children,
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
            <ProjectAbout project={project}>{children}</ProjectAbout>
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
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                title
                subtitle
                repoLink
                liveLink
                metaDescription
                images {
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
`;
