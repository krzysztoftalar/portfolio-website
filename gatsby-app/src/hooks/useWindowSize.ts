import { useEffect, useState } from 'react';

const useWindowSize = (): { width: number; height: number } => {
    const getSize = () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
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
