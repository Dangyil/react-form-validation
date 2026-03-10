import { useState, useCallback } from 'react';
import API from '../api/config';

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    try {
      let response;

      switch (method) {
        case 'GET':
          response = await API.get(endpoint);
          break;
        case 'POST':
          response = await API.post(endpoint, data);
          break;
        case 'PUT':
          response = await API.put(endpoint, data);
          break;
        case 'DELETE':
          response = await API.delete(endpoint);
          break;
        default:
          throw new Error('Invalid HTTP method');
      }

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}