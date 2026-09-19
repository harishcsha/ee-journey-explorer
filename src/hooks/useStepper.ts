import { useEffect, useState } from 'react';

/**
 * Step index with optional autoplay. `resetKey` sends the stepper back to the
 * first step (for example when the user switches journeys).
 */
export function useStepper(length: number, resetKey: string, delayMs = 3800) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [resetKey]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (index < length - 1) setIndex(index + 1);
      else setPlaying(false);
    }, delayMs);
    return () => clearTimeout(t);
  }, [playing, index, length, delayMs]);

  const idx = Math.min(index, length - 1);

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (idx >= length - 1) setIndex(0);
    setPlaying(true);
  };

  const go = (i: number) => {
    setPlaying(false);
    setIndex(i);
  };

  return { idx, playing, toggle, go };
}
