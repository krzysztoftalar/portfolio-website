import { useEffect, useState } from 'react';

const useWindowSize = (): { width: number; height: number } => {
    const getSize = () => {
        if (typeof window !== 'undefined') {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        } else {
            return {
                width: 0,
                height: 0,
            };
        }
    };

    const [windowSize, setWindowSize] = useState(getSize());

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
