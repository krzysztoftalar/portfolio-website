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

const Footer = (): JSX.Element => {
    const store = useStore();
    const { setCursor, open } = store.uiStore;

    const onEmailHover = () => {
        if (open) {
            setCursor('pointer');
        } else {
            setCursor('hovered');
        }
    };

    const [prevY, setPrevY] = useState(0);
    const [shouldShow, setShouldShow] = useState(false);
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = document.body.getBoundingClientRect().top;

            // Scroll on bottom
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 60
            ) {
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
                    href="mailto:krzysztofTalar@protonmail.com"
                    onMouseEnter={onEmailHover}
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
        </FooterWrapper>
    );
};

export default Footer;

const footerVariants = {
    initial: {
        y: 150,
        transition: {
            duration: 0.7,
            ease: [0.666, 0, 0.237, 1],
            delay: 0.1,
        },
    },
    animate: {
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.666, 0, 0.237, 1],
        },
    },
};
