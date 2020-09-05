import {
  $backgroundColor,
  $landingBg,
  $landingColorIcon,
  $mainColor,
  $primaryColor,
  $textDarkColor,
  $textLightColor
} from "components/gv-styles/gv-colors/gv-colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "components/gv-styles/gv-media";
import {
  $fontSizeCommon,
  $fontSizeH1,
  $fontSizeH2,
  $fontSizeH3,
  $fontSizeH4,
  $fontSizeParagraph,
  $paddingXxsmall
} from "components/gv-styles/gv-sizes";
import React from "react";
import { css } from "styled-components";
import { adaptivePadding, fontSize } from "utils/style/style-mixins";

export const RootStyle = css`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:200,400,500,600,700,800&display=swap");
  body {
    color: white;
    margin: 0;
    padding: 0;
    background-color: ${$backgroundColor};
    font-family: "Montserrat", sans-serif;
    backface-visibility: hidden;
  }
  .body--fixed {
    overflow: hidden;
  }

  div {
    box-sizing: border-box;
  }

  input,
  textarea,
  select,
  button {
    font-family: "Montserrat", sans-serif;
  }

  a {
    color: ${$primaryColor};
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  #__next {
    height: 100vh; // TODO why?
    color: white;
  }

  svg.recharts-surface {
    // fix for recharts
    overflow: visible;
  }

  h1 {
    ${fontSize($fontSizeH1)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
  }

  h2 {
    ${fontSize($fontSizeH2)};
    font-weight: 500;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
  }

  h3 {
    ${fontSize($fontSizeH3)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
    letter-spacing: 0.2px;
  }

  h4 {
    ${fontSize($fontSizeH4)};
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 0;
  }

  h5 {
    margin: 0;
    ${fontSize($fontSizeCommon)};
  }

  p {
    ${fontSize($fontSizeParagraph)};
    ${adaptivePadding("bottom", $paddingXxsmall)};
    margin-top: 0;
    margin-bottom: 0;
  }

  :root {
    --scroll-width: 6px;
    --scroll-radius: calc(var(--scroll-width) / 2);
    --scroll-background: transparent;
    --scroll-thumb-color: ${$textDarkColor};
  }
  ::-webkit-scrollbar {
    width: var(--scroll-width);
    height: var(--scroll-width);
  }

  ::-webkit-scrollbar-track {
    background: var(--scroll-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scroll-thumb-color);
    border-radius: var(--scroll-radius);
  }

  ::-webkit-scrollbar-corner {
    background: var(--scroll-background);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--scroll-thumb-color) var(--scroll-background);
  }
`;

export const LandingPageRootStyle = css`
  .landing-page {
    background-color: ${$landingBg};
    color: ${$mainColor};

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .popover,
    .dialog,
    .tooltip__popover,
    .popover-content__block {
      background-color: ${$landingColorIcon};
    }

    a,
    label {
      -webkit-tap-highlight-color: transparent;
    }

    p {
      font-size: 13px;
      line-height: 1.6;
      padding-bottom: 0;

      ${mediaBreakpointTablet(`font-size: 18px;`)}
      ${mediaBreakpointLandscapeTablet(`font-size: 14px;`)};
      ${mediaBreakpointDesktop(`font-size: 16px;`)};
      ${mediaBreakpointLargeDesktop(`font-size: 18px;`)};
    }

    h1 {
      font-weight: 700;
      font-size: 28px;
      line-height: 1.6;
      padding-bottom: 0;
      margin-bottom: 16px;

      ${mediaBreakpointTablet(`font-size: 38px;`)};
      ${mediaBreakpointLandscapeTablet(`font-size: 26px;`)};
      ${mediaBreakpointDesktop(`font-size: 30px;`)};
      ${mediaBreakpointLargeDesktop(`font-size: 38px;`)};
    }

    h1,
    h2,
    h3 {
      color: inherit;
    }

    h2 {
      font-weight: 600;
      font-size: 28px;
      line-height: 1.6;
      padding-bottom: 0;
      margin-bottom: 16px;

      ${mediaBreakpointTablet(`font-size: 38px;`)};
      ${mediaBreakpointLandscapeTablet(`font-size: 26px;`)};
      ${mediaBreakpointDesktop(`font-size: 30px;`)};
      ${mediaBreakpointLargeDesktop(`font-size: 38px;`)};
    }

    h3 {
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      padding-bottom: 0;

      ${mediaBreakpointTablet(`font-size: 24px;
        line-height: 40px;`)};
      ${mediaBreakpointLandscapeTablet(`font-size: 20px;
        line-height: 32px;`)};
      ${mediaBreakpointLargeDesktop(`font-size: 22px;`)};
    }
  }
`;
