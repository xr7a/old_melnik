import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface FetchResults<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(apiFunc: Promise<AxiosResponse<any, any>>, option: any): FetchResults<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: any = await apiFunc;
        console.log(response, "сука");
        if (!response) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setData(response);
      } catch (e: any) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, option);
  
  return { data, loading, error }
}
