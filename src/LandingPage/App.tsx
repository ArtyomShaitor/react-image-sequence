import {CSSProperties, forwardRef, RefObject, useImperativeHandle, useRef} from "react";
import {ScrollTrigger, Timeline, Tween} from "react-gsap";
import {getDonutImageUrl} from './utils';
import ImageSequence from '../ImageSequence';
import {usePreloadImages} from '../ImageSequence/hooks';
import {Headline, HeroHeadline, Strong, Text, textDefaults} from "./Components/Text";
import {Container, Flex, HeroBlock} from "./Components/Layout";
import {Badge} from "./Components/Badge";
import {Step} from "./Components/Step";


const usePreloadDonut = () => usePreloadImages(getDonutImageUrl, 1, 124);

const imageSequenceStyle = {
  position: 'fixed',
  top: 0,
  zIndex: 10,
} as CSSProperties;

const containerStyle = {
  height: '350vh',
  position: 'relative',
} as CSSProperties;

const WowBlock = forwardRef((props, ref) => {
  const wowTitle = useRef(null);
  const wowContent = useRef(null);
  const trigger = useRef(null);

  useImperativeHandle(ref, () => ({
    wowTitle,
    wowContent,
    wowTrigger: trigger,
  }));

  return (
    // @ts-ignore
    <div ref={trigger}>
      <Headline ref={wowTitle} marginBottom="3rem" left="20px" paddingTop="100px">
        Wow, right?
      </Headline>
      <Flex w="100%" dir="row" ref={wowContent}>
        <Flex grow={1} basis={0} paddingRight="110px">
          <Text
            lineHeight={textDefaults.lineHeight.text}
            size={textDefaults.size.bigger}
            marginBottom="30px"
          >
            With the library, you can effortlessly transform your images into seamless
            animations for your React application <Strong>in just 3 simple steps:</Strong>
          </Text>
          <Flex rowGap="15px">
            <Step
              step={1}
              stepColor="#FFB2ED"
              title="Preload the images"
              body="You can do it in a way you want. If you don’t care use the `usePreloadImages` hook from the package"
            />
            <Step
              step={2}
              stepColor="#B2D1FF"
              title="Set up the container"
              body="Use a tall div container for scrolling and let the library handle animation frames based on scroll percentage"
            />
            <Step
              step={3}
              stepColor="#B2FFDF"
              title="> npm start"
              body="Yeah, it’s actually only 2 steps."
            />
          </Flex>
        </Flex>
        <Flex grow={1} basis={0} paddingLeft="110px">Kek</Flex>
      </Flex>
    </div>
  )
});

// export default function App() {
//   const {
//     isLoading: isDonutLoading,
//     images: donutImages,
//   } = usePreloadDonut();
//
//   const containerRef2 = useRef(null) as RefObject<HTMLDivElement>;
//
//   if (isDonutLoading) {
//     return <div className="container white">Loading ...</div>;
//   }
//
//   return (
//     <>
//       <div ref={containerRef2} className="container" style={containerStyle}>
//         {/*<ImageSequence*/}
//         {/*  targetRef={containerRef2}*/}
//         {/*  images={donutImages}*/}
//         {/*  isFullPage*/}
//         {/*  style={imageSequenceStyle}*/}
//         {/*/>*/}
//         <HeroBlock>
//           <Flex align="center" justify="center">
//             <ScrollTrigger
//               start="top 100px"
//               end="+=200px"
//               scrub={0.5}
//             >
//               <Tween to={{ opacity: 0, y: '+=15px' }} stagger={0.2}>
//                 <Flex align="center" marginBottom="9rem">
//                   <Badge>
//                     <Text
//                       color="inherit"
//                       size={textDefaults.size.smaller}
//                       weight={textDefaults.weight.extraBold}
//                       textTransform="uppercase"
//                       spacing="0.25rem"
//                     >
//                       React component
//                     </Text>
//                   </Badge>
//                   <HeroHeadline>
//                     react-image-sequence
//                   </HeroHeadline>
//                 </Flex>
//                 <Text>
//                   Scroll to 🪄
//                 </Text>
//               </Tween>
//             </ScrollTrigger>
//           </Flex>
//         </HeroBlock>
//         <Container
//           position="sticky"
//           top={0}
//           dir="column"
//           bgColor="#0D0D0D"
//           minH="100vh"
//         >
//           <ScrollTrigger
//             trigger="wowTrigger"
//             start="top center"
//             style={{ zIndex: 0 }}
//             end="+=1000px"
//             scrub={0.5}
//             markers
//           >
//             <Timeline target={<WowBlock />}>
//               <Tween
//                 from={{
//                   opacity: 1,
//                   xPercent: -50,
//                   yPercent: -50,
//                   left:"50%",
//                   top:"50%",
//                   marginTop: "-100px",
//                   transformOrigin: "center",
//                   position: 'absolute',
//                   scale: 2,
//                 }}
//                 target="wowTitle"
//               />
//               <Tween
//                 from={{ opacity: 0, y: '+=15px' }}
//                 target="wowContent"
//               />
//             </Timeline>
//           </ScrollTrigger>
//         </Container>
//       </div>
//     </>
//   );
// }

export default function App() {
  const {
    isLoading: isDonutLoading,
    images: donutImages,
  } = usePreloadDonut();

  const containerRef2 = useRef(null) as RefObject<HTMLDivElement>;

  if (isDonutLoading) {
    return <div className="container white">Loading ...</div>;
  }

  return (
    <>
      <div ref={containerRef2} className="container" style={containerStyle}>
        <div id="#hero-block-anchor-trigger" />
        <ImageSequence
          targetRef={containerRef2}
          images={donutImages}
          isFullPage
          style={imageSequenceStyle}
        />
        <HeroBlock id="hero-block-anchor-pin">
          <Flex align="center" justify="center">
            <ScrollTrigger
              trigger="#hero-block-anchor-trigger"
              start="top top"
              end="+=200px"
              scrub={0.5}
              pin="#hero-block-anchor-pin"
              markers
            >
              <Tween to={{ opacity: 0, y: '+=15px' }} stagger={0.2}>
                <Flex align="center" marginBottom="9rem">
                  <Badge>
                    <Text
                      color="inherit"
                      size={textDefaults.size.smaller}
                      weight={textDefaults.weight.extraBold}
                      textTransform="uppercase"
                      spacing="0.25rem"
                    >
                      React component
                    </Text>
                  </Badge>
                  <HeroHeadline>
                    react-image-sequence
                  </HeroHeadline>
                </Flex>
                <Text>
                  Scroll to 🪄
                </Text>
              </Tween>
            </ScrollTrigger>
          </Flex>
        </HeroBlock>
        <WowBlock />
      </div>
    </>
  )
}
