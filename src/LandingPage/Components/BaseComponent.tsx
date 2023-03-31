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
  borderRadius?: CSSProperties['borderRadius'],
  backgroundColor?: CSSProperties['backgroundColor'],
  bgColor?: CSSProperties['backgroundColor'],
}

export type WithBaseComponent<ComponentType> = BaseComponentProps & ComponentType;

export const baseComponentStyles = css<BaseComponentProps>`
  background-color: ${_ => _.bgColor || _.backgroundColor};
  
  position: ${_ => _.position};
  opacity: ${_ => _.opacity};
  z-index: ${_ => _.zIndex};
  
  width: ${_ => _.w || _.width};
  height: ${_ => _.h || _.height};
  min-width: ${_ => _.minW || _.minWidth};
  min-height: ${_ => _.minH || _.minHeight};
  max-width: ${_ => _.maxW || _.maxWidth};
  max-height: ${_ => _.maxH || _.maxHeight};
  
  border: ${_ => _.border};
  border-radius: ${_ => _.borderRadius};
  
  margin: ${_ => _.margin};
  margin-top: ${_ => _.marginTop};
  margin-bottom: ${_ => _.marginBottom};
  margin-left: ${_ => _.marginLeft};
  margin-right: ${_ => _.marginRight};
  
  padding: ${_ => _.padding};
  padding-top: ${_ => _.paddingTop};
  padding-bottom: ${_ => _.paddingBottom};
  padding-left: ${_ => _.paddingLeft};
  padding-right: ${_ => _.paddingRight};

  top: ${_ => _.top};
  bottom: ${_ => _.bottom};
  left: ${_ => _.left};
  right: ${_ => _.right};
`;

