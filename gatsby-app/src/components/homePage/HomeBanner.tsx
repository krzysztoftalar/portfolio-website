import React, { useRef } from 'react';
import { observer } from 'mobx-react';
// Imports from src
import {
    Banner,
    BannerTitle,
    Canvas,
    Headline,
    Video,
} from '../../styles/homeStyles';
import { useStore } from '../../hooks/useStore';
import useWindowSize from '../../hooks/useWindowSize';
import { renderCanvas } from '../../helpers/renderCanvas';

const bannerTitleVariants = {
    initial: {
        y: 800,
        x: '-2.5rem',
    },
    animate: {
        y: 0,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const headlineVariants = {
    initial: {
        y: 800,
    },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};

const HomeBanner = (): JSX.Element => {
    const store = useStore();
    const { theme, setCursor } = store.uiStore;

    const windowSize = useWindowSize();
    const canvasRef = useRef<any>(null);

    renderCanvas(canvasRef, windowSize, theme);

    return (
        <Banner>
            <Video>
                <video
                    src={require('../../assets/video/banner.mp4')}
                    height="100%"
                    width="100%"
                    autoPlay
                    muted
                    loop
                >
                    Your browser is not supported!
                </video>
            </Video>

            <Canvas
                onMouseEnter={() => setCursor('hovered')}
                onMouseLeave={() => setCursor()}
                height={windowSize.height}
                width={windowSize.width}
                ref={canvasRef}
            />

            <BannerTitle
                initial="initial"
                animate="animate"
                variants={bannerTitleVariants}
            >
                <Headline variants={headlineVariants}>Dig</Headline>
                <Headline variants={headlineVariants}>Deep</Headline>
            </BannerTitle>
        </Banner>
    );
};

export default observer(HomeBanner);
