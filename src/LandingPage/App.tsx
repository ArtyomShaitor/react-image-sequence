import {CSSProperties, RefObject, useRef} from "react";
import {ScrollTrigger, Tween} from "react-gsap";
import {getDonutImageUrl} from './utils';
import ImageSequence, {usePreloadImages} from '../ImageSequence';
import {HeroHeadline, Text, textDefaults} from "./Components/Text";
import {BackgroundScrollContainer, Container, Div, Flex, HeroBlock} from "./Components/Layout";
import {Badge} from "./Components/Badge";
import {WowBlock} from "./Components/WowBlock";


const usePreloadDonut = () => usePreloadImages(getDonutImageUrl, 1, 124);

const imageSequenceStyle = {
  position: 'fixed',
  top: 0,
  zIndex: 10,
} as CSSProperties;

const containerStyle = {
  height: '600vh',
  position: 'relative',
} as CSSProperties;

export default function App() {
  const {
    isLoading: isDonutLoading,
    images: donutImages,
  } = usePreloadDonut();

  const heroContainerRef = useRef(null) as RefObject<HTMLDivElement>;
  const heroBlockRef = useRef() as RefObject<HTMLDivElement>;

  if (isDonutLoading) {
    return <div className="container white">Loading ...</div>;
  }

  return (
    <>
      <div ref={heroContainerRef} className="container" style={containerStyle}>
        <ImageSequence
          targetRef={heroContainerRef}
          images={donutImages}
          isFullPage
          style={imageSequenceStyle}
        />
      </div>
      <BackgroundScrollContainer id="hero-block-anchor-pin">
        <HeroBlock
          ref={heroBlockRef}
          id="#hero-block-anchor-trigger"
          position="sticky"
          top={0}
        >
          <Flex align="center" justify="center">
            <ScrollTrigger
              trigger="#hero-block-anchor-pin"
              start="top top"
              end="+=200px"
              scrub={0.5}
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
                  Scroll for 🪄
                </Text>
              </Tween>
            </ScrollTrigger>
          </Flex>
        </HeroBlock>
        <Div
          height="13000px"
          id="wow-block-trigger"
        >
          <Container
            position="sticky"
            paddingTop="100px"
            h="100vh"
            top={0}
          >
            <WowBlock />
          </Container>
        </Div>
      </BackgroundScrollContainer>
    </>
  )
}
