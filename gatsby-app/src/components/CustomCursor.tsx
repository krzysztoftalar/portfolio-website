import React from 'react';
// Imports from src
import { useStore } from '../hooks/useStore';
import { useMousePosition } from '../hooks/useMousePosition';
import { Cursor } from '../styles/globalStyles';

const CustomCursor = (): JSX.Element => {
    const store = useStore();
    const { cursor } = store.uiStore;

    const { x, y } = useMousePosition();

    return (
        <>
            <Cursor
                className={`${cursor ? 'hovered' : ''} ${cursor}`}
                style={{ left: `${x}px`, top: `${y}px` }}
            />
        </>
    );
};

export default CustomCursor;
