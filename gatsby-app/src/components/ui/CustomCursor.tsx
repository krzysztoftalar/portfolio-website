import React from 'react';

import { useMousePosition } from '../../hooks/useMousePosition';
import { useStore } from '../../hooks/useStore';
import { Cursor } from '../../models/cursor';
import { CursorWrapper } from '../../styles/components/cursorStyles';

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
