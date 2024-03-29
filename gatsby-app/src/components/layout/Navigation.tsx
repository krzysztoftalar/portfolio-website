import { AnimatePresence, motion } from 'framer-motion';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';

import useBodyClass from '../../hooks/useBodyClass';
import { useElementPosition } from '../../hooks/useElementPosition';
import { useStore } from '../../hooks/useStore';
import useTimeOut from '../../hooks/useTimeout';
import { Cursor } from '../../models/cursor';
import { IProject } from '../../models/project';
import { Flex } from '../../styles/base/globalStyles';
import { customEase, easeInOut } from '../../styles/base/globalVariants';
import {
    FooterCopyrights,
    FooterEmail,
    FooterSocial,
    NavFooterWrapper,
} from '../../styles/layout/footerStyles';
import {
    CloseNav,
    Nav,
    NavHeader,
    NavImages,
    NavList,
} from '../../styles/layout/navigationStyles';
import { CONTACT_EMAIL, COPYRIGHT } from '../../utils/constants';
import SocialLinks from '../ui/SocialLinks';
import SVG from '../ui/SVG';

const Navigation = (): JSX.Element => {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(
                filter: { frontmatter: { category: { eq: "projects" } } }
                sort: { frontmatter: { year: ASC } }
            ) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
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

    const [project, setProject] = useState({
        show: false,
        key: 0,
    });
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);

    const projects: IProject[] = allMdx.nodes;
    const projectCover = getImage(projects[project.key].frontmatter.cover);

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

    // Add overflow class to body with delay
    const [overflow, setOverflow] = useState('');
    useTimeOut(
        () => setOverflow(open ? 'overflow-hidden' : ''),
        open ? 900 : 0
    );
    useBodyClass(overflow);

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
                                        frontmatter: { title, subtitle },
                                    } = item;

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
                                            initial={linkItemVariants.initial}
                                            animate={linkItemVariants.animate}
                                        >
                                            <Link
                                                to={`${item.fields.slug}`}
                                                onClick={() => toggleOpen()}
                                            >
                                                <motion.div
                                                    whileHover={
                                                        arrowVariants.whileHover
                                                    }
                                                    initial={
                                                        arrowVariants.initial
                                                    }
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
                                        ease: customEase,
                                    },
                                }}
                                className="reveal"
                            />

                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    className="img"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: easeInOut,
                                    }}
                                    exit={{ opacity: 0 }}
                                    key={project.key}
                                >
                                    {projectCover && (
                                        <GatsbyImage
                                            image={projectCover}
                                            alt="Project"
                                            className="img-fluid"
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </NavImages>

                        <NavFooterWrapper>
                            <FooterEmail navOpen={open}>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    onMouseEnter={() =>
                                        setCursor(Cursor.Pointer)
                                    }
                                    onMouseLeave={() => setCursor()}
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </FooterEmail>

                            <FooterCopyrights>
                                <p>{COPYRIGHT}</p>
                            </FooterCopyrights>

                            <FooterSocial navOpen={open}>
                                <SocialLinks isAnimationEnd={isAnimationEnd} />
                            </FooterSocial>
                        </NavFooterWrapper>
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
            ease: customEase,
            staggerChildren: 0.07,
            delayChildren: 0.4,
        },
    },
    exit: {
        x: '-100%',
        transition: {
            duration: 0.8,
            ease: customEase,
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
            ease: customEase,
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
            ease: customEase,
        },
    },
};
