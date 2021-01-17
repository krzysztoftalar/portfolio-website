import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimationControls, useAnimation } from 'framer-motion';
// Imports from src
import useWindowSize from './useWindowSize';

export const useSectionAnimation = (
    margin = '-200px',
    marginMobile = '-100px'
): {
    ref: any;
    animation: AnimationControls;
} => {
    const { width } = useWindowSize();

    const rootMargin = () => {
        if (width > 1200) {
            return margin;
        } else {
            return marginMobile;
        }
    };
    console.log(rootMargin());
    const animation = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: rootMargin(),
    });

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        }
    }, [animation, inView, ref]);

    return { ref, animation };
};
