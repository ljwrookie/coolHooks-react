import { useEffect,useRef } from 'react';

const useEventListener = (eventName,handle,element = window){
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = handle;
    },[handle]);
}
