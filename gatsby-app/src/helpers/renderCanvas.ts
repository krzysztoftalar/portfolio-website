import { MutableRefObject, useCallback, useEffect } from 'react';
import { black, white } from '../styles/variables';

export const renderCanvas = (
    canvasRef: MutableRefObject<any>,
    size: { width: number; height: number },
    theme: string | null
) => {
    const render = useCallback(() => {
        const renderingElement = canvasRef.current;

        if (renderingElement) {
            const drawingElement = renderingElement.cloneNode();
            const drawingCtx = drawingElement.getContext('2d');
            const renderingCtx = renderingElement.getContext('2d');

            let lastX: number;
            let lastY: number;
            let moving = false;

            if (renderingCtx) {
                renderingCtx.globalCompositeOperation = 'source-over';
                renderingCtx.fillStyle = theme === 'dark' ? black : white;
                renderingCtx.fillRect(0, 0, size.width, size.height);

                renderingElement.addEventListener(
                    'mouseover',
                    (e: MouseEvent) => {
                        moving = true;
                        lastX = e.pageX - renderingElement.offsetLeft;
                        lastY = e.pageY - renderingElement.offsetTop;
                    }
                );

                renderingElement.addEventListener('click', (e: MouseEvent) => {
                    moving = true;
                    lastX = e.pageX - renderingElement.offsetLeft;
                    lastY = e.pageY - renderingElement.offsetTop;
                });

                renderingElement.addEventListener(
                    'mouseup',
                    (e: MouseEvent) => {
                        moving = false;
                        lastX = e.pageX - renderingElement.offsetLeft;
                        lastY = e.pageY - renderingElement.offsetTop;
                    }
                );

                renderingElement.addEventListener(
                    'mousemove',
                    (e: MouseEvent) => {
                        if (moving) {
                            drawingCtx.globalCompositeOperation = 'source-over';
                            renderingCtx.globalCompositeOperation =
                                'destination-out';

                            const currentX =
                                e.pageX - renderingElement.offsetLeft;
                            const currentY =
                                e.pageY - renderingElement.offsetTop;

                            drawingCtx.beginPath();
                            drawingCtx.lineJoin = 'round';
                            drawingCtx.lineCap = 'round';
                            drawingCtx.lineWidth = 120;
                            drawingCtx.moveTo(lastX, lastY);
                            drawingCtx.lineTo(currentX, currentY);
                            drawingCtx.closePath();
                            drawingCtx.stroke();

                            lastX = currentX;
                            lastY = currentY;
                            renderingCtx.drawImage(drawingElement, 0, 0);
                        }
                    }
                );
            }
        }
    }, [theme]);

    useEffect(() => {
        render();
    }, [theme]);
};
