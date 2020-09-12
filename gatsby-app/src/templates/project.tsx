import React from 'react';
import { graphql } from 'gatsby';
// Imports from src
import ProjectSlider from '../components/projectPage/ProjectSlider';
import ProjectAbout from '../components/projectPage/ProjectAbout';
import ProjectNav from '../components/projectPage/ProjectNav';
import { IProject } from '../models/project';

interface IProps {
    data: {
        mdx: IProject;
    };
    pageContext: {
        slug: string;
        previousProject: IProject;
        nextProject: IProject;
    };
}

const Project: React.FC<IProps> = ({
    data,
    pageContext,
}: IProps): JSX.Element => {
    const project = data.mdx;
    const { previousProject, nextProject } = pageContext;

    return (
        <>
            <ProjectSlider images={project.frontmatter.images} />
            <ProjectAbout project={project} />
            <ProjectNav
                previousProject={previousProject}
                nextProject={nextProject}
            />
        </>
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
                images {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 85) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
