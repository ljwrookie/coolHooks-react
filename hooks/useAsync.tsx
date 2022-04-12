import { useState, useEffect, useCallback } from "react";

type statusType = 'pending'|'idle'|'success'|'error';
const useAsync = <T, E = string>(
    asyncFunction: () => Promise<T>,
    immediate = true
) =>{
    const [status, setStatus] = useState<statusType>('idle');
    const [result, setResult] = useState<T|null>(null);
    const [error, setError] = useState<E|null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const execute = useCallback(async () => {
        setLoading(true);
        try {
            const result = await asyncFunction();
            setStatus('success');
            setResult(result);
        } catch (error) {
            setStatus('error');
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return [status,result, loading, error, execute];
}
export default useAsync;
