import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'gatsby';
// Imports from src
import { HeaderNav, Logo, Menu } from '../styles/headerStyles';
import { useStore } from '../hooks/useStore';
import { Flex } from '../styles/globalStyles';
import { useElementPosition } from '../hooks/useElementPosition';
import useTimeOut from '../hooks/useTimeout';
import { useMotionValue, useTransform } from 'framer-motion';

const Header = (): JSX.Element => {
    const store = useStore();
    const {
        setTheme,
        theme,
        setCursor,
        toggleOpen,
        setElementPosition,
    } = store.uiStore;

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    const [prevY, setPrevY] = useState(0);
    const [shouldShow, setShouldShow] = useState(true);
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);

    // Move header up on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentY = document.body.getBoundingClientRect().top;

            // Scroll down
            if (currentY < prevY) {
                setShouldShow(false);
            }

            // Scroll on top
            if (currentY > -40) {
                setShouldShow(true);
            }

            setPrevY(currentY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevY]);

    // Cursor locked on hamburger btn hover
    const menuRef = useRef<HTMLButtonElement>(null);
    const position = useElementPosition(menuRef, isAnimationEnd);
    const onMenuHover = () => {
        if (isAnimationEnd) {
            setCursor('locked');
            setElementPosition(position.x, position.y);
        }
    };

    return (
        <HeaderNav
            initial="hidden"
            animate={shouldShow ? 'visible' : 'hidden'}
            variants={headerVariants}
            onAnimationStart={() => setIsAnimationEnd(false)}
            onAnimationComplete={() => setIsAnimationEnd(true)}
        >
            <Flex
                justifyBetween
                noHeight
                onMouseEnter={() => setCursor('hovered')}
            >
                <Logo>
                    <Link to="/">VIPH</Link>
                    <span
                        onClick={toggleTheme}
                        onMouseEnter={() => setCursor('pointer')}
                        onMouseLeave={() => setCursor('hovered')}
                    />
                    <Link to="/">N</Link>
                </Logo>

                <Menu>
                    <button
                        onMouseOver={onMenuHover}
                        onClick={() => toggleOpen()}
                        ref={menuRef}
                    >
                        <span />
                        <span />
                    </button>
                    <p>Projects</p>
                </Menu>
            </Flex>
        </HeaderNav>
    );
};

const headerVariants = {
    hidden: {
        y: -150,
        transition: {
            duration: 1,
            ease: [0.666, 0, 0.237, 1],
            delay: 0.5,
        },
    },
    visible: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.666, 0, 0.237, 1],
        },
    },
};

export default observer(Header);
