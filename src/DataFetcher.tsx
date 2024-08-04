/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useEffect, useState } from "react";

interface DataFetcherProps<T> {
  fetcher: () => Promise<T>;
  children: (data: T) => ReactNode;
  loading: ReactNode;
  error: (props: { error: Error; refetch: () => void }) => ReactNode;
}

const DataFetcher = <T,>({
  fetcher,
  children,
  loading,
  error,
}: DataFetcherProps<T>) => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorValue, setErrorValue] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetcher()
      .then((res) => {
        if (isMounted) {
          setResult(res);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (isMounted) {
          setIsLoading(false);
          setErrorValue(e);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  const refetch = async () => {
    setIsLoading(true);
    try {
      const res = await fetcher();
      setResult(res);
    } catch (error: any) {
      setErrorValue(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (errorValue) {
    return error({ error: errorValue, refetch });
  }

  if (isLoading) {
    return loading;
  }

  if (result) {
    return children(result);
  }

  return null;
};

export default DataFetcher;
