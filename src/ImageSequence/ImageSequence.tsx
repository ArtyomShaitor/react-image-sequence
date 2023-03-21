import {
  HTMLAttributes,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {drawImageScaled} from "./draw-utils";
import {ImageScale, Position} from "./types";
import CSS from "./ImageSequence.module.css";
import {classNames} from "./utils";
import {useEventListener} from "./hooks";

type CanvasSize = {
  w: number;
  h: number;
}

interface StyleProps {
  isFullPage?: boolean;
  isSticky?: boolean;
  isLol?: boolean;
}

export interface ImageSequenceProps extends StyleProps {
  targetRef: RefObject<HTMLElement>,
  images: HTMLImageElement[];
  position?: Position;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  style?: HTMLAttributes<HTMLDivElement>["style"];
  imageScale?: ImageScale;
}

const classes = classNames(CSS.imageSequenceContainer, {
  isFullPage: CSS.fullPage,
  isSticky: CSS.sticky,
});

const getFrame = (from: number, to: number, percent: number) => {
  const delta = to - from;
  return Math.floor(delta * percent) + from;
};

const fromZero2One = (value: number) => Math.max(0, Math.min(value, 1));
const getPercentageOfScrollY = (element: HTMLElement) => {
  const elementHeight = element.offsetHeight;
  const scrollPosition = (window.pageYOffset || window.scrollY) + window.innerHeight;
  const elementOffsetTop = element.offsetTop;
  const distance = scrollPosition - elementOffsetTop;
  return fromZero2One(distance / elementHeight);
}

const drawListener = (
  imageScale: ImageScale,
  position: Position,
  images: HTMLImageElement[],
  percent: number,
  ctx: CanvasRenderingContext2D
) => () => {
  const frame = getFrame(0, images.length - 1, percent);
  drawImageScaled(images[frame], ctx, position, imageScale);
}

const ImageSequence = memo(function ImageSequence(props: ImageSequenceProps) {
  const {
    imageScale = "cover",
    targetRef,
    images,
    position = "center",
    className = "",
    style,
    isFullPage,
    isSticky,
  } = props;

  const containerRef = useRef(null) as RefObject<HTMLDivElement>;
  const canvasRef = useRef(null) as RefObject<HTMLCanvasElement>;
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ w: 0, h: 0 });

  const containerClassName = useMemo(
    () => classes({ isFullPage, isSticky }, className),
    [isFullPage, isSticky, className]
  );

  // Get context
  const ctx = useMemo(() => {
    return canvasRef.current?.getContext("2d");
  }, [canvasRef.current]);

  // Function for updating canvas size
  const updateCanvasSize = useCallback(
    () => {
      const {
        width,
        height
      } = (containerRef.current as HTMLElement).getBoundingClientRect();
      setCanvasSize({ w: width, h: height });
    },
    []
  );

  // Draw function
  const draw = useCallback(
    () => {
      if (!ctx) {
        return;
      }

      const percent = getPercentageOfScrollY(targetRef.current as HTMLElement);
      requestAnimationFrame(drawListener(imageScale, position, images, percent, ctx));
    },
    [imageScale, position, images, ctx]
  );

  // Change targetRef position to `relative` in case if it's `static`
  useEffect(
    () => {
      const position = window.getComputedStyle(targetRef.current as HTMLElement).getPropertyValue("position")
      if (position === 'static') {
        const previousPosition = (targetRef.current as HTMLElement).style.position;
        (targetRef.current as HTMLElement).style.position = 'relative';

        return () => (targetRef.current as HTMLElement).style.position = previousPosition;
      }

      return () => {}
    },
    []
  )

  // Set correct canvas size on component render
  useEffect(() => {
    updateCanvasSize();
    draw();
  }, []);

  // Add scroll event and calculate current frame
  useEventListener('scroll', draw);

  // Update canvas size on window resize
  useEventListener('resize', function() {
    updateCanvasSize();
    draw();
  });

  return (
    <div
      style={style}
      ref={containerRef}
      className={containerClassName}
    >
      <canvas width={canvasSize.w} height={canvasSize.h} ref={canvasRef} />
    </div>
  );
});

export { ImageSequence };
