import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

export interface SmoothScrollProps {
  duration: number;
  offsetTop?: number;
  children: (percent: number) => ReactNode;
}

const fixedStyle = {
  position: "sticky",
  top: 0
};

export function SmoothScroll(props: SmoothScrollProps) {
  const containerRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const { children, offsetTop = 0 } = props;

  useEffect(() => {
    const listener = function () {
      const { top, height } = containerRef.current.getBoundingClientRect();
      const { clientHeight } = document.documentElement;

      requestAnimationFrame(() => {
        const raw = -(top - offsetTop) / (height + offsetTop - clientHeight);
        const percent = Math.min(Math.max(0, raw), 1);

        setPercent(percent);
      });
    };

    document.addEventListener("scroll", listener);

    return () => document.removeEventListener("scroll", listener);
  }, []);

  const containerStyle = useMemo(
    () => ({
      height: `${props.duration}px`,
      position: "relative"
    }),
    [props.duration]
  );

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={fixedStyle}>{children(percent)}</div>
    </div>
  );
}
