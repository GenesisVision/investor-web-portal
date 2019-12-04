import chartXAxis from "components/chart/chart-components/chart-xaxis";
import { BalanceChartElementType } from "components/details/details-statistic-section/details.chart.helpers";
import GVColors from "components/gv-styles/gv-colors";
import { CURRENCIES } from "modules/currency-select/currency-select.constants";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";

import FundBalanceTooltip from "./fund-balance-tooltip";

const _FundBalanceChart: React.FC<Props> = ({
  color,
  balanceChart,
  currency
}) => {
  const chart = balanceChart.map(x => ({
    ...x,
    date: new Date(x.date).getTime()
  }));
  return (
    <ResponsiveContainer>
      <AreaChart data={chart} margin={{ top: 20 }}>
        {chartXAxis(
          balanceChart[0].date,
          balanceChart[balanceChart.length - 1].date
        )}
        <YAxis
          axisLine={false}
          orientation="right"
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          tickFormatter={x => +x.toFixed(4)}
          unit={currency}
          width={60}
        />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <Area
          dataKey="managerFunds"
          type="monotone"
          connectNulls={true}
          fill={`${color}2a`}
          stroke={`${color}2a`}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Area
          dataKey="investorsFunds"
          type="monotone"
          connectNulls={true}
          fill={color}
          stroke={color}
          strokeWidth={2}
          dot={false}
          unit={currency}
          stackId="1"
          isAnimationActive={false}
        />
        <Tooltip content={FundBalanceTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface Props {
  color: string;
  balanceChart: BalanceChartElementType;
  currency: CURRENCIES;
}

const FundBalanceChart = React.memo(_FundBalanceChart);
export default FundBalanceChart;
