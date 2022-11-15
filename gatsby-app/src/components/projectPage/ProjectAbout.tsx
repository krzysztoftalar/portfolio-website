import React from 'react';
import { observer } from 'mobx-react';
import { MDXProvider } from '@mdx-js/react';
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
import { Cursor } from '../../models/cursor';

interface IProps {
    project: IProject;
    children: React.ReactNode;
}

const ProjectAbout: React.FC<IProps> = ({ project, children }): JSX.Element => {
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

                <MDXProvider>{children}</MDXProvider>

                <ProjectLinks>
                    <ProjectLink
                        href={repoLink}
                        disabled={repoLink === ''}
                        target="_blank"
                        rel="noreferrer noopener"
                        onMouseEnter={() => setCursor(Cursor.Hovered)}
                        onMouseLeave={() => setCursor()}
                    >
                        <SVG icon="embed" />
                        Source Code
                    </ProjectLink>

                    {liveLink && (
                        <ProjectLink
                            href={liveLink}
                            disabled={liveLink === ''}
                            target="_blank"
                            rel="noreferrer noopener"
                            onMouseEnter={() => setCursor(Cursor.Hovered)}
                            onMouseLeave={() => setCursor()}
                        >
                            <SVG icon="link" />
                            Live
                        </ProjectLink>
                    )}
                </ProjectLinks>
            </About>
        </ProjectAboutSection>
    );
};

export default observer(ProjectAbout);
