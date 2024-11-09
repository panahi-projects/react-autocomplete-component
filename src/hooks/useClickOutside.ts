import { useEffect, useRef, useCallback } from "react";

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
}

export default useClickOutside;
