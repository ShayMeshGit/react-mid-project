import { useState, useEffect } from "react";
import { getAll } from "../utils/axios";

const useAxios = (url = "", options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const abortContoller = new AbortController();

    const axiosGet = async () => {
      try {
        const { data } = await getAll(url, {
          signal: abortContoller.signal,
          ...options,
        });
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    axiosGet();

    return () => abortContoller.abort();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useAxios;
