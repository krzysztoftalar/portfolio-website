import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
// Imports from src
import useWindowSize from './useWindowSize';

export const useSectionAnimation = () => {
    const { width } = useWindowSize();

    const rootMargin = () => {
        if (width > 800) {
            return '-200px';
        } else {
            return '-100px';
        }
    };

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
