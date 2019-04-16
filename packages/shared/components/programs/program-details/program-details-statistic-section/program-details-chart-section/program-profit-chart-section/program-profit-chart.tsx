import { ChartSimple } from "gv-api-web";
import { GVColors } from "gv-react-components";
import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import chartXAxis from "shared/components/chart/chart-components/chart-xaxis";
import ProgramChartGradient, {
  getStrokeColor,
  gradientOffset
} from "shared/components/chart/chart-gradient/chart-gradient";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatValue } from "shared/utils/formatter";

import ProgramProfitTooltip from "./program-profit-tooltip";

const ProgramProfitChart: React.FC<Props> = ({
  equityChart,
  pnlChart,
  currency
}) => {
  if (equityChart.length === 0 || pnlChart.length === 0) return null;
  const equity = equityChart.map(x => ({
    date: x.date.getTime(),
    value: formartChartMinValue(x.value)
  }));
  const pnl = pnlChart.map((x: any) => ({
    date: x.date.getTime(),
    value: formartChartMinValue(x.value)
  }));
  const equityValues = equity.map(x => x.value);
  const off = gradientOffset(equityValues);
  const areaStrokeColor = getStrokeColor(equityValues);

  return (
    <ResponsiveContainer>
      <ComposedChart data={pnl} margin={{ top: 20 }}>
        <defs>
          <ProgramChartGradient
            offset={off}
            name="equityProgramChartFill"
            color={areaStrokeColor}
            startOpacity={0.1}
            stopOpacity={0.01}
          />
        </defs>
        {chartXAxis(
          equityChart[0].date,
          equityChart[equityChart.length - 1].date
        )}
        {/*
        //@ts-ignore*/}
        <YAxis
          yAxisId="left"
          dataKey="value"
          data={equity}
          orientation="left"
          axisLine={false}
          tick={{
            fill: GVColors.$labelColor,
            fontSize: "12"
          }}
          tickFormatter={x => formatValue(x, 2)}
          unit="%"
          width={35}
        />
        {/*
        //@ts-ignore*/}
        <YAxis
          yAxisId="right"
          dataKey="value"
          data={pnl}
          orientation="right"
          axisLine={false}
          tick={{ fill: GVColors.$labelColor, fontSize: "12" }}
          unit={currency}
          tickFormatter={x => formatValue(x, 5)}
          width={80}
        />
        <Tooltip content={ProgramProfitTooltip} />
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <Bar
          dataKey="value"
          data={pnl}
          unit={` ${currency}`}
          barSize={6}
          fill={GVColors.$labelColor}
          stroke={GVColors.$labelColor}
          yAxisId="right"
          isAnimationActive={false}
        />
        {/*
        //@ts-ignore*/}
        <Area
          dataKey="value"
          type="monotone"
          data={equity}
          connectNulls={true}
          stroke={areaStrokeColor}
          fill={`url(#equityProgramChartFill)`}
          strokeWidth={3}
          dot={false}
          yAxisId="left"
          unit="%"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

interface Props {
  equityChart: ChartSimple[];
  pnlChart: any;
  currency: CURRENCIES;
}

export default React.memo(ProgramProfitChart);
