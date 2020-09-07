import React, { useEffect, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
// Imports from src
import {
    FeaturedButton,
    FeaturedProjectTitle,
    FeaturedImage,
    FeaturedSectionTitle,
    HomeFeaturedSection,
    HomeContentSection,
} from '../../styles/homeStyles';
import { ImageSharpFluid } from '../Navigation';
import { Flex } from '../../styles/globalStyles';
import SVG from '../ui/SVG';
import { useStore } from '../../hooks/useStore';

interface Project {
    node: {
        frontmatter: {
            title: string;
            subtitle: string;
            year: string;
            cover: {
                childImageSharp: {
                    fluid: ImageSharpFluid;
                };
            };
        };
    };
}

const HomeFeatured = (): JSX.Element => {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(filter: { frontmatter: { featured: { eq: true } } }) {
                edges {
                    node {
                        frontmatter {
                            title
                            subtitle
                            year
                            cover {
                                childImageSharp {
                                    fluid(maxWidth: 2000, quality: 85) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const project: Project = allMdx.edges[0];
    const { title, subtitle, year, cover } = project.node.frontmatter;

    const animation = useAnimation();
    const [featuredRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-300px',
    });

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        }
    }, [animation, inView]);

    const store = useStore();
    const { toggleOpen, setCursor } = store.uiStore;
    const [hovered, setHovered] = useState(false);

    return (
        <HomeFeaturedSection
            ref={featuredRef}
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
                            ease: [0.6, 0.05, -0.01, 0.9],
                        }}
                    >
                        {year}
                    </motion.h4>
                </Flex>
            </FeaturedSectionTitle>

            <Link to="/">
                <motion.div
                    onMouseEnter={() => setCursor('hovered')}
                    onMouseLeave={() => setCursor()}
                    onHoverStart={() => setHovered(!hovered)}
                    onHoverEnd={() => setHovered(!hovered)}
                >
                    <FeaturedImage>
                        <Image
                            fluid={cover.childImageSharp.fluid}
                            alt="Project"
                            className="img-fluid"
                        />
                    </FeaturedImage>

                    <FeaturedProjectTitle>
                        <span className="featured-title">
                            {title} <br /> {subtitle}
                            <motion.span
                                className="arrow"
                                animate={{ x: hovered ? 40 : 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.6, 0.05, -0.01, 0.9],
                                }}
                            >
                                <SVG icon="arrow-right" />
                            </motion.span>
                        </span>
                    </FeaturedProjectTitle>
                </motion.div>
            </Link>

            <FeaturedButton>
                <button
                    onClick={() => toggleOpen()}
                    onMouseEnter={() => setCursor('pointer')}
                    onMouseLeave={() => setCursor()}
                >
                    <span>All Projects</span>
                </button>
            </FeaturedButton>
        </HomeFeaturedSection>
    );
};

export default HomeFeatured;

const sectionVariants = {
    initial: {
        y: '7rem',
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};
