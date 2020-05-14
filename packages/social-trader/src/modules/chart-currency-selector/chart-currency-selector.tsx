import { Row } from "components/row/row";
import { ChartCurrencySelectorItem } from "modules/chart-currency-selector/chart-currency-selector-item";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector.types";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import AddCurrencyButton from "./add-currency-button";

interface Props {
  fullSelectCurrencies?: CurrencyEnum[];
  selectCurrencies: CurrencyEnum[];
  maxCharts?: number;
  chartCurrencies: TChartCurrency[];
  onAdd: TAddChartCurrency;
  onRemove: TRemoveChartCurrency;
  onChange: TChangeChartCurrency;
}

const _ChartCurrencySelector: React.FC<Props> = ({
  fullSelectCurrencies,
  maxCharts = 2,
  selectCurrencies,
  chartCurrencies,
  onAdd,
  onRemove,
  onChange
}) => {
  return (
    <Row>
      {chartCurrencies.map(({ name, color }, i) => (
        <ChartCurrencySelectorItem
          key={i}
          i={i}
          name={name}
          color={color}
          fullSelectCurrencies={fullSelectCurrencies}
          selectCurrencies={selectCurrencies}
          onRemove={onRemove}
          onChange={onChange}
        />
      ))}
      {chartCurrencies.length < maxCharts && (
        <AddCurrencyButton onAdd={onAdd} currencies={selectCurrencies} />
      )}
    </Row>
  );
};

const ChartCurrencySelector = React.memo(_ChartCurrencySelector);
export default ChartCurrencySelector;
