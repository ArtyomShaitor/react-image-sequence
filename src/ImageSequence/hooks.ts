import {useEffect, useRef, useState} from "react";

export const useEventListener = (
  event: keyof WindowEventMap,
  listener: EventListener,
  element = window
) => {
  const listenerRef = useRef<EventListener>(() => {});

  useEffect(
    () => {
      listenerRef.current = listener;
    },
    [listener]
  );

  useEffect(
    () => {
      if (!element.addEventListener) {
        return;
      }

      const eventListener = (event: Event) => {
        listenerRef.current(event);
      }

      element.addEventListener(event, eventListener);

      return () => {
        element.removeEventListener(event, eventListener)
      }
    },
    [event, element]
  )
};

export const usePreloadImages = (getUrl: (frame: number) => string, from: number, to: number) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const images = Array.from({ length: (to - from) + 1 }).map((_, index) => {
      const image = new Image();
      image.src = getUrl(index + from);

      return image;
    });

    const requests = images.map(
      (image) =>
        new Promise((resolve, reject) => {
          image.onload = function () {
            resolve(image);
          };

          image.onerror = function(error) {
            reject(error);
          }
        })
    );

    Promise
      .all(requests)
      .then(() => setImages(images))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { isLoading, images, error } as const;
};
