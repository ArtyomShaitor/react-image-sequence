import styled from 'styled-components';
import {CSSProperties} from "react";
import {baseComponentStyles, WithBaseComponent} from "./BaseComponent";

export const textDefaults = {
  family: {
    openSans: '"Open Sans", sans-serif',
    poppins: '"Poppins"',
  },
  weight: {
    400: 400,
    700: 700,
    regular: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
  },
  size: {
    smaller: "0.875rem",
    regular: "1rem",
    bigger: "1.125rem",
  },
  color: {
    regular: '#808080',
    bold: '#B3B3B3'
  },
  lineHeight: {
    text: '1.875rem'
  },
} as const;

export const Headline = styled.h1<WithBaseComponent<{}>>`
  font-family: ${textDefaults.family.poppins};
  font-weight: ${textDefaults.weight.bold};
  font-size: 2.5rem;
  color: white;
  
  ${baseComponentStyles}
`;

export const HeroHeadline = styled(Headline)`
  font-family: ${textDefaults.family.openSans};
  font-size: 4rem;
  margin: 0 0 20px 0;
`;

interface TextProps {
  color?: CSSProperties['color'],
  size?: CSSProperties['fontSize'],
  family?: CSSProperties['fontFamily'],
  textTransform?: CSSProperties['textTransform'],
  spacing?: CSSProperties['letterSpacing'],
  lineHeight?: CSSProperties['lineHeight'],
  weight?: CSSProperties['fontWeight'],
}
export const Text = styled.span<WithBaseComponent<TextProps>>`
  color: ${_ => _.color || textDefaults.color.regular};
  font-family: ${_ => _.family || textDefaults.family.openSans};
  font-weight: ${_ => _.weight || textDefaults.weight.regular};
  font-size: ${_ => _.size || textDefaults.size.regular};
  text-transform: ${_ => _.textTransform || 'none'};
  letter-spacing: ${_ => _.spacing || 'normal'};
  line-height: ${_ => _.lineHeight};
  
  ${baseComponentStyles}
`;

export const Strong = styled.strong`
  color: ${textDefaults.color.bold};
`;

export const Code = styled.code`
  color: ${textDefaults.color.bold};
  font-size: inherit;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 3px;
  border-radius: 3px;
`;
