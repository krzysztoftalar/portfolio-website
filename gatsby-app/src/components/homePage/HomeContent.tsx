import React from 'react';

import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import { sectionVariants } from '../../styles/base/globalVariants';
import { Content, HomeContentSection } from '../../styles/pages/homeStyles';

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
                I&apos;m a Full-Stack Developer, React and .NET.
            </Content>
        </HomeContentSection>
    );
};

export default HomeContent;
