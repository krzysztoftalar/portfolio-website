import { MutableRefObject, useCallback, useEffect, useState } from 'react';

const useDimensions = (
    targetRef: MutableRefObject<HTMLDivElement>
): { width: number; height: number } => {
    const getDimensions = useCallback(() => {
        return {
            width: targetRef.current ? targetRef.current.offsetWidth : 0,
            height: targetRef.current ? targetRef.current.offsetHeight : 0,
        };
    }, [targetRef]);

    const [dimensions, setDimensions] = useState(getDimensions());

    const handleResize = useCallback(() => {
        setDimensions(getDimensions());
    }, [getDimensions]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return dimensions;
};

export default useDimensions;
