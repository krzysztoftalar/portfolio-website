import React, { useRef, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { observer } from 'mobx-react';
import { AnimatePresence, motion } from 'framer-motion';
// Imports from src
import { Flex } from '../../styles/base/globalStyles';
import {
    CloseNav,
    Nav,
    NavHeader,
    NavImages,
    NavList,
} from '../../styles/layout/navigationStyles';
import { useStore } from '../../hooks/useStore';
import { useElementPosition } from '../../hooks/useElementPosition';
import SVG from '../ui/SVG';
import SocialLinks from '../ui/SocialLinks';
import {
    FooterCopyrights,
    FooterEmail,
    FooterSocial,
    NavFooterWrapper,
} from '../../styles/layout/footerStyles';
import { IProject } from '../../models/project';
import { Helmet } from 'react-helmet';
import { Cursor } from '../../models/cursor';

interface Project {
    node: IProject;
}

const Navigation = (): JSX.Element => {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(
                filter: { frontmatter: { category: { eq: "projects" } } }
                sort: { order: ASC, fields: frontmatter___year }
            ) {
                edges {
                    node {
                        id
                        slug
                        frontmatter {
                            title
                            subtitle
                            cover {
                                childImageSharp {
                                    fluid(maxWidth: 1400, quality: 100) {
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

    const [project, setProject] = useState({
        show: false,
        key: 0,
    });
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);

    const projects: Project[] = allMdx.edges;
    const { cover } = projects[project.key].node.frontmatter;

    const store = useStore();
    const { toggleOpen, open, setCursor, setElementPosition } = store.uiStore;

    // Cursor locked on hamburger btn hover
    const menuRef = useRef<HTMLButtonElement>(null);
    const menuPosition = useElementPosition(menuRef, isAnimationEnd);
    const onMenuHover = () => {
        if (isAnimationEnd) {
            setCursor(Cursor.Locked);
            setElementPosition(menuPosition.x, menuPosition.y);
        }
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <Nav
                        initial="initial"
                        animate={open ? 'animate' : 'initial'}
                        exit="exit"
                        variants={navVariants}
                        onAnimationStart={() => setIsAnimationEnd(false)}
                        onAnimationComplete={() => setIsAnimationEnd(true)}
                    >
                        <NavHeader>
                            <Flex justifyBetween noHeight>
                                <h2>Projects</h2>
                                <CloseNav>
                                    <button
                                        onMouseEnter={onMenuHover}
                                        onClick={() => toggleOpen()}
                                        onMouseLeave={() => setCursor()}
                                        ref={menuRef}
                                    />
                                    <span>Close</span>
                                </CloseNav>
                            </Flex>
                        </NavHeader>

                        <NavList>
                            <ul>
                                {projects.map((item, index) => {
                                    const {
                                        id,
                                        slug,
                                        frontmatter: { title, subtitle },
                                    } = item.node;

                                    return (
                                        <motion.li
                                            key={id}
                                            onHoverStart={() =>
                                                setProject({
                                                    show: true,
                                                    key: index,
                                                })
                                            }
                                            onHoverEnd={() =>
                                                setProject({
                                                    show: false,
                                                    key: index,
                                                })
                                            }
                                            onMouseEnter={() =>
                                                setCursor(Cursor.Pointer)
                                            }
                                            onMouseLeave={() => setCursor()}
                                            variants={linkItemVariants}
                                        >
                                            <Link
                                                to={`/${slug}`}
                                                onClick={() => toggleOpen()}
                                            >
                                                <motion.div
                                                    whileHover="whileHover"
                                                    variants={arrowVariants}
                                                    className="link"
                                                >
                                                    <span className="arrow">
                                                        <SVG icon="arrow-right" />
                                                    </span>

                                                    <h2>
                                                        {title} {subtitle}
                                                    </h2>
                                                </motion.div>
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </NavList>

                        <NavImages>
                            <motion.div
                                animate={{
                                    width: project.show ? 0 : '100%',
                                    transition: {
                                        ease: [0.6, 0.05, -0.01, 0.9],
                                    },
                                }}
                                className="reveal"
                            />

                            <AnimatePresence initial={false} exitBeforeEnter>
                                <motion.div
                                    className="img"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: 'easeInOut',
                                    }}
                                    exit={{ opacity: 0 }}
                                    key={project.key}
                                >
                                    <Image
                                        fluid={cover.childImageSharp.fluid}
                                        alt="Project"
                                        className="img-fluid"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </NavImages>

                        <NavFooterWrapper>
                            <FooterEmail navOpen={open}>
                                <a
                                    href="mailto:krzysztofTalar@protonmail.com"
                                    onMouseEnter={() =>
                                        setCursor(Cursor.Pointer)
                                    }
                                    onMouseLeave={() => setCursor()}
                                >
                                    krzysztofTalar@protonmail.com
                                </a>
                            </FooterEmail>

                            <FooterCopyrights>
                                <p>&copy; Viphon 2020</p>
                            </FooterCopyrights>

                            <FooterSocial navOpen={open}>
                                <SocialLinks isAnimationEnd={isAnimationEnd} />
                            </FooterSocial>
                        </NavFooterWrapper>

                        <Helmet>
                            <body className="overflow-hidden" />
                        </Helmet>
                    </Nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default observer(Navigation);

const navVariants = {
    initial: {
        x: '-100%',
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
            staggerChildren: 0.07,
            delayChildren: 0.4,
        },
    },
    exit: {
        x: '-100%',
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};

const linkItemVariants = {
    initial: {
        y: '-20px',
        x: '-70px',
        opacity: 0,
    },
    animate: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};

const arrowVariants = {
    initial: {
        x: '-7.8rem',
    },
    whileHover: {
        x: '-0.8rem',
        transition: {
            duration: 0.4,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};
