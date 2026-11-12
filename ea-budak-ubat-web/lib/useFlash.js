import { useCallback, useEffect, useRef, useState } from "react";

// A value that shows for `durationMs` and then resets to `idle`.
// One timer per hook: flashing again restarts it, and unmounting clears it,
// so a quick second click never has its label cleared by the first click's timer.
export function useFlash(durationMs, idle = null) {
  const [value, setValue] = useState(idle);
  const timerRef = useRef(null);

  const flash = useCallback(
    (next) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setValue(next);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setValue(idle);
      }, durationMs);
    },
    [durationMs, idle]
  );

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setValue(idle);
  }, [idle]);

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

  return [value, flash, reset];
}
