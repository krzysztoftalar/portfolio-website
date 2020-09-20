import { RefObject, useCallback, useEffect, useState } from 'react';

export const useElementPosition = (
    elementRef: RefObject<HTMLElement>,
    isAnimating?: boolean
): { x: number; y: number } => {
    const getElementPosition = useCallback(() => {
        const element = elementRef.current as HTMLElement;

        return {
            x: elementRef.current
                ? element.getBoundingClientRect().left + element.offsetWidth / 2
                : 0,
            y: elementRef.current
                ? element.getBoundingClientRect().top + element.offsetHeight / 2
                : 0,
        };
    }, [elementRef]);

    const [elementPosition, setElementPosition] = useState(
        getElementPosition()
    );

    const updateElementPosition = useCallback(() => {
        setElementPosition(getElementPosition());
    }, [getElementPosition]);

    useEffect(() => {
        window.addEventListener('resize', updateElementPosition);

        updateElementPosition();

        return () =>
            window.removeEventListener('resize', updateElementPosition);
    }, [elementRef, updateElementPosition, isAnimating]);

    return elementPosition;
};
