import { useEffect, useState } from "react";

type Props<T> = {
  fn: () => Promise<T>;
};

export const useFetch = <T>({ fn }: Props<T>) => {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fn();
      setError(null);
      setValue(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setValue(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { value, loading, error, reset, refetch: fetchData };
};
