import GVButton from "components/gv-button";
import { ASSET } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import { FundWithdrawDialog } from "modules/fund-withdraw/fund-withdraw-dialog";
import ProgramWithdrawDialog from "modules/program-withdraw/program-withdraw-dialog";
import React from "react";
import { CurrencyEnum, Sizeable } from "utils/types";

interface Props extends Sizeable {
  isProcessingRealTime?: boolean;
  infoMessage?: string;
  disabled?: boolean;
  onApply?: VoidFunction;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const _WithdrawButton: React.FC<Props> = ({
  isProcessingRealTime,
  infoMessage,
  size,
  onApply,
  type,
  id,
  currency,
  disabled
}) => {
  const accountCurrency = useAccountCurrency();
  const [t] = useTranslation();
  const label = t("buttons.withdraw");
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const withdraw =
    type === ASSET.FUND ? (
      <FundWithdrawDialog
        infoMessage={infoMessage}
        onApply={onApply}
        open={isOpenPopup}
        id={id}
        onClose={setIsClosePopup}
      />
    ) : (
      <ProgramWithdrawDialog
        isProcessingRealTime={isProcessingRealTime}
        onApply={onApply}
        open={isOpenPopup}
        id={id}
        accountCurrency={accountCurrency}
        assetCurrency={currency}
        onClose={setIsClosePopup}
      />
    );
  return (
    <>
      <GVButton
        testId={label}
        className={label}
        size={size}
        disabled={disabled}
        color="secondary"
        variant="outlined"
        onClick={setIsOpenPopup}
      >
        {label}
      </GVButton>
      {withdraw}
    </>
  );
};

const WithdrawButton = React.memo(_WithdrawButton);
export default WithdrawButton;
