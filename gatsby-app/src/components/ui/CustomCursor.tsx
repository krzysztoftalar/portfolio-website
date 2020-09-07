import React from 'react';
// Imports from src
import { useStore } from '../../hooks/useStore';
import { useMousePosition } from '../../hooks/useMousePosition';
import { Cursor } from '../../styles/globalStyles';

const CustomCursor = (): JSX.Element => {
    const store = useStore();
    const { cursor, open, elementPosition } = store.uiStore;

    const { elX, elY } = elementPosition;
    const { x, y } = useMousePosition();

    return (
        <>
            <Cursor
                className={`${cursor ? cursor : ''}  
                ${open ? 'nav-open' : ''}
                ${open && cursor === 'locked' ? 'locked--txtColor' : ''}`}
                style={{ left: `${x}px`, top: `${y}px` }}
                elX={`${elX}px`}
                elY={`${elY}px`}
            />
        </>
    );
};

export default CustomCursor;
