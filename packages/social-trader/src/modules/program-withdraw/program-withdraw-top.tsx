import { DialogTop } from "components/dialog/dialog-top";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramWithdrawTop: React.FC<OwnProps> = ({
  rate,
  accountCurrency,
  availableToWithdraw,
  title,
  programCurrency
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop title={t("withdraw-program.title")} subtitle={title}>
      <StatisticItem label={t("withdraw-program.available-to-withdraw")} big>
        {formatCurrencyValue(availableToWithdraw, programCurrency)}{" "}
        {programCurrency}
      </StatisticItem>
    </DialogTop>
  );
};

const ProgramWithdrawTop = React.memo(_ProgramWithdrawTop);
export default ProgramWithdrawTop;

interface OwnProps {
  rate: number;
  availableToWithdraw: number;
  programCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  title: string;
}
