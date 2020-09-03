import React, { RefObject, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'gatsby';
// Imports from src
import { HeaderNav, Logo, Menu } from '../styles/headerStyles';
import { useStore } from '../hooks/useStore';
import { Flex } from '../styles/globalStyles';
import { useElementPosition } from '../hooks/useElementPosition';

const headerVariants = {
    hidden: {
        y: -150,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
            delay: 0.5,
        },
    },
    visible: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};

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

    // Move header up on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentY = document.body.getBoundingClientRect().top;

            // Scroll down
            if (currentY < prevY) {
                setShouldShow(false);
            }

            // Scroll on top
            if (currentY === 0) {
                setShouldShow(true);
            }

            setPrevY(currentY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevY]);

    // Cursor locked on hamburger btn hover
    const menu = useRef<HTMLButtonElement>(null);
    const position = useElementPosition(menu);
    const onMenuHover = () => {
        setCursor('locked');
        setElementPosition(position.x, position.y + 150);
    };

    return (
        <HeaderNav
            initial="hidden"
            animate={shouldShow ? 'visible' : 'hidden'}
            variants={headerVariants}
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
                        onMouseEnter={onMenuHover}
                        onClick={() => toggleOpen()}
                        ref={menu}
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

export default observer(Header);
