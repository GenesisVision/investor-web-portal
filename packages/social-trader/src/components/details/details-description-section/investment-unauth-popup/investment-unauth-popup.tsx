import "./investment-unauth-popup.scss";

import DepositTop, {
  DepositTopOwnProps
} from "components/deposit/components/deposit-top";
import Dialog, { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

const _InvestmentUnauthPopup: React.FC<Props> = ({
  header,
  open,
  onClose,
  title,
  currency,
  asset,
  availableToInvest,
  message
}) => {
  const [t] = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DepositTop
        header={header}
        asset={asset}
        currency={currency}
        title={title}
        availableToInvest={availableToInvest}
      />
      <DialogBottom>
        <p className="unauth-popup__message">{message}</p>
        <DialogButtons>
          <a href={LOGIN_ROUTE}>
            <GVButton>{t("auth.login.title")}</GVButton>
          </a>
          <a href={SIGNUP_ROUTE}>
            <GVButton>{t("auth.signup.title")}</GVButton>
          </a>
        </DialogButtons>
      </DialogBottom>
    </Dialog>
  );
};

const InvestmentUnauthPopup = React.memo(_InvestmentUnauthPopup);
export default InvestmentUnauthPopup;

interface Props extends DepositTopOwnProps, IDialogProps {
  message: string;
}
