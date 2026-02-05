import { useEffect, useState } from 'react';

export function useGistBookmarks<T>(url: string) {
  const [gistData, setGistData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    // 动态拼接时间戳
    const finalUrl = url.includes('?')
      ? `${url}&v=${Date.now()}`
      : `${url}?v=${Date.now()}`;

    fetch(finalUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP 错误! ${res.status}`);
        return res.json();
      })
      .then((jsonData) => {
        console.log('----jsonData', jsonData);
        setGistData(jsonData);
        setError(null);
      })
      .catch((err) => {
        console.error('----err', err);
        if (err.name === 'AbortError') return;
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { gistData, loading, error };
}
