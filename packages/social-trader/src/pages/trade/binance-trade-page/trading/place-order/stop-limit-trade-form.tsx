import { isAllow } from "components/deposit/components/deposit.helpers";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { ReduceOnlyField } from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/reduce-only-field/reduce-only-field";
import {
  TIME_IN_FORCE_VALUES,
  TimeInForceField
} from "pages/trade/binance-trade-page/trading/place-order/place-order-settings/time-in-force-field/time-in-force-field";
import { PlaceOrderSlider } from "pages/trade/binance-trade-page/trading/place-order/place-order-slider";
import { PlaceOrderSubmitButton } from "pages/trade/binance-trade-page/trading/place-order/place-order-submit-button";
import {
  AssetBalance,
  ExchangeInfo,
  OrderSide
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import {
  convertShapeToRules,
  minMaxNumberShape
} from "utils/validators/validators";

import { usePlaceOrderAutoFill } from "./hooks/place-order-auto-fill.hook";
import { usePlaceOrderFormReset } from "./hooks/place-order-form-reset.hook";
import { usePlaceOrderInfo } from "./hooks/place-order-info-hook";
import { getBalance } from "./place-order.helpers";
import {
  IPlaceOrderHandleSubmitValues,
  IStopLimitFormValues,
  TRADE_FORM_FIELDS
} from "./place-order.types";
import { tradeNumberShape } from "./place-order-validation";

export interface IStopLimitTradeFormProps {
  status: API_REQUEST_STATUS;
  outerPrice: string;
  side: OrderSide;
  onSubmit: (values: IPlaceOrderHandleSubmitValues) => any;
}

const _StopLimitTradeForm: React.FC<
  IStopLimitTradeFormProps & {
    balances: AssetBalance[];
    exchangeInfo: ExchangeInfo;
  }
> = ({ status, balances, exchangeInfo, outerPrice, onSubmit, side }) => {
  const [t] = useTranslation();

  const {
    tickSize,
    stepSize,
    symbol: { baseAsset, quoteAsset },
    terminalType
  } = useContext(TerminalInfoContext);
  const { currentPositionMode } = useContext(TerminalPlaceOrderContext);

  const isFutures = terminalType === "futures";

  const {
    minPrice,
    maxPrice,
    minQuantity,
    minNotional,
    maxQuantityWithWallet,
    maxTotalWithWallet
  } = usePlaceOrderInfo({
    balances,
    side,
    exchangeInfo
  });

  const form = useForm<IStopLimitFormValues>({
    defaultValues: {
      [TRADE_FORM_FIELDS.timeInForce]: TIME_IN_FORCE_VALUES[0].value,
      [TRADE_FORM_FIELDS.stopPrice]: outerPrice,
      [TRADE_FORM_FIELDS.price]: outerPrice
    },
    mode: "onChange"
  });
  const { triggerValidation, watch, setValue, reset } = form;
  const { quantity, total, price } = watch();

  const { sliderValue, setSliderValue } = usePlaceOrderFormReset({
    status,
    triggerValidation,
    outerPrice,
    watch,
    reset,
    side,
    setValue,
    balances,
    quantityName: TRADE_FORM_FIELDS.quantity
  });

  usePlaceOrderAutoFill({
    buyWalletAvailable: getBalance(balances, quoteAsset),
    sellWalletAvailable: getBalance(balances, baseAsset),
    setSliderValue,
    side,
    totalName: TRADE_FORM_FIELDS.total,
    quantityName: TRADE_FORM_FIELDS.quantity,
    setValue,
    price,
    quantity,
    total
  });

  return (
    <HookForm
      resetOnSuccess
      form={form}
      onSubmit={values => onSubmit({ ...values, type: "TakeProfitLimit" })}
    >
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Stop")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.stopPrice}
          rules={convertShapeToRules(
            tradeNumberShape({
              t,
              min: 0,
              max: Number.MAX_SAFE_INTEGER,
              divider: +tickSize
            })
          )}
        />
      </Row>
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Limit")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.price}
          rules={convertShapeToRules(
            tradeNumberShape({
              t,
              min: minPrice,
              max: maxPrice,
              divider: +tickSize
            })
          )}
        />
      </Row>
      <Row>
        <HookFormAmountField
          autoFocus={false}
          label={t("Amount")}
          currency={baseAsset}
          name={TRADE_FORM_FIELDS.quantity}
          rules={convertShapeToRules(
            tradeNumberShape({
              t,
              min: minQuantity,
              max: maxQuantityWithWallet,
              divider: +stepSize
            })
          )}
        />
      </Row>
      <Row wide onlyOffset>
        <PlaceOrderSlider value={sliderValue} setValue={setSliderValue} />
      </Row>
      <Row size={"small"}>
        <HookFormAmountField
          externalDirty={true}
          autoFocus={false}
          isAllowed={isAllow("BTC")}
          label={isFutures ? t("Cost") : t("Total")}
          currency={quoteAsset}
          name={TRADE_FORM_FIELDS.total}
          rules={convertShapeToRules(
            minMaxNumberShape({
              t,
              max: maxTotalWithWallet,
              min: minNotional
            })
          )}
        />
      </Row>
      <Row>
        <PlaceOrderSubmitButton
          isSuccessful={status === "SUCCESS"}
          side={side}
          asset={baseAsset}
        />
      </Row>
      <Row size={"small"}>
        <RowItem wide>
          <TimeInForceField orderType={"TakeProfitLimit"} />
        </RowItem>
        {isFutures && currentPositionMode === "OneWay" && (
          <RowItem wide>
            <ReduceOnlyField />
          </RowItem>
        )}
      </Row>
    </HookForm>
  );
};

export const StopLimitTradeForm = React.memo(_StopLimitTradeForm);
