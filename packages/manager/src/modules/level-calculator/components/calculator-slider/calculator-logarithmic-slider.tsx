import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";

import CalculatorSlider from "./calculator-slider";

const STEP = 0.0001;

const CalculatorLogarithmicSlider: React.FC<Props> = ({
  name,
  value,
  max,
  maxLabel,
  valueAdornment,
  title,
  className,
  tooltipContent,
  onChange
}) => {
  const handleChange = useCallback(
    (name: string, newValue: number) => {
      const val = Math.pow(newValue, 4);
      const t = max * val;
      onChange(name, +formatValue(t, 4));
    },
    [max, onChange]
  );

  const handleChangeValue = useCallback(
    (name: string, newValue: number) => {
      let newValueGuard = newValue;
      if (Number.isNaN(newValueGuard)) newValueGuard = 0;
      if (newValueGuard < 0) newValueGuard = 0;
      if (newValueGuard > max) newValueGuard = max;
      onChange(name, +formatValue(newValueGuard, 2));
    },
    [max, onChange]
  );

  const logarithmicValue = useCallback(
    value => {
      const val = value / max;
      let t = Math.pow(val, 1 / 4);
      return +formatValue(t, 4);
    },
    [max]
  );

  return (
    <CalculatorSlider
      name={name}
      min={0}
      max={1}
      step={STEP}
      value={logarithmicValue(value)}
      formattedValue={value}
      valueAdornment={valueAdornment}
      editableValue={true}
      title={title}
      minLabel={maxLabel || <NumberFormat value={0} displayType="text" />}
      maxLabel={
        maxLabel || (
          <NumberFormat value={max} displayType="text" thousandSeparator=" " />
        )
      }
      className={className}
      tooltipContent={tooltipContent}
      onChange={handleChange}
      onChangeValue={handleChangeValue}
    />
  );
};

export default CalculatorLogarithmicSlider;

interface Props {
  name: string;
  value: number;
  valueAdornment?: string;
  max: number;
  maxLabel?: React.ReactElement<any>;
  title?: React.ReactNode;
  className?: string;
  tooltipContent?: string;
  onChange(name: string, value: number): void;
}
