import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import { useShadow } from "components/horizontal-list-shadow-container/shadow.hook";
import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  withScroll?: boolean;
  darkShadow?: boolean;
}

const ListContainer = styled.div<{ withScroll?: boolean }>`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  scrollbar-width: 0;
  &::-webkit-scrollbar {
    width: ${({ withScroll }) => (withScroll ? "6px" : 0)};
    height: ${({ withScroll }) => (withScroll ? "6px" : 0)};
  }
`;

const _HorizontalShadowList: React.FC<Props> = ({
  withScroll = true,
  darkShadow,
  children
}) => {
  const { scrollData, ref, handleScroll } = useShadow();
  return (
    <HorizontalListShadowContainer
      darkShadow={darkShadow}
      scrollData={scrollData}
    >
      <ListContainer ref={ref} onScroll={handleScroll}>
        {children}
      </ListContainer>
    </HorizontalListShadowContainer>
  );
};

export const HorizontalShadowList = React.memo(_HorizontalShadowList);
