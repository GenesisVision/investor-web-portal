import "./tag-broker-container.scss";

import classNames from "classnames";
import { ProgramTag } from "gv-api-web";
import * as React from "react";
import Tooltip from "shared/components/tooltip/tooltip";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import TagItem from "../tag-item/tag-item";
import TagItemTooltip from "../tag-item/tag-item-tooltip";

const MAX_VISIBLE_TAGS = 1;

const _TagBrokerContainer: React.FC<Props & WithLoaderProps> = ({
  tags,
  className
}) => {
  const length = tags.length;
  const remainder = length > MAX_VISIBLE_TAGS ? `${length - 1}` : null;
  return (
    <div className={classNames("tag-broker-container", className)}>
      {tags.map(
        (tag, idx) =>
          ((remainder && idx === 0) || !remainder) && (
            <TagItem name={tag.name} color={tag.color} key={idx} />
          )
      )}
      {remainder && (
        <Tooltip
          render={() => (
            <TagItemTooltip
              tags={tags}
              className="tag-broker-container__tooltip"
            />
          )}
        >
          <div className="tag-broker-container__others">...</div>
        </Tooltip>
      )}
    </div>
  );
};

interface Props {
  tags: ProgramTag[];
  className?: string;
}

const TagBrokerContainer = React.memo(withLoader(_TagBrokerContainer));

export default TagBrokerContainer;
