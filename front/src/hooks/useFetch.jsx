import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { api } from 'api';
import { useAbortController, useSafeState } from 'hooks';

export const useFetch = () => {
  const [loading, setLoading] = useSafeState(false);
  const [error, setError] = useSafeState(null);
  const [data, setData] = useSafeState(null);
  const { cancelRequest, getSignal: signal } = useAbortController();

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);

  const call = async (payload, config = {}) => {
    try {
      setLoading(true);
      const { method, endpoint } = payload;

      const { data } = (await api[method](endpoint, payload, { ...config, signal: signal() })) || {};

      if (!isEmpty(data)) setData(data);

      return { data };
    } catch (error) {
      setError(error);
      setLoading(false);

      throw new Error(error.message);
    }
  };
  return { call, data, setData, loading, error };
};
