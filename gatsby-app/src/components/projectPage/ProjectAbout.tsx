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
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { useTrackEvent } from '../../hooks/useTrackEvent';

interface IProps {
    project: IProject;
    children: React.ReactNode;
}

const ProjectAbout: React.FC<IProps> = ({ project, children }): JSX.Element => {
    const { title, subtitle, repoLink, liveLink } = project.frontmatter;

    const store = useStore();
    const { setCursor } = store.uiStore;

    const { ref, animation } = useSectionAnimation();

    const fullProjectName = `${title} ${subtitle}`;

    // Track project repository link click
    const trackGithub = useTrackEvent('GitHub Click', {
        project: fullProjectName,
        repoLink: repoLink,
    });
    const handleRepoLink = () => {
        trackGithub({ project: fullProjectName, repoLink: repoLink });
    };

    // Track project live link click
    const trackLiveProject = useTrackEvent('Live Project Click', {
        project: fullProjectName,
        liveLink: liveLink,
    });
    const handleLiveLink = () => {
        trackLiveProject({ project: fullProjectName, liveLink: liveLink });
    };

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
                    <ProjectLink disabled={repoLink === ''}>
                        <OutboundLink
                            href={repoLink}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={() => handleRepoLink()}
                            onMouseEnter={() => setCursor(Cursor.Hovered)}
                            onMouseLeave={() => setCursor()}
                        >
                            <SVG icon="embed" />
                            Source Code
                        </OutboundLink>
                    </ProjectLink>

                    {liveLink && (
                        <ProjectLink disabled={liveLink === ''}>
                            <OutboundLink
                                href={liveLink}
                                target="_blank"
                                rel="noreferrer noopener"
                                onClick={() => handleLiveLink()}
                                onMouseEnter={() => setCursor(Cursor.Hovered)}
                                onMouseLeave={() => setCursor()}
                            >
                                <SVG icon="link" />
                                Live
                            </OutboundLink>
                        </ProjectLink>
                    )}
                </ProjectLinks>
            </About>
        </ProjectAboutSection>
    );
};

export default observer(ProjectAbout);
