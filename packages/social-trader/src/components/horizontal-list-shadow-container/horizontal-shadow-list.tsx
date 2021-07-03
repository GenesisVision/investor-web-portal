import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import { useShadow } from "components/horizontal-list-shadow-container/shadow.hook";
import React from "react";
import styled from "styled-components";
import { $paddingXsmall } from "utils/style/sizes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  withScroll?: boolean;
  darkShadow?: boolean;
}

const ListContainer = styled.div<{ withScroll?: boolean }>`
  display: flex;
  padding-bottom: ${({ withScroll = true }) =>
    withScroll ? `${$paddingXsmall}px` : ""};
  overflow-x: scroll;
  width: 100%;
  scrollbar-width: 0;
  &::-webkit-scrollbar {
    width: ${({ withScroll = true }) => (withScroll ? "6px" : 0)};
    height: ${({ withScroll = true }) => (withScroll ? "6px" : 0)};
  }
`;

const _HorizontalShadowList: React.FC<Props> = ({
  withScroll,
  darkShadow,
  children
}) => {
  const { scrollData, ref, handleScroll } = useShadow();
  return (
    <HorizontalListShadowContainer
      darkShadow={darkShadow}
      scrollData={scrollData}
    >
      <ListContainer withScroll={withScroll} ref={ref} onScroll={handleScroll}>
        {children}
      </ListContainer>
    </HorizontalListShadowContainer>
  );
};

export const HorizontalShadowList = React.memo(_HorizontalShadowList);
