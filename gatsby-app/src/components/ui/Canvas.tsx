import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { MotionValue } from 'framer-motion';
import { isBrowser, isMobile } from 'react-device-detect';
// Imports from src
import { useStore } from '../../hooks/useStore';
import useWindowSize from '../../hooks/useWindowSize';
import { CanvasWrapper } from '../../styles/pages/homeStyles';
import { black, white } from '../../styles/base/variables';
import { Drag } from '../../styles/components/cursorStyles';
import { Cursor } from '../../models/cursor';

const midPointBtw = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
) => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    };
};

interface Props {
    top: MotionValue;
}

export const useIsMounted = (): (() => boolean) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return function cleanup(): void {
            isMounted.current = false;
        };
    }, []);

    return useCallback((): boolean => {
        return isMounted.current;
    }, []);
};
function useIsMountedRef(): MutableRefObject<boolean> {
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;

        return () => (isMountedRef.current = false);
    }, []);

    return isMountedRef;
}

const Canvas: React.FC<Props> = ({ top }) => {
    const store = useStore();
    const { theme, setCursor } = store.uiStore;
    const { width, height } = useWindowSize();

    let renderingElement: any;
    let drawingElement: any;
    let drawingCtx: any;
    let renderingCtx: any;

    let isDrawing = false;
    const last = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    // Render canvas
    const canvasRef = useCallback(
        (node) => {
            if (node !== null) {
                renderingElement = node;
                drawingElement = renderingElement.cloneNode();
                drawingCtx = drawingElement.getContext('2d');
                renderingCtx = renderingElement.getContext('2d');

                renderingCtx.globalCompositeOperation = 'source-over';
                renderingCtx.fillStyle = theme === 'dark' ? black : white;
                renderingCtx.fillRect(0, 0, width, height);

                drawingCtx.globalCompositeOperation = 'source-over';
                renderingCtx.globalCompositeOperation = 'destination-out';
            }
        },
        [theme, width, height]
    );

    // Draw lines
    const drawPoints = useCallback(() => {
        if (drawingCtx && isDrawing) {
            drawingCtx.lineJoin = 'round';
            drawingCtx.lineCap = 'round';
            drawingCtx.lineWidth = 120;

            drawingCtx.clearRect(
                0,
                0,
                drawingCtx.canvas.width,
                drawingCtx.canvas.height
            );

            drawingCtx.beginPath();
            drawingCtx.moveTo(last.x, last.y);
            const midPoint = midPointBtw(current, last);
            drawingCtx.quadraticCurveTo(
                current.x,
                current.y,
                midPoint.x,
                midPoint.y
            );

            drawingCtx.lineTo(current.x, current.y);
            drawingCtx.stroke();
            drawingCtx.closePath();

            renderingCtx.drawImage(drawingElement, 0, 0);

            last.x = current.x;
            last.y = current.y;
        }
    }, [current, last]);

    // Get position from mouse and drag events
    const getPointerPos = (e: any) => {
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        }

        return {
            x: clientX,
            y: clientY,
        };
    };

    // Set current position and draw points
    const setPointerPos = (
        e: React.MouseEvent | MouseEvent | TouchEvent | PointerEvent,
        device: boolean
    ) => {
        e.preventDefault();

        const { x, y } = getPointerPos(e);

        isDrawing = true;

        if (isDrawing && device) {
            current.x = x;
            current.y = y;

            // Update cursor position while scrolling
            if (top.get() !== 0) {
                current.y = current.y - 2 * top.get();
            }

            drawPoints();
        }
    };

    // Handle mouse and drag over
    const handleStart = (
        e: React.MouseEvent | MouseEvent | TouchEvent | PointerEvent
    ) => {
        e.preventDefault();

        const { x, y } = getPointerPos(e);

        last.x = x;
        last.y = y;

        // Update cursor position while scrolling
        if (top.get() !== 0) {
            last.y = last.y - 2 * top.get();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setPointerPos(e, isBrowser);
    };

    const handleDragMove = (e: MouseEvent | TouchEvent | PointerEvent) => {
        setPointerPos(e, isMobile);
    };

    return (
        <>
            <CanvasWrapper
                ref={canvasRef}
                height={height}
                width={width}
                onMouseOver={handleStart}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setCursor(Cursor.Hovered)}
                onMouseLeave={() => setCursor()}
            />
            <Drag
                drag
                onDrag={handleDragMove}
                onDragStart={handleStart}
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: width - 60,
                    bottom: height - 40,
                }}
            >
                <span>Drag</span>
            </Drag>
        </>
    );
};

export default observer(Canvas);
