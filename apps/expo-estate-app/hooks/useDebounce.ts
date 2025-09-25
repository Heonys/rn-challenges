import { useState, useEffect, useRef, useCallback } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500,
) {
  const timerRef = useRef<number | null>(null);
  const funcRef = useRef(func);

  funcRef.current = func;

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay],
  );

  const cancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const flush = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      funcRef.current();
      timerRef.current = null;
    }
  };

  const isPending = () => !!timerRef.current;

  return { debouncedFn, cancel, flush, isPending };
}
