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
                Full-Stack .NET Developer | Azure Cloud & DevOps Engineer.
            </Content>
        </HomeContentSection>
    );
};

export default HomeContent;
