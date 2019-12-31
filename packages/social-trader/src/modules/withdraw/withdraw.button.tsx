import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { ASSET } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import { FundWithdrawDialog } from "modules/fund-withdraw/fund-withdraw-dialog";
import ProgramWithdrawDialog from "modules/program-withdraw/program-withdraw-dialog";
import React from "react";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "utils/types";

const _WithdrawButton: React.FC<Props> = ({
  size,
  onApply,
  type,
  id,
  currency,
  disabled
}) => {
  const accountCurrency = useSelector(currencySelector);
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  let withdraw;
  switch (type) {
    case ASSET.FUND:
      withdraw = (
        <FundWithdrawDialog
          onApply={onApply}
          open={isOpenPopup}
          id={id}
          onClose={setIsClosePopup}
        />
      );
      break;
    default:
      withdraw = (
        <ProgramWithdrawDialog
          onApply={onApply}
          open={isOpenPopup}
          id={id}
          accountCurrency={accountCurrency}
          assetCurrency={currency}
          onClose={setIsClosePopup}
        />
      );
  }
  return (
    <>
      <GVButton
        size={size}
        disabled={disabled}
        color="secondary"
        variant="outlined"
        onClick={setIsOpenPopup}
      >
        {t("buttons.withdraw")}
      </GVButton>
      {withdraw}
    </>
  );
};

interface Props {
  size?: GV_BTN_SIZE;
  disabled?: boolean;
  onApply?: VoidFunction;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const WithdrawButton = React.memo(_WithdrawButton);
export default WithdrawButton;
