import { Slider } from "components/range/range";
import {
  MAX_TRADE_SLIDER_VALUE,
  SetSliderValueFunc
} from "pages/trade/binance-trade-page/trading/place-order/hooks/place-order-slider.hook";
import React, { useCallback } from "react";

import { RANGE_MARKS } from "./place-order.helpers";

export interface IPlaceOrderSliderProps {
  value?: number;
  setValue: SetSliderValueFunc;
}

const _PlaceOrderSlider: React.FC<IPlaceOrderSliderProps> = ({
  value,
  setValue
}) => {
  return (
    <Slider
      min={0}
      max={MAX_TRADE_SLIDER_VALUE}
      marks={RANGE_MARKS}
      value={value}
      onChange={useCallback((value: number) => setValue(value), [setValue])}
    />
  );
};

export const PlaceOrderSlider = React.memo(_PlaceOrderSlider);
