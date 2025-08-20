export interface ComponentStyles {
  width?: number;
  height?: number;

  marginLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;

  paddingLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;

  borderSize?: number;
  borderColor?: string;
  borderType?: string;

  borderRadiusTopLeft?: number;
  borderRadiusTopRight?: number;
  borderRadiusBottomLeft?: number;
  borderRadiusBottomRight?: number;

  backgroundColor?: string;
  color?: string;

  fontFamily?: string;
  textContent?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: string;

  opacity?: number;

  shadowX?: number;
  shadowY?: number;
  shadowBlur?: number;
  shadowColor?: string;

  position?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;

  zIndex?: number;

  hoverScale?: string;
  hoverBorderRadius?: number;
  hoverShadowX?: number;
  hoverShadowY?: number;
  hoverShadowBlur?: number;
  hoverShadowColor?: string;

  cursor?: string;

  display?: string;
  flexDirection?: string;
  flexJustify?: string;
  flexAlign?: string;
  flexWrap?: string;
  flexGap?: number;
  flexAlignItems?: string;
  alignSelf?: string;

  newComponentId?: string;

  imageSource?: string;
  iconSource?: string;
  linkSource?: string;
}