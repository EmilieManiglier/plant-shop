import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * An hook to prevent setting state on unmounted components
 */
export const useSafeState = (initialState) => {
  const [state, setState] = useState(initialState);

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const setSafeState = useCallback((data) => {
    mounted.current && setState(data);
  }, []);

  return [state, setSafeState];
};
