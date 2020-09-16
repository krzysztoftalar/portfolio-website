import React from 'react';
import { observer } from 'mobx-react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// Imports from src
import {
    About,
    ProjectAboutSection,
    ProjectLink,
    ProjectLinks,
} from '../../styles/pages/projectStyles';
import SVG from '../ui/SVG';
import { useStore } from '../../hooks/useStore';
import { sectionVariants } from '../../styles/base/globalVariants';
import { IProject } from '../../models/project';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';

interface IProps {
    project: IProject;
}

const ProjectAbout: React.FC<IProps> = ({ project }): JSX.Element => {
    const { title, subtitle, repoLink, liveLink } = project.frontmatter;

    const store = useStore();
    const { setCursor } = store.uiStore;

    const { ref, animation } = useSectionAnimation();

    return (
        <ProjectAboutSection
            ref={ref}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <About>
                <h2 className="project-title">
                    {title} <br /> {subtitle}
                </h2>

                <MDXRenderer>{project.body}</MDXRenderer>

                <ProjectLinks
                    onMouseEnter={() => setCursor('hovered')}
                    onMouseLeave={() => setCursor()}
                >
                    <ProjectLink
                        href={repoLink}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <SVG icon="embed" />
                        Source Code
                    </ProjectLink>

                    <ProjectLink
                        href={liveLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        download
                    >
                        <SVG icon="link" />
                        Live
                    </ProjectLink>
                </ProjectLinks>
            </About>
        </ProjectAboutSection>
    );
};

export default observer(ProjectAbout);
