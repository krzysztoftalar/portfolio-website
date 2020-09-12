import React from 'react';
import { PanInfo } from 'framer-motion';
// Imports from src
import { Drag } from '../../styles/components/cursorStyles';

interface IProps {
    onDrag(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}

const DragCursor: React.FC<IProps> = ({ onDrag }: IProps): JSX.Element => {
    return <Drag drag={true} onDrag={onDrag} />;
};

export default DragCursor;
