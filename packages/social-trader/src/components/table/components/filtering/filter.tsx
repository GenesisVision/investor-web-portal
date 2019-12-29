import "rc-slider/assets/index.css";
import "./filter.scss";

import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

import { UpdateFilterFunc } from "../table.types";
import FilterArrowIcon from "./filter-arrow-icon";

const _Filter: React.FC<Props> = ({
  label,
  value,
  renderValueText,
  children,
  updateFilter,
  name
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleChangeFilter = useCallback(
    (value: any) => {
      clearAnchor();
      updateFilter && updateFilter({ name, value });
    },
    [updateFilter, name]
  );
  const child = React.cloneElement(children as React.ReactElement<any>, {
    value,
    changeFilter: handleChangeFilter,
    cancel: clearAnchor
  });
  return (
    <>
      <div className="filter" onClick={setAnchor}>
        <div className="filter__label">{label}</div>
        <div className="filter__value">{renderValueText(value)}</div>
        <FilterArrowIcon isOpen={anchor !== undefined} />
      </div>
      <Popover
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        fixedVertical
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        noPadding
      >
        {child}
      </Popover>
    </>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: any;
  renderValueText(value: any): string;
  updateFilter?: UpdateFilterFunc;
  name: string;
}

const Filter = React.memo(_Filter);
export default Filter;
