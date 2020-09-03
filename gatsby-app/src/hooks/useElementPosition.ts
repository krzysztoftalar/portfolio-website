import { RefObject, useEffect, useState } from 'react';

export const useElementPosition = (
    elementRef: RefObject<HTMLElement>,
    isMounted?: boolean
): { x: number; y: number } => {
    const getElementPosition = () => {
        const element = elementRef.current as HTMLElement;

        return {
            x: elementRef.current
                ? element.getBoundingClientRect().left +
                  document.documentElement.scrollLeft +
                  element.offsetWidth / 2
                : 0,
            y: elementRef.current
                ? element.getBoundingClientRect().top +
                  document.documentElement.scrollTop +
                  element.offsetHeight / 2
                : 0,
        };
    };

    const [elementPosition, setElementPosition] = useState(
        getElementPosition()
    );

    useEffect(() => {
        setElementPosition(getElementPosition());
    }, [elementRef, isMounted]);

    return elementPosition;
};
