import { useCallback } from 'react';

/**
 * An hook to abort requests if parent component unmounts.
 */
export const useAbortController = () => {
  let controller = new AbortController();

  const cancelRequest = useCallback(() => {
    // Cancel previous request
    controller.abort('request aborted');

    // Reset controller to allow new requests after first abort
    controller = new AbortController();
  }, []);

  const getSignal = useCallback(() => controller.signal, []);

  return { cancelRequest, getSignal };
};
