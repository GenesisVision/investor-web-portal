import "./details-description.scss";

import TagItem from "components/tags/tag-item/tag-item";
import { ProgramTag } from "gv-api-web";
import * as React from "react";

const _DetailsTags: React.FC<{
  tags: ProgramTag[];
}> = ({ tags }) => {
  return (
    <div className="asset-details-description__tag">
      {tags.map((tag, idx) => (
        <TagItem name={tag.name} color={tag.color} key={idx} />
      ))}
    </div>
  );
};

export const DetailsTags = React.memo(_DetailsTags);
