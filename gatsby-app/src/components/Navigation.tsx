import React, { useRef, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image, { FluidObject } from 'gatsby-image';
import { observer } from 'mobx-react';
import { AnimatePresence, motion } from 'framer-motion';
// Imports from src
import { Flex } from '../styles/globalStyles';
import {
    CloseNav,
    FooterCopyrights,
    FooterEmail,
    FooterSocial,
    Nav,
    NavFooter,
    NavHeader,
    NavImages,
    NavList,
} from '../styles/navigationStyles';
import { navRoutes } from '../projects';
import { useStore } from '../hooks/useStore';
import { useElementPosition } from '../hooks/useElementPosition';
import SVG from './ui/SVG';
import SocialLinks from './SocialLinks';

export type ImageSharpFluid = FluidObject | FluidObject[];

interface ImageSharp {
    node: {
        fluid: ImageSharpFluid;
    };
}

const Navigation = (): JSX.Element => {
    const { allImageSharp } = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid(maxWidth: 2000, quality: 85) {
                            ...GatsbyImageSharpFluid
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

    const images: ImageSharp[] = allImageSharp.edges;
    const { fluid } = images[project.key].node;

    const store = useStore();
    const { toggleOpen, open, setCursor, setElementPosition } = store.uiStore;

    // Cursor locked on hamburger btn hover
    const menuRef = useRef<HTMLButtonElement>(null);
    const menuPosition = useElementPosition(menuRef, isAnimationEnd);
    const onMenuHover = () => {
        if (isAnimationEnd) {
            setCursor('locked');
            setElementPosition(menuPosition.x, 70);
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
                                {navRoutes.map((route) => (
                                    <motion.li
                                        key={route.id}
                                        onHoverStart={() =>
                                            setProject({
                                                show: true,
                                                key: route.id,
                                            })
                                        }
                                        onHoverEnd={() =>
                                            setProject({
                                                show: false,
                                                key: route.id,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setCursor('pointer')
                                        }
                                        onMouseLeave={() => setCursor()}
                                    >
                                        <Link to={`projects/${route.path}`}>
                                            <motion.div
                                                whileHover="whileHover"
                                                variants={arrowVariants}
                                                className="link"
                                            >
                                                <span className="arrow">
                                                    <SVG icon="arrow-right" />
                                                </span>

                                                <h2>{route.title}</h2>
                                            </motion.div>
                                        </Link>
                                    </motion.li>
                                ))}
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
                                        fluid={fluid}
                                        alt="Project"
                                        className="img-fluid"
                                    />
                                    {/*<img*/}
                                    {/*    src={require(`../assets/images/${project.img}`)}*/}
                                    {/*    alt=""*/}
                                    {/*    className="img-fluid"*/}
                                    {/*/>*/}
                                </motion.div>
                            </AnimatePresence>
                        </NavImages>

                        <NavFooter>
                            <FooterEmail>
                                <a
                                    href="mailto:krzysztofTalar@protonmail.com"
                                    onMouseEnter={() => setCursor('pointer')}
                                    onMouseLeave={() => setCursor()}
                                >
                                    krzysztofTalar@protonmail.com
                                </a>
                            </FooterEmail>

                            <FooterCopyrights>
                                <p>&copy; Viphon 2020</p>
                            </FooterCopyrights>

                            <FooterSocial>
                                <SocialLinks isAnimationEnd={isAnimationEnd} />
                            </FooterSocial>
                        </NavFooter>
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
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
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
