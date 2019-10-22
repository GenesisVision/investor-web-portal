import "./details-description-control.scss";

import classnames from "classnames";
import H from "history";
import React from "react";

interface IDetailsDescriptionControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  onClick?(): void;
  to?: H.LocationDescriptor;
  disabled?: boolean;
  tag: React.ComponentType<any> | string;
}
const DetailsDescriptionControl: React.SFC<IDetailsDescriptionControlProps> = ({
  children,
  text,
  tag: Tag,
  className,
  onClick,
  to
}) => {
  return (
    <Tag
      className={classnames("details-description-control", className)}
      onClick={onClick}
      to={to}
    >
      <div className="details-description-control__text">{text}</div>
      {children}
    </Tag>
  );
};

export default DetailsDescriptionControl;
