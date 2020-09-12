import React, { useEffect } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { observer } from 'mobx-react';
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

interface IProps {
    project: IProject;
}

const ProjectAbout: React.FC<IProps> = ({ project }): JSX.Element => {
    const { title, subtitle, repoLink, liveLink } = project.frontmatter;

    const store = useStore();
    const { setCursor } = store.uiStore;

    const animation = useAnimation();
    const [aboutRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-300px',
    });

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        }
    }, [animation, inView]);

    return (
        <ProjectAboutSection
            ref={aboutRef}
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
