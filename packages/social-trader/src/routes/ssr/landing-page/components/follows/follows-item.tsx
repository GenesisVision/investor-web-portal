import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import React from "react";
import { composeProgramDetailsUrl } from "utils/compose-url";

interface ITraderItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  count: number;
  color: string;
  url: string;
  logo: string;
  imageClassName?: string;
}

const _FollowsItem: React.FC<ITraderItemProps> = ({
  title,
  count,
  color,
  url,
  logo,
  imageClassName
}) => {
  const linkProps = {
    pathname: composeProgramDetailsUrl(url),
    state: `/ ${title}`
  };
  return (
    <li className="follows-list__item">
      <Link className="follows-list__item-link" to={linkProps}>
        <div className="follows-list__item-avatar">
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName="follows-list__item-image--default"
            color={color}
            alt={title}
            imageClassName={classNames(
              "follows-list__item-image",
              imageClassName
            )}
            url={logo}
          />
        </div>
        <div className="follows-list__item-title">{title}</div>
        <div className="follows-list__item-data">
          <div className="follows-list__item-number">{count}</div>
          <span className="follows-list__item-label">Followers</span>
        </div>
      </Link>
    </li>
  );
};
const FollowsItem = React.memo(_FollowsItem);
export default FollowsItem;
