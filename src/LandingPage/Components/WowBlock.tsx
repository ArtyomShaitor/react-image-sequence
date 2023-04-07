import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Code, Headline, Strong, Text, textDefaults} from "./Text";
import {Div, Flex, Grid} from "./Layout";
import {Step} from "./Step";
import {CodeExample} from "./CodeExample";
import {ScrollTrigger, Timeline, Tween} from "react-gsap";

const WowBlockTarget = forwardRef((props: { step: number }, ref) => {
  const wowTitle = useRef(null);
  const wowText = useRef(null);
  const wowExample = useRef(null);
  const wowStep1 = useRef(null);
  const wowStep2 = useRef(null);
  const wowStep3 = useRef(null);
  const wowTrigger = useRef(null);

  const {step} = props;

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
      <Div paddingTop="6.5rem"/>
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
              With the <Strong>react-image-sequence</Strong>, you can effortlessly transform your images into seamless
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
          <CodeExample step={step}/>
        </Div>
      </Grid>
    </>
  )
});
export const WowBlock = () => {
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
            left: "50%",
            top: "50%",
            transformOrigin: "center",
            position: 'absolute',
            scale: 2,
            delay: 10
          }}
          duration={4}
          target="wowTitle"
        />
        <Tween from={{opacity: 0, delay: 0, y: '+=15px'}} target="wowText" duration={2}/>
        <Tween from={{opacity: 0, delay: 0, y: '+=15px'}} target="wowExample" position="-=2" duration={2}/>
        {/* @ts-ignore */}
        <Tween from={{opacity: 0, delay: 1, y: '+=15px'}} target="wowStep1" onComplete={() => setStep(1)}/>
        {/* @ts-ignore */}
        <Tween from={{opacity: 0, delay: 10, y: '+=15px'}} target="wowStep2" onComplete={() => setStep(2)}/>
        {/* @ts-ignore */}
        <Tween from={{opacity: 0, delay: 10, y: '+=15px'}} target="wowStep3" onComplete={() => setStep(3)}/>
        <Tween from={{delay: 1}} target="wowStep3" onComplete={() => setStep(0)}/>
      </Timeline>
    </ScrollTrigger>
  );
}
