import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Imports from src
import { Content, HomeContentSection } from '../../styles/pages/homeStyles';
import { sectionVariants } from '../../styles/base/globalVariants';

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
            variants={sectionVariants}
        >
            <Content>
                Hi, I&apos;m Krzysztof Talar. <br />
                I&apos;m front-end & back-end developer.
            </Content>
        </HomeContentSection>
    );
};

export default HomeContent;
