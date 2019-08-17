import "shared/components/details/details.scss";
import "shared/modules/asset-settings/asset-settings.scss";

import "./profile.scss";

import copy from "copy-to-clipboard";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "shared/components/settings-block/settings-block";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import PublicInfo from "shared/modules/public-info/public-info";

const _Profile: React.FC<Props> = ({
  t,
  info,
  role,
  notifySuccess,
  onSuccessEdit
}) => {
  const onCopy = () => {
    copy(info.id);
    notifySuccess(t("profile-page.success-copy"));
  };
  return (
    <div className="asset-settings profile__container--padding-top">
      {role === ROLE.MANAGER && (
        <>
          <SettingsBlock
            label={t("profile-page.public-info")}
            content={
              <PublicInfo
                about={info.about}
                userName={info.userName}
                onSuccessEdit={onSuccessEdit}
              />
            }
          />
          <SettingsBlock
            label={t("profile-page.id")}
            content={
              <div className="profile__content">
                <div>{info.id}</div>
                <GVButton onClick={onCopy}>{t("buttons.copy")}</GVButton>
              </div>
            }
          />
        </>
      )}
      <SettingsBlock
        label={t("profile-page.settings.profile-image")}
        content={<ProfileImageContainer />}
      />
      <SettingsBlock
        label={t("profile-page.contacts")}
        checked={true}
        content={
          <StatisticItem label={t("profile-page.email")}>
            {info.email}
          </StatisticItem>
        }
      />
      <SettingsBlock
        label={t("profile-page.personal-info")}
        verificationStatus={info.verificationStatus}
      />
    </div>
  );
};

interface Props extends WithTranslation, IProfileOwnProps, WithRoleProps {}

export interface IProfileOwnProps {
  info: ProfileFullViewModel;
  notifySuccess: (val: string) => void;
  onSuccessEdit: (text: string) => void;
}

const Profile = compose<
  React.ComponentType<IProfileOwnProps & WithLoaderProps>
>(
  withLoader,
  withRole,
  translate(),
  React.memo
)(_Profile);
export default Profile;
