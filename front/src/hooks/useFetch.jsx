import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { api } from 'api';
import { useAbortController, useSafeState } from 'hooks';

export const useFetch = (fetchOptions = {}) => {
  const [loading, setLoading] = useSafeState(false);
  const [error, setError] = useSafeState(null);
  const [data, setData] = useSafeState(null);
  const { cancelRequest, getSignal: signal } = useAbortController();

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);

  const call = async (payload) => {
    const { method = 'get', url, params, axiosConfig = {} } = payload || {};
    const { withSetState = true } = fetchOptions;

    try {
      setLoading(true);

      const { data, status, headers } = (await api[method](url, params, { ...axiosConfig, signal: signal() })) || {};
      if (!isEmpty(data)) {
        withSetState && setData(data);
      }
      return { data, status, headers };
    } catch (error) {
      setError(error.response);
      return { error: error.response };
    } finally {
      setLoading(false);
    }
  };
  return { call, data, setData, loading, error };
};
