import { useState, useEffect } from "react";

export function useLocalStorageState<T>(
  initialState: T | (() => T),
  key: string
) {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);

    if (storedValue != null) return JSON.parse(storedValue);

    if (typeof initialState === "function") {
      return (initialState as () => T)();
    } else {
      return initialState;
    }

    // return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue] as const;
}
