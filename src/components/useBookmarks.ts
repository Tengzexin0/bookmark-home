import { useEffect, useState } from 'react';

export function useGistBookmarks<T>(url: string) {
  const [gistData, setGistData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP 错误! ${res.status}`);
        console.log('---res', res.json());
        return res.json();
      })
      .then((jsonData) => {
        setGistData(jsonData);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { gistData, loading, error };
}
