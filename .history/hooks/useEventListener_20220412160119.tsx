import { useEffect,useRef } from 'react';

const useEventListener = (eventName,handle,element = window){
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = handle;
    },[handle]);
    useEffect(() => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
