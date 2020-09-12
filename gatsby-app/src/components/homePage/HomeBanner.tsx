import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { graphql, useStaticQuery } from 'gatsby';
// Imports from src
import {
    Banner,
    BannerTitle,
    Canvas,
    Headline,
    Video,
} from '../../styles/pages/homeStyles';
import { useStore } from '../../hooks/useStore';
import useWindowSize from '../../hooks/useWindowSize';
import { renderCanvas } from '../../helpers/renderCanvas';
import {
    PanInfo,
    useMotionValue,
    useSpring,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import DragCursor from '../ui/DragCursor';
import { ThemeProvider } from 'styled-components';
import { black, white } from '../../styles/base/variables';
import usePrevState from '../../hooks/usePrevState';

const HomeBanner = (): JSX.Element => {
    const data = useStaticQuery(graphql`
        query {
            video: file(relativePath: { eq: "banner.mp4" }) {
                publicURL
            }
        }
    `);

    const store = useStore();
    const { theme, setCursor } = store.uiStore;

    const windowSize = useWindowSize();
    const canvasRef = useRef<any>(null);

    const [drag, setDrag] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const onDrag = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        setDrag({ x: info.point.x, y: info.point.y });
    };

    renderCanvas(canvasRef, windowSize, theme);

    // Move video up on scroll
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 0.5], [0, -600]);
    const y = useSpring(yRange, {
        stiffness: 300,
        damping: 20,
        mass: 0.5,
    });

    return (
        <Banner>
            <Video style={{ y }}>
                <video src={data.video.publicURL} autoPlay muted loop>
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

            <DragCursor onDrag={onDrag} />
            <BannerTitle initial="initial" animate="animate">
                <Headline variants={firstHeadlineVariants}>Dig</Headline>
                <Headline variants={secondHeadlineVariants}>Deep</Headline>
            </BannerTitle>
        </Banner>
    );
};

export default observer(HomeBanner);

const firstHeadlineVariants = {
    initial: {
        y: '80rem',
    },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};

const secondHeadlineVariants = {
    initial: {
        y: '80rem',
    },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            delay: 0.2,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};
