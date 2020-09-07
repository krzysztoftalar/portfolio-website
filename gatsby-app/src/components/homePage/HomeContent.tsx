import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Imports from src
import { Content, HomeContentSection } from '../../styles/homeStyles';

const HomeContent = (): JSX.Element => {
    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-300px',
    });

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        }
    }, [animation, inView]);

    return (
        <HomeContentSection
            ref={contentRef}
            initial="initial"
            animate={animation}
            variants={contentVariants}
        >
            <Content>
                Hi, I&apos;m Krzysztof Talar. <br />
                I&apos;m front-end & back-end developer.
            </Content>
        </HomeContentSection>
    );
};

export default HomeContent;

const contentVariants = {
    initial: {
        y: '7rem',
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};
