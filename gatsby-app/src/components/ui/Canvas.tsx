import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import isTouchDevice from 'is-touch-device';
// Imports from src
import { useStore } from '../../hooks/useStore';
import useWindowSize from '../../hooks/useWindowSize';
import { CanvasWrapper } from '../../styles/pages/homeStyles';
import { black, white } from '../../styles/base/variables';
import { Drag } from '../../styles/components/cursorStyles';

const midPointBtw = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
) => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    };
};

const Canvas = () => {
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
        [theme]
    );

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
    }, [current, last, isDrawing]);

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

    const handleMouseStart = (e: React.MouseEvent) => {
        e.preventDefault();

        const { x, y } = getPointerPos(e);

        last.x = x;
        last.y = y;
    };
    console.log(true);
    const handleMouseMove = (e: React.MouseEvent) => {
        e.preventDefault();

        const { x, y } = getPointerPos(e);

        isDrawing = true;

        if (isDrawing && !isTouchDevice()) {
            if (last.x === 0 && last.y === 0) {
                last.x = x;
                last.y = y;
            }

            current.x = x;
            current.y = y;

            drawPoints();
        }
    };

    const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
        e.preventDefault();

        const { x, y } = getPointerPos(e);

        last.x = x;
        last.y = y;
    };

    const handleDragMove = (e: MouseEvent | TouchEvent | PointerEvent) => {
        e.preventDefault();

        const { x, y } = getPointerPos(e);

        isDrawing = true;

        if (isDrawing && isTouchDevice()) {
            current.x = x;
            current.y = y;

            drawPoints();
        }
    };

    return (
        <>
            <CanvasWrapper
                ref={canvasRef}
                height={height}
                width={width}
                onMouseOver={handleMouseStart}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setCursor('hovered')}
                onMouseLeave={() => setCursor()}
            />
            <Drag
                drag
                onDrag={handleDragMove}
                onDragStart={handleDragStart}
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
