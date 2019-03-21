import classNames from "classnames";
import { GVButton } from "gv-react-components";
import * as React from "react";

export interface ITagFilterButton {
  isActive: boolean;
  onClickHandle?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const TagFilterButton: React.FC<ITagFilterButton> = ({
  isActive,
  onClickHandle
}) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={classNames("tag-filter__button tag-button", {
        "tag-filter__button--active": isActive
      })}
      onClick={onClickHandle as () => void}
    >
      <>
        <span className="tag-filter__button-plus">+</span>Tag
      </>
    </GVButton>
  );
};

export default React.memo(TagFilterButton);
