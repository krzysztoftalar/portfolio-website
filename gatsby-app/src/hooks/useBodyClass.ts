import { useEffect } from 'react';

const addClassToBody = (className: string | null) => {
    if (className) {
        document.body.classList.add(className);
    }
};
const removeClassFromBody = (className: string) => {
    if (className) {
        document.body.classList.remove(className);
    }
};

const useBodyClass = (className: string | string[]): void => {
    useEffect(() => {
        className instanceof Array
            ? className.map(addClassToBody)
            : addClassToBody(className);

        return () => {
            className instanceof Array
                ? className.map(removeClassFromBody)
                : removeClassFromBody(className);
        };
    }, [className]);
};

export default useBodyClass;
