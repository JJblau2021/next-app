import { useEffect, useState } from "react";

/**
 * snippets prefix : uls
 * @param key localStorage key
 * @param defaultValue default value
 * @returns [value, setValue]
 */
export default function useLocalState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const localValue = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
