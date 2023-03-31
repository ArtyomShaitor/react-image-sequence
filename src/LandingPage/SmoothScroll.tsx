import {
  CSSProperties, HTMLAttributes,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef, useCallback,
} from "react";

export interface SmoothScrollProps {
  duration: number;
  offsetTop?: number;
  children: (percent: number) => ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export interface StickyProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

const fixedStyle = {
  position: "sticky",
  top: 0
} as CSSProperties;

const useMultipleRefs = (...refs: any[]) => {
  return useCallback(
    (node: any) => {
      refs.forEach(ref => {
        ref.current = node
      })
    },
    []
  );
}

export const SmoothScroll = forwardRef((props: SmoothScrollProps, ref) => {
  const containerRef = useRef(null) as RefObject<HTMLDivElement>;
  const [percent, setPercent] = useState(0);
  const { children, offsetTop = 0, className = '' } = props;

  const multipleRef = useMultipleRefs(ref, containerRef);

  useEffect(() => {
    const listener = function () {
      const { top, height } = (containerRef.current as HTMLDivElement).getBoundingClientRect();
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      requestAnimationFrame(() => {
        const raw = -(top - offsetTop) / (height + offsetTop - clientHeight);
        const percent = Math.min(Math.max(0, raw), 1);

        setPercent(percent);
      });
    };

    document.addEventListener("scroll", listener);

    return () => document.removeEventListener("scroll", listener);
  }, []);

  const containerStyle = useMemo<CSSProperties>(
    () => ({
      height: `${props.duration}px`,
      position: "relative"
    }),
    [props.duration]
  );

  return (
    <div ref={multipleRef} style={containerStyle} className={className}>
      {children(percent)}
    </div>
  );
});

export const Sticky = forwardRef(({ children, className = '', style: _style }: StickyProps, ref) => {
  const style = useMemo(
    () => ({
      ...fixedStyle,
      ..._style,
    }),
    [_style]
  );

  // @ts-ignore
  return (<div ref={ref} className={`sticky ${className}`} style={style}>{children}</div>)
});
