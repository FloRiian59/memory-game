import { useEffect, useRef, useState } from "react";

export default function Timer({ isRunning, onTimeChange, resetTrigger }) {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    setTime(0);
  }, [resetTrigger]);

  useEffect(() => {
    onTimeChange?.(time);
  }, [time, onTimeChange]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return <div className="game-chrono">{formatTime(time)}</div>;
}
