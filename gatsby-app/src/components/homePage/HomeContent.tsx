import React from 'react';
// Imports from src
import { Content, HomeContentSection } from '../../styles/pages/homeStyles';
import { sectionVariants } from '../../styles/base/globalVariants';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';

const HomeContent = (): JSX.Element => {
    const { ref, animation } = useSectionAnimation();

    return (
        <HomeContentSection
            ref={ref}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <Content>
                Hi, I&apos;m Krzysztof Talar. <br />
                I&apos;m a Full-Stack Developer, React, Flutter, and .NET.
            </Content>
        </HomeContentSection>
    );
};

export default HomeContent;
