import "./tag-program.scss";

import classnames from "classnames";
import { ProgramTag } from "gv-api-web";
import { GVButton } from "gv-react-components";
import * as React from "react";

import { CloseIcon } from "../icon/close-icon";

export interface IProgramTagItem {
  handleRemove?(name: string): void;
}

const TagProgramItem: React.FC<ProgramTag & IProgramTagItem> = ({
  color,
  name,
  handleRemove
}) => {
  const styleTag = { color, backgroundColor: `${color}1a` };
  return (
    <div
      className={classnames("tag-program tag-button", {
        "tag-program--self-remove": handleRemove
      })}
      style={styleTag}
    >
      {handleRemove && (
        <GVButton
          variant="text"
          color="secondary"
          className="tag-program__button-remove"
          onClick={handleRemove(name)}
        >
          <CloseIcon />
        </GVButton>
      )}
      {name}
    </div>
  );
};

export default TagProgramItem;
