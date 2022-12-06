import loadable from '@loadable/component';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import { observer } from 'mobx-react';
import React from 'react';

import { HomeBannerSection } from '../../../styles/pages/homeStyles';

// Lazy imports
const Video = loadable(() => import('./Video'));
const Canvas = loadable(() => import('./Canvas'));
const BannerTitle = loadable(() => import('./BannerTitle'));

const HomeBanner = (): JSX.Element => {
    // Move video up on scroll
    const { scrollYProgress } = useScroll();
    const yRange = useTransform(scrollYProgress, [0, 0.5], [0, -600]);
    const y = useSpring(yRange, {
        stiffness: 300,
        damping: 20,
        mass: 0.5,
    });

    return (
        <HomeBannerSection>
            <Video y={y} />
            <Canvas top={y} />
            <BannerTitle />
        </HomeBannerSection>
    );
};

export default observer(HomeBanner);
