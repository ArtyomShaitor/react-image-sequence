import {
  HTMLAttributes,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState, CSSProperties
} from "react";
import {drawImageScaled} from "./draw-utils";
import {PositionDetector, ImageScale, Position} from "./types";
import CSS from "./ImageSequence.module.css";
import {classNames} from "./utils";
import {useEventListener} from "./hooks";
import {fullView } from './scrolling';

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
  percent?: number;
  animationStart?: number | CSSProperties['height'];
  scrollingDetector?: PositionDetector
}

const classes = classNames(CSS.imageSequenceContainer, {
  isFullPage: CSS.fullPage,
  isSticky: CSS.sticky,
});

const getFrame = (from: number, to: number, percent: number) => {
  const delta = to - from;
  return Math.floor(delta * percent) + from;
};

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
  console.log('ImageSequence render');
  const {
    targetRef,
    images,
    className = "",
    style,
    isFullPage,
    isSticky,
    percent: percentProp,
    position = "center",
    imageScale = "cover",
    scrollingDetector = fullView,
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
      if (canvasSize.w !== width || canvasSize.h !== height) {
        setCanvasSize({w: width, h: height});
      }
    },
    [canvasSize.w, canvasSize.h]
  );

  // Draw function
  const draw = useCallback(
    () => {
      if (!ctx) {
        return;
      }

      const percent = percentProp || scrollingDetector(targetRef.current as HTMLElement, containerRef.current as HTMLElement);
      requestAnimationFrame(drawListener(imageScale, position, images, percent, ctx));
    },
    [imageScale, position, images, ctx, percentProp, scrollingDetector]
  );

  // Set correct canvas size on component render
  useEffect(() => {
    updateCanvasSize();
    draw();
  }, [ctx]);

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
