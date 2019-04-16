import * as React from "react";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import { formatCurrencyValue } from "shared/utils/formatter";

const TooltipBody: React.FC<ITooltipBodyProps> = React.memo(
  ({ managersFunds, investorsFunds, profit }) => (
    <>
      <div className="details-tooltip__statistic">
        <div className="details-tooltip__title">Profit</div>
        <div className="details-tooltip__value">{profit}</div>
      </div>
      <div className="details-tooltip__statistic">
        <div className="details-tooltip__title">Investors Funds</div>
        <div className="details-tooltip__value">{investorsFunds}</div>
      </div>
      <div className="details-tooltip__statistic">
        <div className="details-tooltip__title">Managers Funds</div>
        <div className="details-tooltip__value">{managersFunds}</div>
      </div>
    </>
  )
);

const ProgramBalanceTooltip: React.FC<IProgramBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;
  const dot = payload[0];
  const managersFunds = `${formatCurrencyValue(
    dot.payload.managerFunds,
    dot.unit
  )} ${dot.unit}`;
  const investorsFunds = `${formatCurrencyValue(
    dot.payload.investorsFunds,
    dot.unit
  )} ${dot.unit}`;

  const profit = `${formatCurrencyValue(
    dot.payload.profit || dot.payload.profitNegative,
    dot.unit
  )} ${dot.unit}`;

  return (
    <ChartTooltip
      heading="Equity"
      body={
        <TooltipBody
          managersFunds={managersFunds}
          investorsFunds={investorsFunds}
          profit={profit}
        />
      }
      date={new Date(label)}
      className="details-tooltip"
    />
  );
};

interface ITooltipBodyProps {
  managersFunds: string;
  investorsFunds: string;
  profit: string;
}
interface IProgramBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default React.memo(ProgramBalanceTooltip);
