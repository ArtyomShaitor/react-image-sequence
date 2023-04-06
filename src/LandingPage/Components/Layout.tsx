import styled from 'styled-components';
import {CSSProperties} from "react";
import {baseComponentStyles, WithBaseComponent} from "./BaseComponent";

export const HeroBlock = styled.div<WithBaseComponent<{}>>`
  display: flex;
  align-items: center;
  padding-top: 150px;
  flex-direction: column;
  height: 175vh;
  width: 100%;

  ${baseComponentStyles};
`;

export const BackgroundScrollContainer = styled.div<WithBaseComponent<{}>>`
  width: 100vw;
  position: absolute;
  top: 0;

  ${baseComponentStyles};
`;

type FlexProps = {
  dir?: CSSProperties['flexDirection'],
  justify?: CSSProperties['justifyContent'],
  align?: CSSProperties['alignItems'],
  rowGap?: CSSProperties['rowGap'],
  columnGap?: CSSProperties['columnGap'],
  grow?: CSSProperties['flexGrow'],
  basis?: CSSProperties['flexBasis'],
}
export const Flex = styled.div<WithBaseComponent<FlexProps>>`
  display: flex;
  flex-direction: ${_ => _.dir || 'column'};
  justify-content: ${_ => _.justify || 'start'};
  align-items: ${_ => _.align || 'start'};
  row-gap: ${_ => _.rowGap};
  column-gap: ${_ => _.columnGap};
  flex-grow: ${_ => _.grow};
  flex-basis: ${_ => _.basis};

  ${baseComponentStyles};
`;

type GridProps = {
  templateColumns?: CSSProperties['gridTemplateColumns'],
  templateRows?: CSSProperties['gridTemplateRows'],
  gap?: CSSProperties['gridGap'],
}
export const Grid = styled.div<WithBaseComponent<GridProps>>`
  display: grid;
  
  grid-template-columns: ${_ => _.templateColumns};
  grid-template-rows: ${_ => _.templateRows};
  grid-gap: ${_ => _.gap};

  ${baseComponentStyles};
`;

export const Container = styled.div<WithBaseComponent<{}>>`
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  
  ${baseComponentStyles}
`;

export const Div = styled.div<WithBaseComponent<{}>>`
  ${baseComponentStyles};
`;
