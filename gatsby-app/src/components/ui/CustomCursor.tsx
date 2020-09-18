import React from 'react';
// Imports from src
import { useStore } from '../../hooks/useStore';
import { useMousePosition } from '../../hooks/useMousePosition';
import { CursorWrapper } from '../../styles/components/cursorStyles';
import { Cursor } from '../../models/cursor';

const CustomCursor = (): JSX.Element => {
    const store = useStore();
    const { cursor, open, elementPosition } = store.uiStore;

    const { elX, elY } = elementPosition;
    const { x, y } = useMousePosition();

    return (
        <>
            <CursorWrapper
                className={`${cursor ? cursor : ''}  
                ${open ? Cursor.NavOpen : ''}
                ${open && cursor === Cursor.Locked ? 'locked--txtColor' : ''}`}
                style={{ left: `${x}px`, top: `${y}px` }}
                elX={`${elX}px`}
                elY={`${elY}px`}
            />
        </>
    );
};

export default CustomCursor;
