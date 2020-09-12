import React, { useState } from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { observer } from 'mobx-react';
// Imports from src
import { IProject } from '../../models/project';
import {
    NextProject,
    PrevProject,
    ProjectImage,
    ProjectNavItem,
    ProjectNavSection,
} from '../../styles/pages/projectStyles';
import SVG from '../ui/SVG';
import { useStore } from '../../hooks/useStore';

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

    const store = useStore();
    const { setCursor } = store.uiStore;

    return (
        <ProjectNavSection
            onMouseEnter={() => setCursor('nav-open')}
            onMouseLeave={() => setCursor()}
        >
            <PrevProject prev>
                <ProjectNavItem
                    prev
                    onHoverStart={() =>
                        setProject({
                            show: true,
                            key: previousProject.slug,
                        })
                    }
                    onHoverEnd={() =>
                        setProject({
                            show: false,
                            key: previousProject.slug,
                        })
                    }
                    onMouseEnter={() => setCursor('pointer')}
                    onMouseLeave={() => setCursor('nav-open')}
                >
                    <Link to={`/${previousProject.slug}`}>
                        <h3 className="project-title">
                            {previousProject.frontmatter.title} <br />
                            {previousProject.frontmatter.subtitle}
                            <SVG icon="arrow-left" />
                        </h3>
                    </Link>
                </ProjectNavItem>

                <ProjectImage
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity:
                            project.show && project.key === previousProject.slug
                                ? 1
                                : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                >
                    <Image
                        fluid={
                            previousProject.frontmatter.cover.childImageSharp
                                .fluid
                        }
                        alt="Project"
                        className="img-fluid"
                    />
                </ProjectImage>
            </PrevProject>

            <NextProject>
                <ProjectNavItem
                    onHoverStart={() =>
                        setProject({
                            show: true,
                            key: nextProject.slug,
                        })
                    }
                    onHoverEnd={() =>
                        setProject({
                            show: false,
                            key: nextProject.slug,
                        })
                    }
                    onMouseEnter={() => setCursor('pointer')}
                    onMouseLeave={() => setCursor('nav-open')}
                >
                    <Link to={`/${nextProject.slug}`}>
                        <h3 className="project-title">
                            {nextProject.frontmatter.title} <br />
                            {nextProject.frontmatter.subtitle}
                            <SVG icon="arrow-right" />
                        </h3>
                    </Link>
                </ProjectNavItem>

                <ProjectImage
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity:
                            project.show && project.key === nextProject.slug
                                ? 1
                                : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                >
                    {/*<Image*/}
                    {/*    fluid={*/}
                    {/*        nextProject.frontmatter.cover.childImageSharp.fluid*/}
                    {/*    }*/}
                    {/*    alt="Project"*/}
                    {/*    className="img-fluid"*/}
                    {/*/>*/}
                    <img
                        className="img-fluid"
                        src={
                            nextProject.frontmatter.cover.childImageSharp.fluid
                                .originalImg
                        }
                        alt=""
                    />
                </ProjectImage>
            </NextProject>
        </ProjectNavSection>
    );
};

export default observer(ProjectNav);
