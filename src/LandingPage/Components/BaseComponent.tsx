import {
  css,
  CSSProperties,
} from 'styled-components';

interface BaseComponentProps {
  margin?: CSSProperties['margin'],
  marginTop?: CSSProperties['marginTop'],
  marginBottom?: CSSProperties['marginBottom'],
  marginLeft?: CSSProperties['marginLeft'],
  marginRight?: CSSProperties['marginRight'],
  padding?: CSSProperties['padding'],
  paddingTop?: CSSProperties['paddingTop'],
  paddingBottom?: CSSProperties['paddingBottom'],
  paddingLeft?: CSSProperties['paddingLeft'],
  paddingRight?: CSSProperties['paddingRight'],
  top?: CSSProperties['top'],
  bottom?: CSSProperties['bottom'],
  left?: CSSProperties['left'],
  right?: CSSProperties['right'],
  position?: CSSProperties['position'],
  overflow?: CSSProperties['overflow'],
  opacity?: CSSProperties['opacity'],
  zIndex?: CSSProperties['zIndex'],
  width?: CSSProperties['width'],
  w?: CSSProperties['width'],
  maxWidth?: CSSProperties['maxWidth'],
  maxW?: CSSProperties['maxWidth'],
  minWidth?: CSSProperties['minWidth'],
  minW?: CSSProperties['minWidth'],
  height?: CSSProperties['height'],
  h?: CSSProperties['height'],
  maxHeight?: CSSProperties['maxHeight'],
  maxH?: CSSProperties['maxHeight'],
  minHeight?: CSSProperties['minHeight'],
  minH?: CSSProperties['minHeight'],
  border?: CSSProperties['border'],
  borderTop?: CSSProperties['borderTop'],
  borderBottom?: CSSProperties['borderBottom'],
  borderLeft?: CSSProperties['borderLeft'],
  borderRight?: CSSProperties['borderRight'],
  borderRadius?: CSSProperties['borderRadius'],
  backgroundColor?: CSSProperties['backgroundColor'],
  bgColor?: CSSProperties['backgroundColor'],
}

const PROPS_MAP = {
  full: '100%'
} as Record<string, string>;

const propMap = (cb: (props: BaseComponentProps) => any) => (props: BaseComponentProps): string | undefined => {
  const value = cb(props);
  if (value !== undefined && PROPS_MAP.hasOwnProperty(value)) {
    return PROPS_MAP[value];
  }

  return value;
}

export type WithBaseComponent<ComponentType> = BaseComponentProps & ComponentType;

export const baseComponentStyles = css<BaseComponentProps>`
  background-color: ${_ => _.bgColor || _.backgroundColor};
  
  position: ${propMap(_ => _.position)};
  overflow: ${propMap(_ => _.overflow)};
  opacity: ${propMap(_ => _.opacity)};
  z-index: ${propMap(_ => _.zIndex)};
  
  width: ${propMap(_ => _.w || _.width)};
  height: ${propMap(_ => _.h || _.height)};
  min-width: ${propMap(_ => _.minW || _.minWidth)};
  min-height: ${propMap(_ => _.minH || _.minHeight)};
  max-width: ${propMap(_ => _.maxW || _.maxWidth)};
  max-height: ${propMap(_ => _.maxH || _.maxHeight)};
  
  border: ${propMap(_ => _.border)};
  border-top: ${propMap(_ => _.borderTop)};
  border-bottom: ${propMap(_ => _.borderBottom)};
  border-left: ${propMap(_ => _.borderLeft)};
  border-right: ${propMap(_ => _.borderRight)};
  border-radius: ${propMap(_ => _.borderRadius)};
  
  margin: ${propMap(_ => _.margin)};
  margin-top: ${propMap(_ => _.marginTop)};
  margin-bottom: ${propMap(_ => _.marginBottom)};
  margin-left: ${propMap(_ => _.marginLeft)};
  margin-right: ${propMap(_ => _.marginRight)};
  
  padding: ${propMap(_ => _.padding)};
  padding-top: ${propMap(_ => _.paddingTop)};
  padding-bottom: ${propMap(_ => _.paddingBottom)};
  padding-left: ${propMap(_ => _.paddingLeft)};
  padding-right: ${propMap(_ => _.paddingRight)};

  top: ${propMap(_ => _.top)};
  bottom: ${propMap(_ => _.bottom)};
  left: ${propMap(_ => _.left)};
  right: ${propMap(_ => _.right)};
`;

