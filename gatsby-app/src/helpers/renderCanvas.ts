import { MutableRefObject, useCallback, useEffect } from 'react';
import { black, white } from '../styles/base/variables';

export const renderCanvas = (
    canvasRef: MutableRefObject<any>,
    windowSize: { width: number; height: number },
    theme: string | null
): void => {
    const render = useCallback(() => {
        const renderingElement = canvasRef.current;

        if (renderingElement) {
            const drawingElement = renderingElement.cloneNode();
            const drawingCtx = drawingElement.getContext('2d');
            const renderingCtx = renderingElement.getContext('2d');

            renderingCtx.globalCompositeOperation = 'source-over';
            renderingCtx.fillStyle = theme === 'dark' ? black : white;
            renderingCtx.fillRect(0, 0, windowSize.width, windowSize.height);

            let lastX = 0;
            let lastY = 0;
            let moving = false;
            let currentX = 0;
            let currentY = 0;

            renderingElement.addEventListener('mouseover', (e: MouseEvent) => {
                moving = true;
                lastX = e.pageX - renderingElement.offsetLeft;
                lastY = e.pageY - renderingElement.offsetTop;
            });

            renderingElement.addEventListener('click', (e: MouseEvent) => {
                moving = true;
                lastX = e.pageX - renderingElement.offsetLeft;
                lastY = e.pageY - renderingElement.offsetTop;
            });

            renderingElement.addEventListener('mouseup', (e: MouseEvent) => {
                moving = false;
                lastX = e.pageX - renderingElement.offsetLeft;
                lastY = e.pageY - renderingElement.offsetTop;
            });

            renderingElement.addEventListener('touchstart', (e: TouchEvent) => {
                moving = true;
                lastX = e.touches[0].clientX - renderingElement.offsetLeft;
                lastY = e.touches[0].clientY - renderingElement.offsetTop;
            });

            renderingElement.addEventListener('touchmove', (e: TouchEvent) => {
                if (moving) {
                    drawingCtx.globalCompositeOperation = 'source-over';
                    renderingCtx.globalCompositeOperation = 'destination-out';
                    console.log(true);
                    currentX =
                        e.touches[0].clientX - renderingElement.offsetLeft;
                    currentY =
                        e.touches[0].clientY - renderingElement.offsetTop;

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
            });

            // renderingElement.addEventListener('mousemove', (e: MouseEvent) => {
            //     if (moving) {
            //         drawingCtx.globalCompositeOperation = 'source-over';
            //         renderingCtx.globalCompositeOperation = 'destination-out';
            //
            //         currentX = e.pageX - renderingElement.offsetLeft;
            //         currentY = e.pageY - renderingElement.offsetTop;
            //
            //         drawingCtx.beginPath();
            //         drawingCtx.lineJoin = 'round';
            //         drawingCtx.lineCap = 'round';
            //         drawingCtx.lineWidth = 120;
            //         drawingCtx.moveTo(lastX, lastY);
            //         drawingCtx.lineTo(currentX, currentY);
            //         drawingCtx.closePath();
            //         drawingCtx.stroke();
            //
            //         lastX = currentX;
            //         lastY = currentY;
            //         renderingCtx.drawImage(drawingElement, 0, 0);
            //     }
            // });
        }
    }, [theme]);

    useEffect(() => {
        render();
    }, [theme]);
};
