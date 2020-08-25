import DepositContainer from "components/deposit/components/deposit-container";
import {
  getMinProgramDeposit,
  getMinProgramDeposits,
  minProgramDepositsDefaultData
} from "components/deposit/services/program-deposit.service";
import { IDialogProps } from "components/dialog/dialog";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import useApiRequest from "hooks/api-request.hook";
import { getProgramWithdrawInfo } from "modules/program-withdraw/services/program-withdraw.services";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { programMinDepositAmountsSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

interface OwnProps {
  title: string;
  entryFee?: number;
  ownAsset?: boolean;
  availableToInvest?: number;
  broker: string;
  id: string;
  currency: CurrencyEnum;
  onApply?: () => void;
}

interface Props extends OwnProps, IDialogProps {}

const _ProgramDeposit: React.FC<Props> = ({
  title,
  entryFee,
  availableToInvest,
  broker,
  id,
  currency,
  onApply = () => {},
  open,
  onClose,
  ownAsset
}) => {
  const programMinDepositAmounts = useSelector(
    programMinDepositAmountsSelector
  );
  const minDeposit = getMinProgramDeposit(
    programMinDepositAmounts,
    currency,
    broker
  );
  const { data: minDeposits, sendRequest: getMinDeposits } = useApiRequest({
    request: getMinProgramDeposits
  });
  const { data: withdrawInfo, sendRequest: getWithdrawInfo } = useApiRequest({
    request: getProgramWithdrawInfo
  });
  useEffect(() => {
    if (open) {
      getWithdrawInfo({ id });
      getMinDeposits({ minDeposit, programCurrency: currency });
    }
  }, [open]);

  const isRealTime =
    withdrawInfo &&
    +new Date() + 2 * 60 * 100 > +new Date(withdrawInfo.periodEnds);

  const infoMessage =
    withdrawInfo && !isRealTime
      ? `Your request will be processed at ${new Date(
          withdrawInfo?.periodEnds
        ).toUTCString()}`
      : undefined;

  return (
    <DepositContainer
      infoMessage={infoMessage}
      title={title}
      ownAsset={ownAsset}
      availableToInvest={availableToInvest}
      entryFee={entryFee}
      minDeposit={minDeposits || minProgramDepositsDefaultData}
      asset={ASSET.PROGRAM}
      id={id}
      hasEntryFee
      currency={currency}
      onApply={onApply}
      open={open}
      onClose={onClose}
    />
  );
};

const ProgramDeposit = withLoader(React.memo(_ProgramDeposit));
export default ProgramDeposit;
