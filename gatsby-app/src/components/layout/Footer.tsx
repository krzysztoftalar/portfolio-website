import React, { useEffect, useState } from 'react';
// Imports from src
import SocialLinks from '../ui/SocialLinks';
import { useStore } from '../../hooks/useStore';
import {
    FooterCopyrights,
    FooterEmail,
    FooterSocial,
    FooterWrapper,
} from '../../styles/layout/footerStyles';
import { Cursor } from '../../models/cursor';

const Footer = (): JSX.Element => {
    const store = useStore();
    const { setCursor, open } = store.uiStore;

    const onEmailHover = () => {
        if (open) {
            setCursor(Cursor.Pointer);
        } else {
            setCursor(Cursor.Hovered);
        }
    };

    const [prevY, setPrevY] = useState(0);
    const [shouldShow, setShouldShow] = useState(false);
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight =
                'innerHeight' in window
                    ? window.innerHeight
                    : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            const windowBottom = windowHeight + window.pageYOffset;

            const currentY = document.body.getBoundingClientRect().top;

            // Scroll on bottom
            if (windowBottom >= docHeight - 150) {
                setShouldShow(true);
            }

            // Scroll up
            if (currentY > prevY) {
                setShouldShow(false);
            }

            setPrevY(currentY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevY]);

    return (
        <FooterWrapper
            initial="initial"
            animate={shouldShow ? 'animate' : 'initial'}
            variants={footerVariants}
            onAnimationStart={() => setIsAnimationEnd(false)}
            onAnimationComplete={() => setIsAnimationEnd(true)}
        >
            <FooterEmail navOpen={open}>
                <a
                    href="mailto:krzysztof.talar@protonmail.com"
                    onMouseEnter={onEmailHover}
                    onMouseLeave={() => setCursor()}
                >
                    krzysztof.talar@protonmail.com
                </a>
            </FooterEmail>

            <FooterCopyrights>
                <p>&copy; Sivonte {new Date().getFullYear()}</p>
            </FooterCopyrights>

            <FooterSocial navOpen={open}>
                <SocialLinks isAnimationEnd={isAnimationEnd} />
            </FooterSocial>
        </FooterWrapper>
    );
};

export default Footer;

const footerVariants = {
    initial: {
        y: 150,
        x: 10,
        transition: {
            duration: 0.7,
            ease: [0.666, 0, 0.237, 1],
            delay: 0.1,
        },
    },
    animate: {
        y: 0,
        x: 10,
        transition: {
            duration: 0.7,
            ease: [0.666, 0, 0.237, 1],
        },
    },
};
