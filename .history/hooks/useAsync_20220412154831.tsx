import React, { useState, useEffect, useCallback } from "react";

type stateType = 'pending'|'idle'|'success'|'error';
const useAsync = (asyncFuntion: Function, immediate: boolean = true) =>{
    const [state, setState] = useState<stateType>(null);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const execute = useCallback(async () => {
        setLoading(true);
        try {
            const result = await asyncFuntion();
            setState('success');
            setResult(result);
        } catch (error) {
            setState('error');
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [asyncFuntion]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return [state, loading, error, execute];
}
export default useAsync;
