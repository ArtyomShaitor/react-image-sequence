import {ImageScale, Position} from "./types";

export function getScaledImageSize(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  compare: (a: number, b: number) => boolean
): { width: number; height: number } {
  const { canvas } = ctx;
  const imgWidth = img.width,
    imgHeight = img.height,
    canvasWidth = canvas.width,
    canvasHeight = canvas.height;

  // Calculate the aspect ratios of the image and the canvas
  const imgAspectRatio = imgWidth / imgHeight;
  const canvasAspectRatio = canvasWidth / canvasHeight;

  // Calculate the scaling factor based on which dimension is larger
  var scaleFactor = compare(imgAspectRatio, canvasAspectRatio)
    ? canvasWidth / imgWidth
    : canvasHeight / imgHeight;

  // Calculate the new dimensions of the image
  var newImgWidth = imgWidth * scaleFactor;
  var newImgHeight = imgHeight * scaleFactor;

  return { width: newImgWidth, height: newImgHeight };
}

type CoordsGetter = (cD: number, iD: number) => number;

const startCoord: CoordsGetter = () => 0;
const middleCoord: CoordsGetter = (cD, iD) => (cD - iD) / 2;
const endCoord: CoordsGetter = (cD, iD) => cD - iD;

const POSITIONS_MAP: Record<string, CoordsGetter> = {
  left: startCoord,
  center: middleCoord,
  right: endCoord,
  top: startCoord,
  bottom: endCoord
};

export function getCoordsByPosition(
  canvas: HTMLCanvasElement,
  imgWidth: number,
  imgHeight: number,
  type: Position
) {
  let _type = type as string;
  if (!type.includes("-")) {
    _type =
      type === "bottom" || type === "top" ? `center-${type}` : "center-center";
  }

  let [posByX, posByY] = _type.split("-");

  const x = POSITIONS_MAP[posByX](canvas.width, imgWidth);
  const y = POSITIONS_MAP[posByY](canvas.height, imgHeight);

  return { x, y };
}

export function drawImageScaled(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  position: Position,
  imageScale: ImageScale
) {
  const { canvas } = ctx;
  // Calculate the new dimensions of the image
  let { width: newImgWidth, height: newImgHeight } = getScaledImageSize(
    img,
    ctx,
    imageScale === "cover" ? (a, b) => a < b : (a, b) => a > b
  );

  // Calculate the coords of the image by the provided position
  const { x, y } = getCoordsByPosition(canvas, newImgWidth, newImgHeight, position);

  // Draw the image onto the canvas at the center
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, newImgWidth, newImgHeight);
}
