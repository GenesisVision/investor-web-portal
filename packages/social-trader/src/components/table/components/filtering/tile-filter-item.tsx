import "./tile-filter-item.scss";

import { CloseIcon } from "components/icon/close-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";

const _TileFilterItem: React.FC<ITileFilterItemProps> = ({
  removable = true,
  mandatory,
  id,
  removeTile,
  children
}) => {
  return (
    <RowItem>
      <Row className="tile-filter-item">
        {children}
        {!mandatory && removable && (
          <div
            className="tile-filter-item__button-remove"
            onClick={() => removeTile!(id)}
          >
            <CloseIcon />
          </div>
        )}
      </Row>
    </RowItem>
  );
};

const TileFilterItem = React.memo(_TileFilterItem);
export default TileFilterItem;

export interface ITileFilterItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  removable?: boolean;
  id: string;
  removeTile?(id: string): void;
  mandatory?: boolean;
}
