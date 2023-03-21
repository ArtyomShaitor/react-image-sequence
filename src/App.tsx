import {CSSProperties, RefObject, useEffect, useRef, useState} from "react";
import "./styles.css";
import { getImageUrl, getDanceImageUrl } from "./utils";
import { SmoothScroll, Sticky } from "./SmoothScroll";
import ImageSequence from "./ImageSequence";

const usePreloadImages = (getUrl: any, maxCount: number) => {
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const images = Array.from({ length: maxCount + 1 }).map((_, index) => {
      const image = new Image();
      image.src = getUrl(index);

      return image;
    });

    setImages(images);

    const requests = images.map(
      (image) =>
        new Promise((resolve) => {
          image.onload = function () {
            resolve(image);
          };
        })
    );

    Promise.all(requests).finally(() => setLoading(false));
  }, []);

  return [isLoading, images] as [boolean, HTMLImageElement[]];
};

const style = { backgroundImage: `url(${getImageUrl(0)}` };

const usePreloadAirpods = () => usePreloadImages(getImageUrl, 64);
const usePreloadDance = () => usePreloadImages(getDanceImageUrl, 215);

const containerStyle = {
  height: '300vh',
} as CSSProperties;

export default function App() {
  const [isLoading, images] = usePreloadAirpods();
  const [isDanceLoading, danceImages] = usePreloadDance();
  const firstContainerRef = useRef(null) as RefObject<HTMLDivElement>;
  const containerRef = useRef(null) as RefObject<HTMLDivElement>;

  if (isLoading || isDanceLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="container white" style={style}>
        <h1>Lol kek</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <SmoothScroll duration={3000} className="black" ref={firstContainerRef}>
        {(percent) => {
          const opacity1 = percent ** 3;
          const opacity2 = -((percent * 1.5) ** 3) + 1;

          const transform = `scale(${1 + Math.min(opacity1, 1.2)})`;

          return (
            <>
              <Sticky>
                <div className="container flex">
                  <ImageSequence
                    targetRef={firstContainerRef}
                    images={images}
                    position="top"
                    imageScale="contain"
                    isFullPage
                  />
                  <h1 style={{ opacity: opacity1, transform }}>
                    Hello CodeSandbox
                  </h1>
                  <h2 style={{ opacity: opacity2 }}>
                    Start editing to see some magic happen!
                  </h2>
                </div>
              </Sticky>
            </>
          );
        }}
      </SmoothScroll>
      <div ref={containerRef} className="container white no-p" style={containerStyle}>
        <ImageSequence
          targetRef={containerRef}
          images={danceImages}
          isFullPage
          isSticky
        />
      </div>
      <div className="container black" style={style}>
        <h1>Lol kek</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </>
  );
}
