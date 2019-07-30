import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";

import SettingsBlock from "../settings-block";
import ChangePasswordTradingAccountPopup from "./change-password-trading-account-popup";

const _ChangePassword: React.FC<Props> = ({ id, t, title }) => {
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
  return (
    <SettingsBlock
      label={t("manager.program-settings.password.title")}
      content={
        <>
          <p className="program-settings__text">
            {t("manager.program-settings.password.text")}
          </p>
          <GVButton color="primary" onClick={setChangePasswordOpen}>
            {t("program-details-page.description.change-password")}
          </GVButton>
          <ChangePasswordTradingAccountPopup
            programName={title}
            open={isChangePasswordOpen}
            id={id}
            onClose={setChangePasswordClose}
          />
        </>
      }
    />
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  title: string;
  id: string;
}

const ChangePassword = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_ChangePassword);
export default ChangePassword;
