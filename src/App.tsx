import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { getImageUrl, getDanceImageUrl } from "./utils";
import { SmoothScroll } from "./SmoothScroll";
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

export default function App() {
  const [isLoading, images] = usePreloadAirpods();
  const [isDanceLoading, danceImages] = usePreloadDance();

  if (isLoading || isDanceLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="container white" style={style}>
        <h1>Lol kek</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <SmoothScroll duration={3000}>
        {(percent) => {
          const opacity1 = percent ** 3;
          const opacity2 = -((percent * 1.5) ** 3) + 1;

          const transform = `scale(${1 + Math.min(opacity1, 1.2)})`;

          return (
            <div className="black" style={{ position: "relative" }}>
              <div className="container flex">
                <h1 style={{ opacity: opacity1, transform }}>
                  Hello CodeSandbox
                </h1>
                <h2 style={{ opacity: opacity2 }}>
                  Start editing to see some magic happen!
                </h2>
                <ImageSequence
                  className="custom-sequence"
                  images={images}
                  percent={percent}
                  position="top"
                  imageScale="contain"
                />
              </div>
            </div>
          );
        }}
      </SmoothScroll>
      <SmoothScroll duration={15000}>
        {(percent) => {
          return (
            <div
              className="container white no-p"
              style={{ position: "relative" }}
            >
              <ImageSequence
                style={{ height: "100%" }}
                images={danceImages}
                percent={percent}
                position="top"
              />
            </div>
          );
        }}
      </SmoothScroll>
      <div className="container black" style={style}>
        <h1>Lol kek</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </>
  );
}
