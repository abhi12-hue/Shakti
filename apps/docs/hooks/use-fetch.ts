import { useState } from "react";
import { toast } from "sonner";

type FetchFunction<T> = (...args: any[]) => Promise<T>;

const useFetch = <T>(cb: FetchFunction<T>) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      return response; // ✅ Return raw response
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(error.message);
      return null; // ✅ Return null on error to prevent undefined issues
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
