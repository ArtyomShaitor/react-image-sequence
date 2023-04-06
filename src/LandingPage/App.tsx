import {
  CSSProperties,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import {ScrollTrigger, Timeline, Tween} from "react-gsap";
import {getDonutImageUrl} from './utils';
import ImageSequence, { usePreloadImages } from '../ImageSequence';
import {Headline, HeroHeadline, Strong, Text, textDefaults} from "./Components/Text";
import {BackgroundScrollContainer, Container, Div, Flex, Grid, HeroBlock} from "./Components/Layout";
import {Badge} from "./Components/Badge";
import {Step} from "./Components/Step";
import {CodeExample} from "./Components/CodeExample";


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

const WowBlockTarget = forwardRef((props: { step: number }, ref) => {
  const wowTitle = useRef(null);
  const wowText = useRef(null);
  const wowExample = useRef(null);
  const wowStep1 = useRef(null);
  const wowStep2 = useRef(null);
  const wowStep3 = useRef(null);
  const wowTrigger = useRef(null);

  const { step } = props;

  useImperativeHandle(ref, () => ({
    wowTitle,
    wowText,
    wowExample,
    wowStep1,
    wowStep2,
    wowStep3,
    wowTrigger,
  }));

  return (
    <>
      <Headline
        ref={wowTitle}
        marginTop={0}
        top="100px"
        marginBottom="3rem"
        position="absolute"
      >
        Wow, right?
      </Headline>
      <Div paddingTop="6.5rem" />
      <Grid templateColumns="1fr 1fr" gap="60px">
        <Div>
          <Flex maxW={480}>
            <Text
              ref={wowText}
              lineHeight={textDefaults.lineHeight.text}
              size={textDefaults.size.bigger}
              marginBottom="30px"
              w="100%"
            >
              With the library, you can effortlessly transform your images into seamless
              animations for your React application <Strong>in just 3 simple steps:</Strong>
            </Text>
            <Flex rowGap="15px" w="100%">
              <Step
                ref={wowStep1}
                step={1}
                stepColor="#FFB2ED"
                title="Preload images"
                body="You can do it in a way you want. If you don’t care use the `usePreloadImages` hook from the package"
                isActive={step === 1}
              />
              <Step
                ref={wowStep2}
                step={2}
                stepColor="#B2D1FF"
                title="Set up the container"
                body="Use a tall div container for scrolling and let the library handle animation frames based on scroll percentage"
                isActive={step === 2}
              />
              <Step
                ref={wowStep3}
                step={3}
                stepColor="#B2FFDF"
                title="> npm start"
                body="Yeah, it’s actually only 2 steps."
                isActive={step === 3}
              />
            </Flex>
          </Flex>
        </Div>
        <Div
          ref={wowExample}
          position="relative"
        >
          <CodeExample step={step} />
        </Div>
      </Grid>
    </>
  )
});

const WowBlock = () => {
  const [step, setStep] = useState(1);

  return (
    <ScrollTrigger
      trigger="#wow-block-trigger"
      start="300px top"
      end="+=9500px"
      scrub={0.2}
    >
      <Timeline target={<WowBlockTarget step={step}/>}>
        <Tween
          from={{
            opacity: 1,
            xPercent: -50,
            yPercent: -50,
            left:"50%",
            top:"50%",
            transformOrigin: "center",
            position: 'absolute',
            scale: 2,
            delay: 0
          }}
          duration={2}
          target="wowTitle"
        />
        <Tween from={{ opacity: 0, delay: 0, y: '+=15px' }} target="wowText" duration={2} />
        <Tween from={{ opacity: 0, delay: 0, y: '+=15px' }} target="wowExample" position="-=2"/>
        {/* @ts-ignore */}
        <Tween from={{ opacity: 0, delay: 1, y: '+=15px' }} target="wowStep1" onStart={() => setStep(1)}/>
        {/* @ts-ignore */}
        <Tween from={{ opacity: 0, delay: 10, y: '+=15px' }} target="wowStep2" onStart={() => setStep(2)}/>
        {/* @ts-ignore */}
        <Tween from={{ opacity: 0, delay: 10, y: '+=15px' }} target="wowStep3" onStart={() => setStep(3)}/>
        <Tween from={{ delay: 1 }} target="wowStep3" onComplete={() => setStep(0)}/>
      </Timeline>
    </ScrollTrigger>
  );
}

export default function App() {
  const {
    isLoading: isDonutLoading,
    images: donutImages,
  } = usePreloadDonut();

  const containerRef2 = useRef(null) as RefObject<HTMLDivElement>;
  const heroBlockRef = useRef() as RefObject<HTMLDivElement>;

  if (isDonutLoading) {
    return <div className="container white">Loading ...</div>;
  }

  return (
    <>
      <div ref={containerRef2} className="container" style={containerStyle}>
        <ImageSequence
          targetRef={containerRef2}
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
                  Scroll to 🪄
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
