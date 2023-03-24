import {CSSProperties, RefObject, useRef } from "react";
import "./styles.css";
import {getImageUrl, getDanceImageUrl, getDonutImageUrl} from "./utils";
import { SmoothScroll, Sticky } from "./SmoothScroll";
import ImageSequence, { scrollDetectors } from "./ImageSequence";
import {usePreloadImages} from "./ImageSequence/hooks";


const style = { backgroundImage: `url(${getImageUrl(0)}` };

const scrollingDetector = scrollDetectors.defaultIntersectViewport;

const usePreloadAirpods = () => usePreloadImages(getImageUrl, 0, 64);
const usePreloadDance = () => usePreloadImages(getDanceImageUrl, 0, 215);
const usePreloadDonut = () => usePreloadImages(getDonutImageUrl, 1, 124);

const containerStyle = {
  height: '250vh',
} as CSSProperties;

export default function App() {
  const { isLoading, images } = usePreloadAirpods();
  const {
    isLoading: isDanceLoading,
    images: danceImages
  } = usePreloadDance();

  const {
    isLoading: isDonutLoading,
    images: donutImages,
  } = usePreloadDonut();

  const firstContainerRef = useRef(null) as RefObject<HTMLDivElement>;
  const containerRef = useRef(null) as RefObject<HTMLDivElement>;
  const containerRef2 = useRef(null) as RefObject<HTMLDivElement>;

  if (isLoading || isDanceLoading || isDonutLoading) {
    return <div className="container white">Loading ...</div>;
  }

  return (
    <>
      <div ref={containerRef2} className="container orange no-p" style={containerStyle}>
        <ImageSequence
          targetRef={containerRef2}
          images={donutImages}
          isFullPage
          isSticky
        />
      </div>
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
          scrollingDetector={scrollingDetector}
        />
      </div>
      <div className="container black" style={style}>
        <h1>Lol kek</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </>
  );
}
