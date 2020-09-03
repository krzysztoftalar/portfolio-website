import React, { useRef, useState } from 'react';
import { Link } from 'gatsby';
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
import svg from '../assets/svg/sprite.svg';
import { navRoutes } from '../data/projects';
import { useStore } from '../hooks/useStore';
import { useElementPosition } from '../hooks/useElementPosition';
import useTimeOut from '../hooks/useTimeout';
import { socials } from '../data/socials';

const Navigation = (): JSX.Element => {
    const [project, setProject] = useState({
        show: false,
        img: 'instagram-1.png',
        key: 0,
    });

    const store = useStore();
    const { toggleOpen, open, setCursor, setElementPosition } = store.uiStore;

    // Set delay for isMounted prop, otherwise hamburger position is zero
    const [isMounted, setIsMounted] = useState(open);
    useTimeOut(() => setIsMounted(open), open ? 800 : 0);

    // Cursor locked on hamburger btn hover
    const menuRef = useRef<HTMLButtonElement>(null);
    const menuPosition = useElementPosition(menuRef, isMounted);
    const onMenuHover = () => {
        setCursor('locked');
        setElementPosition(menuPosition.x, menuPosition.y);
    };

    // Cursor locked on links hover
    const githubRef = useRef<HTMLAnchorElement>(null);
    const githubPosition = useElementPosition(githubRef, isMounted);

    const linkedinRef = useRef<HTMLAnchorElement>(null);
    const linkedinPosition = useElementPosition(linkedinRef, isMounted);

    const onLinkHover = (x: number, y: number) => {
        setCursor('locked');
        setElementPosition(x, y);
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
                                                img: route.img,
                                                key: route.id,
                                            })
                                        }
                                        onHoverEnd={() =>
                                            setProject({
                                                show: false,
                                                img: route.img,
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
                                                    <svg>
                                                        <use
                                                            xlinkHref={`${svg}#icon-arrow-right`}
                                                        />
                                                    </svg>
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

                            <div className="img">
                                <AnimatePresence
                                    initial={false}
                                    exitBeforeEnter
                                >
                                    <motion.img
                                        key={project.key}
                                        src={require(`../assets/images/${project.img}`)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'easeInOut',
                                        }}
                                        exit={{ opacity: 0 }}
                                        alt="Project"
                                    />
                                </AnimatePresence>
                            </div>
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
                                <a
                                    onMouseEnter={() =>
                                        onLinkHover(
                                            linkedinPosition.x,
                                            linkedinPosition.y
                                        )
                                    }
                                    onMouseLeave={() => setCursor()}
                                    href="https://www.linkedin.com/in/ktalar"
                                    ref={linkedinRef}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <svg>
                                        <use
                                            xlinkHref={`${svg}#icon-linkedin`}
                                        />
                                    </svg>
                                </a>

                                <a
                                    onMouseEnter={() =>
                                        onLinkHover(
                                            githubPosition.x,
                                            githubPosition.y
                                        )
                                    }
                                    onMouseLeave={() => setCursor()}
                                    href="https://github.com/krzysztoftalar"
                                    ref={githubRef}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <svg>
                                        <use xlinkHref={`${svg}#icon-github`} />
                                    </svg>
                                </a>
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
