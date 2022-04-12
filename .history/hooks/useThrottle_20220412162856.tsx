import { useState, useEffect } from 'react';

const useThrottle = <T extends any>(value: T, delay: number) => {
    const [throttledValue, setThrottledValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setThrottledValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return throttledValue;
}
export default useThrottle;
