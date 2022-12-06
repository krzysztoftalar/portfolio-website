import { motion } from 'framer-motion';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import { useStore } from '../../hooks/useStore';
import { Cursor } from '../../models/cursor';
import { IProject } from '../../models/project';
import { Flex } from '../../styles/base/globalStyles';
import { ease, sectionVariants } from '../../styles/base/globalVariants';
import {
    FeaturedButton,
    FeaturedImage,
    FeaturedProjectTitle,
    FeaturedSectionTitle,
    HomeFeaturedSection,
} from '../../styles/pages/homeStyles';
import SVG from '../ui/SVG';

const HomeFeatured = (): JSX.Element => {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(
                filter: {
                    frontmatter: {
                        category: { eq: "projects" }
                        featured: { eq: true }
                    }
                }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
                        year(formatString: "YYYY")
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

    const project: IProject = allMdx.nodes[0];
    const { title, subtitle, year, cover } = project.frontmatter;
    const projectCover = getImage(cover);

    const { ref, animation } = useSectionAnimation();

    const store = useStore();
    const { toggleOpen, setCursor } = store.uiStore;
    const [hovered, setHovered] = useState(false);

    return (
        <HomeFeaturedSection
            ref={ref}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <FeaturedSectionTitle>
                <Flex justifyBetween>
                    <h3>Featured Project</h3>
                    <motion.h4
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{
                            duration: 0.6,
                            ease: ease,
                        }}
                    >
                        {year.toString()}
                    </motion.h4>
                </Flex>
            </FeaturedSectionTitle>

            <Link to={project.fields.slug}>
                <motion.div
                    onMouseEnter={() => setCursor(Cursor.Hovered)}
                    onMouseLeave={() => setCursor()}
                    onHoverStart={() => setHovered(!hovered)}
                    onHoverEnd={() => setHovered(!hovered)}
                >
                    <FeaturedImage>
                        {projectCover && (
                            <GatsbyImage
                                image={projectCover}
                                alt="Project"
                                className="img-fluid"
                            />
                        )}
                    </FeaturedImage>

                    <FeaturedProjectTitle>
                        <h2 className="featured-title">
                            {title} <br /> {subtitle}
                            <motion.span
                                className="arrow"
                                animate={{ x: hovered ? 40 : 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: ease,
                                }}
                            >
                                <SVG icon="arrow-right" />
                            </motion.span>
                        </h2>
                    </FeaturedProjectTitle>
                </motion.div>
            </Link>

            <FeaturedButton>
                <button
                    onClick={() => toggleOpen()}
                    onMouseEnter={() => setCursor(Cursor.Pointer)}
                    onMouseLeave={() => setCursor()}
                >
                    <span>All Projects</span>
                </button>
            </FeaturedButton>
        </HomeFeaturedSection>
    );
};

export default HomeFeatured;
