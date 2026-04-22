import {useEffect, useState, type DependencyList} from 'react';

type UseRemoteDataState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useRemoteData<T>(
  loader: () => Promise<T>,
  deps: DependencyList,
): UseRemoteDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    loader()
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch((nextError: Error) => {
        if (!cancelled) {
          setError(nextError);
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, deps);

  return {data, loading, error};
}
