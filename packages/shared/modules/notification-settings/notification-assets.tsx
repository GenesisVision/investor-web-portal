import {
  FundNotificationSettingList,
  ProgramNotificationSettingList
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ASSET } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { composeAssetNotificationsUrl } from "shared/utils/compose-url";

import NotificationEntity from "./notification-entity";

const _NotificationAssets: React.FC<Props> = ({ t, settings, asset }) => (
  <div className="notification-settings">
    <h3 className="notification-settings__subtitle">
      {t(`notifications-page.${asset.toLowerCase()}s`)}
    </h3>
    <div className="program-notification__list">
      {settings.map(setting => (
        <NotificationEntity
          href={composeAssetNotificationsUrl(setting.url, asset)}
          level={"level" in setting ? setting.level : undefined}
          key={setting.assetId}
          title={setting.title}
          logo={setting.logo}
          color={setting.color}
          count={
            ("settingsCustom" in setting ? setting.settingsCustom.length : 0) +
            setting.settingsGeneral.length
          }
        />
      ))}
    </div>
  </div>
);

interface Props extends WithTranslation {
  settings: Array<ProgramNotificationSettingList | FundNotificationSettingList>;
  asset: ASSET;
}

const NotificationAssets = React.memo(
  withLoader(translate()(_NotificationAssets))
);
export default NotificationAssets;
