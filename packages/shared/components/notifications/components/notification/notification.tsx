import classnames from "classnames";
import { NotificationViewModel } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import NewsIcon from "shared/media/news.svg";
import RedUserIcon from "shared/media/red-user.svg";
import {
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";
import Link, { LinkProps } from "shared/components/link/link";

enum TYPE {
  PROFILE = "profile",
  PLATFORM = "platform"
}

const getStaticIconUrl = (type: string): string | null => {
  return type.indexOf(TYPE.PROFILE) !== -1
    ? RedUserIcon
    : type.indexOf(TYPE.PLATFORM) !== -1
    ? NewsIcon
    : null;
};

const renderAssetAvatar = (props: INotificationProps) => {
  const { type, url, logo, color, closeNotifications, assetType } = props;
  const Tag: React.ComponentType<LinkProps | any> | string = url ? Link : "div";
  const to = url
    ? {
        pathname:
          assetType === "Program"
            ? composeProgramDetailsUrl(url)
            : composeFundsDetailsUrl(url),
        state: `/ ${type}`
      }
    : null;
  return (
    <Tag to={to} onClick={closeNotifications} className="notification__icon">
      <AssetAvatar
        url={logo}
        alt={type}
        className="notification__icon-logo"
        color={color}
      />
    </Tag>
  );
};

interface INotificationOwnProps {
  closeNotifications(): void;
}

type INotificationProps = NotificationViewModel & INotificationOwnProps;

const Notification: React.FC<INotificationProps> = props => {
  const { date, text, isUnread, type } = props;
  const staticIconUrl = getStaticIconUrl(type.toLowerCase());
  return (
    <div
      className={classnames(
        "notification",
        `notification--type-${type.toLowerCase()}`,
        {
          "notification--is-unread": isUnread
        }
      )}
    >
      {staticIconUrl ? (
        <div className="notification__icon">
          <img
            src={staticIconUrl}
            alt={type}
            className="notification__icon-logo"
          />
        </div>
      ) : (
        renderAssetAvatar(props)
      )}

      <div className="notification__content">
        <div className="notification__description">{text}</div>
        <div className="notification__date">{moment(date).format("HH:mm")}</div>
      </div>
    </div>
  );
};

export default Notification;
