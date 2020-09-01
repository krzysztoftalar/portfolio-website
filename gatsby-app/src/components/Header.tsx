import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { observer } from 'mobx-react';
// Imports from src
import { HeaderNav, Logo, Menu } from '../styles/headerStyles';
import { Container, Flex } from '../styles/globalStyles';
import { useStore } from '../hooks/useStore';

const headerVariants = {
    hidden: {
        y: '-15rem',
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
    const { setTheme, theme, setCursor } = store.uiStore;

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    const [prevY, setPrevY] = useState(0);
    const [shouldShow, setShouldShow] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const newY = document.body.getBoundingClientRect().top;

            if (newY < prevY) {
                setShouldShow(false);
            }

            if (newY === 0) {
                setShouldShow(true);
            }

            setPrevY(newY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevY]);

    return (
        <HeaderNav
            initial="hidden"
            animate={shouldShow ? 'visible' : 'hidden'}
            variants={headerVariants}
        >
            <Container>
                <Flex justifyBetween noHeight>
                    <Logo
                        onMouseEnter={() => setCursor('hovered')}
                        onMouseLeave={() => setCursor()}
                    >
                        <Link to="/">VIPH</Link>
                        <span
                            onClick={toggleTheme}
                            onMouseEnter={() => setCursor('pointer')}
                            onMouseLeave={() => setCursor('hovered')}
                        />
                        <Link to="/">N</Link>
                    </Logo>
                    <Menu>
                        <button>
                            <span />
                            <span />
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    );
};

export default observer(Header);
