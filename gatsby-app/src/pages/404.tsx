import React, { useEffect, useState } from 'react';

import SEO from '../components/ui/SEO';
import { NotFoundWrapper } from '../styles/pages/notFoundStyles';

const NotFound = (): JSX.Element => {
    const [mousePosition, setMousePosition] = useState({
        x: '70vw',
        y: '50vh',
    });

    useEffect(() => {
        const handleMousePosition = (e: any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            if (e.changedTouches && e.changedTouches.length > 0) {
                setMousePosition({
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY,
                });
            }
        };

        window.addEventListener('mousemove', handleMousePosition);
        window.addEventListener('touchmove', handleMousePosition);

        return () => {
            window.removeEventListener('mousemove', handleMousePosition);
            window.removeEventListener('touchmove', handleMousePosition);
        };
    }, []);

    return (
        <NotFoundWrapper>
            <SEO title="Page not found" />

            <div className="content">
                <h1>404</h1>
                <h2>Uh, No</h2>
                <h3>
                    Sorry we can&apos;t find what you are looking for, because
                    it&apos;s so dark in here.
                </h3>
            </div>

            <div
                className="cursor"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                }}
            />
        </NotFoundWrapper>
    );
};

export default NotFound;
