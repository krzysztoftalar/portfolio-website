import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'gatsby';
// Imports from src
import { HeaderNav, Logo, Menu } from '../../styles/layout/headerStyles';
import { useStore } from '../../hooks/useStore';
import { Flex } from '../../styles/base/globalStyles';
import { useElementPosition } from '../../hooks/useElementPosition';
import { Cursor } from '../../models/cursor';
import { useDarkMode } from '../../hooks/useDarkMode';

const Header = (): JSX.Element => {
    const store = useStore();
    const { setCursor, setElementPosition, toggleOpen } = store.uiStore;

    const { toggleTheme } = useDarkMode();

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
            setCursor(Cursor.Locked);
            setElementPosition(position.x, position.y);
        }
    };

    return (
        <HeaderNav
            initial="initial"
            animate={shouldShow ? 'animate' : 'initial'}
            variants={headerVariants}
            onAnimationStart={() => setIsAnimationEnd(false)}
            onAnimationComplete={() => setIsAnimationEnd(true)}
        >
            <Flex
                justifyBetween
                noHeight
                onMouseEnter={() => setCursor(Cursor.Hovered)}
                onMouseLeave={() => setCursor()}
            >
                <Logo>
                    <Link to="/">VIPH</Link>
                    <span
                        onClick={toggleTheme}
                        onMouseEnter={() => setCursor(Cursor.Pointer)}
                        onMouseLeave={() => setCursor(Cursor.Hovered)}
                    />
                    <Link to="/">N</Link>
                </Logo>

                <Menu>
                    <button
                        onMouseOver={onMenuHover}
                        onMouseLeave={() => setCursor()}
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

export default observer(Header);

const headerVariants = {
    initial: {
        y: -150,
        transition: {
            duration: 1,
            ease: [0.666, 0, 0.237, 1],
            delay: 0.1,
        },
    },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.666, 0, 0.237, 1],
        },
    },
};
