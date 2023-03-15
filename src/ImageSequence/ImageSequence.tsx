import {
  cloneElement,
  HTMLAttributes,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { getCoordsByType, getScaledImageSize } from "./draw-utils";
import { Position } from "./types";

export interface ImageSequenceProps {
  percent: number;
  images: HTMLImageElement[];
  position?: Position;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  style?: HTMLAttributes<HTMLDivElement>["style"];
  imageScale: "cover" | "contain";
}

const getFrame = (from: number, to: number, percent: number) => {
  const delta = to - from;
  return Math.floor(delta * percent) + from;
};

function drawImageScaled(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  position: Position,
  imageScale: "cover" | "contain"
) {
  const { canvas } = ctx;
  // Calculate the new dimensions of the image
  let { width: newImgWidth, height: newImgHeight } = getScaledImageSize(
    img,
    ctx,
    imageScale === "cover" ? (a, b) => a < b : (a, b) => a > b
  );

  // Calculate the position of the image in the center of the canvas
  const { x, y } = getCoordsByType(canvas, newImgWidth, newImgHeight, position);

  // Draw the image onto the canvas at the center
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, newImgWidth, newImgHeight);
}

function listener(
  imageScale: ImageSequenceProps["imageScale"],
  position: Position,
  images: HTMLImageElement[],
  percent: number,
  ctx: CanvasRenderingContext2D
) {
  return function () {
    const frame = getFrame(0, images.length - 1, percent);
    drawImageScaled(images[frame], ctx, position, imageScale);
  };
}

export function ImageSequence(props: ImageSequenceProps) {
  const {
    imageScale = "cover",
    percent,
    images,
    position = "center",
    className = "",
    style
  } = props;
  const containerRef = useRef(null) as RefObject<HTMLDivElement>;
  const canvasRef = useRef(null) as RefObject<HTMLCanvasElement>;
  const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0
  });

  const ctx = useMemo(() => {
    return canvasRef.current?.getContext("2d");
  }, [canvasRef.current]);

  useEffect(() => {
    if (!ctx) {
      return;
    }

    requestAnimationFrame(listener(imageScale, position, images, percent, ctx));
  }, [imageScale, percent, ctx, canvasSize]);

  useEffect(() => {
    const {
      width,
      height
    } = (containerRef.current as HTMLElement).getBoundingClientRect();
    setCanvasSize({ w: width, h: height });
  }, []);

  useEffect(() => {
    const resizeListener = function () {
      const {
        width,
        height
      } = (containerRef.current as HTMLElement).getBoundingClientRect();
      setCanvasSize({ w: width, h: height });
    };

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  const { w, h } = canvasSize;

  return (
    <div
      ref={containerRef}
      style={style}
      className={`image-sequence-container ${className}`}
    >
      <canvas width={w} height={h} ref={canvasRef} />
    </div>
  );
}
