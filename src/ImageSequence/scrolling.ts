import {PositionDetector} from "./types";

const _0to1 = (value: number) => Math.max(0, Math.min(value, 1));

/**
 * Position detector that begins to animate frames when container intersects the viewport
 * @param {number} offsetTop
 */
export const intersectViewport = (offsetTop: number = 0): PositionDetector => container => {
  const elementHeight = container.offsetHeight - offsetTop;
  const scrollPosition = (window.pageYOffset || window.scrollY) + window.innerHeight;
  const elementOffsetTop = container.offsetTop + offsetTop;
  const distance = scrollPosition - elementOffsetTop;

  return _0to1(distance / elementHeight);
}

export const defaultIntersectViewport = intersectViewport(0);

/**
 * Position detector that begins to animate frames when container is on top of the viewport
 * @param {HTMLElement} container
 * @param {HTMLElement} element
 */
export const fullView: PositionDetector = (container, element) => {
  const containerHeight = container.offsetHeight; // container height
  const elementHeight = element.offsetHeight; // element height
  const scrollPosition = (window.pageYOffset || window.scrollY) // scroll from the top;
  const containerOffsetTop = container.offsetTop; // actual top position of the container

  const distance = scrollPosition - containerOffsetTop;
  const limit = containerHeight - elementHeight;

  return _0to1(distance / limit)
}
