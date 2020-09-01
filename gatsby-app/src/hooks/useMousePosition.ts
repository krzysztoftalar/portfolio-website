import { useEffect, useState } from 'react';

export const useMousePosition = (): { x: number; y: number } => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const handleMousePosition = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMousePosition);

        return () =>
            window.removeEventListener('mousemove', handleMousePosition);
    }, []);

    return mousePosition;
};
