import "./dashboard-block.scss";

import { HorizontalListShadowContainer } from "pages/dashboard/components/dashboard-block/horizontal-list-shadow-container";
import React, { useCallback, useRef, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const DashboardHorizontalWindowList: React.FC<Props> = ({
  itemWidth,
  renderItem,
  height,
  width,
  items,
  darkShadow
}) => {
  const ref = useRef<any>(null);
  const endOfList = itemWidth * items.length - width;
  const [scroll, setScroll] = useState(0);

  const handleScroll = useCallback(({ scrollOffset }) => {
    setScroll(scrollOffset);
  }, []);

  return (
    <HorizontalListShadowContainer
      endOfList={endOfList}
      scroll={scroll}
      darkShadow={darkShadow}
    >
      <FixedSizeList
        ref={ref}
        onScroll={handleScroll}
        className="dashboard-horizontal-window-list"
        itemData={items}
        height={height}
        itemCount={items.length}
        itemSize={itemWidth}
        layout="horizontal"
        width={width}
      >
        {renderItem}
      </FixedSizeList>
    </HorizontalListShadowContainer>
  );
};

interface Props {
  height: number;
  itemWidth: number;
  width: number;
  items: any[];
  darkShadow?: boolean;
  renderItem: React.FC<ListChildComponentProps>;
}
export default DashboardHorizontalWindowList;
