import { useEffect, useRef } from 'react';

const usePrevState = (value: any) => {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePrevState;
