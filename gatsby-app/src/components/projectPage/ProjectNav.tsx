import React, { useState } from 'react';
import { Link } from 'gatsby';
import { observer } from 'mobx-react';
// Imports from src
import { IProject } from '../../models/project';
import {
    NextProject,
    PrevProject,
    ProjectImage,
    ProjectNavSection,
    ProjectTitle,
} from '../../styles/pages/projectStyles';
import SVG from '../ui/SVG';
import { useStore } from '../../hooks/useStore';
import useWindowSize from '../../hooks/useWindowSize';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import { Cursor } from '../../models/cursor';
import { ease } from '../../styles/base/globalVariants';
import { getImage } from 'gatsby-plugin-image';

interface IProps {
    previousProject: IProject;
    nextProject: IProject;
}

const ProjectNav: React.FC<IProps> = ({
    previousProject,
    nextProject,
}: IProps): JSX.Element => {
    const [project, setProject] = useState({
        show: false,
        key: '',
    });

    const previousProjectCover = getImage(previousProject.frontmatter.cover);
    const nextProjectCover = getImage(nextProject.frontmatter.cover);

    const store = useStore();
    const { setCursor } = store.uiStore;

    const { width } = useWindowSize();

    const { ref, animation } = useSectionAnimation(undefined, '0px');

    return (
        <ProjectNavSection
            onMouseEnter={() => setCursor(Cursor.NavOpen)}
            onMouseLeave={() => setCursor()}
        >
            <PrevProject
                prev
                ref={ref}
                initial="initial"
                animate={animation}
                variants={prevProjectVariants}
            >
                <Link
                    to={`/${previousProject.fields.slug}`}
                    className="project-link"
                >
                    <ProjectTitle
                        prev
                        onHoverStart={() =>
                            setProject({
                                show: true,
                                key: previousProject.fields.slug,
                            })
                        }
                        onHoverEnd={() =>
                            setProject({
                                show: false,
                                key: previousProject.fields.slug,
                            })
                        }
                        onMouseEnter={() => setCursor(Cursor.Pointer)}
                        onMouseLeave={() => setCursor(Cursor.NavOpen)}
                    >
                        <h3 className="project-title">
                            {previousProject.frontmatter.title} <br />
                            {previousProject.frontmatter.subtitle}
                            <SVG icon="arrow-left" />
                        </h3>
                    </ProjectTitle>

                    <ProjectImage
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity:
                                width < 1200
                                    ? 1
                                    : project.show &&
                                      project.key ===
                                          previousProject.fields.slug
                                    ? 1
                                    : 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                    >
                        <img
                            className="img-fluid"
                            src={previousProjectCover}
                            alt=""
                        />
                    </ProjectImage>
                </Link>
            </PrevProject>

            <NextProject
                ref={ref}
                initial="initial"
                animate={animation}
                variants={nextProjectVariants}
            >
                <Link
                    to={`/${nextProject.fields.slug}`}
                    className="project-link"
                >
                    <ProjectTitle
                        onHoverStart={() =>
                            setProject({
                                show: true,
                                key: nextProject.fields.slug,
                            })
                        }
                        onHoverEnd={() =>
                            setProject({
                                show: false,
                                key: nextProject.fields.slug,
                            })
                        }
                        onMouseEnter={() => setCursor(Cursor.Pointer)}
                        onMouseLeave={() => setCursor(Cursor.NavOpen)}
                    >
                        <h3 className="project-title">
                            {nextProject.frontmatter.title} <br />
                            {nextProject.frontmatter.subtitle}
                            <SVG icon="arrow-right" />
                        </h3>
                    </ProjectTitle>

                    <ProjectImage
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity:
                                width < 1200
                                    ? 1
                                    : project.show &&
                                      project.key === nextProject.fields.slug
                                    ? 1
                                    : 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                    >
                        <img
                            className="img-fluid"
                            src={nextProjectCover}
                            alt=""
                        />
                    </ProjectImage>
                </Link>
            </NextProject>
        </ProjectNavSection>
    );
};

export default observer(ProjectNav);

const prevProjectVariants = {
    initial: {
        opacity: 0,
        x: '70px',
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: ease,
        },
    },
};

const nextProjectVariants = {
    initial: {
        opacity: 0,
        x: '-70px',
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: ease,
        },
    },
};
