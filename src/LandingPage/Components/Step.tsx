import {Flex} from "./Layout";
import {Text, textDefaults} from "./Text";
import {CSSProperties} from "styled-components";
import {forwardRef, useMemo} from "react";

interface StepProps {
  step: number;
  stepColor: CSSProperties['color'],
  title: string,
  body?: string,
};

function hexToHSL(H: string) {
  // Convert hex to RGB first
  let r: any = 0, g: any = 0, b: any = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l }
}


function HSLToHex(h: any, s: any, l: any) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r: any = 0,
    g: any = 0,
    b: any = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}


export const Step = forwardRef(({ title, step, body, stepColor }: StepProps, ref) => {
  const darkerColor = useMemo(
    () => {
      const { h } = hexToHSL(stepColor as string);
      return HSLToHex(h, 43, 35);
    },
    [stepColor]
  );

  return (
    <Flex
      // @ts-ignore
      ref={ref}
      bgColor="#1A1A1A"
      borderRadius="10px"
      padding="15px 25px 15px 20px"
      dir="row"
      columnGap="20px"
      align="center"
      w="100%"
    >
      <Flex>
        <Flex
          bgColor={darkerColor}
          w="30px"
          h="30px"
          align="center"
          justify="center"
          borderRadius="30px"
        >
          <Text color={stepColor} lineHeight="1rem" weight={textDefaults.weight.bold}>{step}</Text>
        </Flex>
      </Flex>
      <Flex>
        <Text
          color="white"
          weight={textDefaults.weight.bold}
          marginBottom="10px"
        >
          {title}
        </Text>
        <Text size={textDefaults.size.smaller}>
          {body}
        </Text>
      </Flex>
    </Flex>
  );
});
