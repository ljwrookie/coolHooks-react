import React, { useState, useEffect, useCallback } from "react";

const useAsync = (asyncFuntion: Function, immediate: boolean = true) =>{
    const [state, setState] = useState<string>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const execute = useCallback(async () => {
        setLoading(true);
        try {
            const result = await asyncFuntion();
            setState(result);
        } catch (error) {
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
