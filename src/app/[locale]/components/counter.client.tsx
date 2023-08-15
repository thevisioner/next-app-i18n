"use client";

import { useCallback, useState } from "react";
import styles from "./counter.module.css";

interface CounterProps {
  messages: Record<string, string>;
}

export default function Counter({ messages }: CounterProps) {
  const [count, setCount] = useState(0);

  const increment = useCallback(
    (delta: number) => () => {
      setCount(count + delta);
    },
    [count]
  );

  return (
    <div>
      <p>This component is rendered on the client</p>

      <div className={styles.counter}>
        <button type="button" onClick={increment(-1)}>
          {messages.decrement}
        </button>

        <output>{count}</output>

        <button type="button" onClick={increment(+1)}>
          {messages.increment}
        </button>
      </div>
    </div>
  );
}
