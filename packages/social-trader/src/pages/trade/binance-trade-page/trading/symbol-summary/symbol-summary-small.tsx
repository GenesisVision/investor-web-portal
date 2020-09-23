import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { BlurableLabeledValue } from "components/labeled-value/blurable-labeled-value";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import { MonoText } from "pages/trade/binance-trade-page/trading/components/mono-text/mono-text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradeStatefulValue } from "pages/trade/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { MarketWatchTooltipButton } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.tooltip";
import {
  getTickerSymbolLoaderData,
  useSymbolData
} from "pages/trade/binance-trade-page/trading/symbol-summary/symbol-summary.helpers";
import { TerminalTypeSwitcher } from "pages/trade/binance-trade-page/trading/symbol-summary/terminal-type-switcher";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { SymbolSummaryData } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import { diffDate } from "utils/dates";

interface Props {
  data: SymbolSummaryData;
}

export const SymbolSummarySmallBlock: React.FC = () => {
  return (
    <DefaultBlock size={"small"} roundedBorder={false} bordered>
      <SymbolSummarySmallContainer />
    </DefaultBlock>
  );
};

export const SymbolSummarySmallContainer: React.FC = () => {
  const symbolData = useSymbolData();
  return (
    <SymbolSummarySmallView
      data={symbolData!}
      loaderData={getTickerSymbolLoaderData()}
    />
  );
};

const _SymbolSummarySmallView: React.FC<Props> = ({
  data: {
    markPrice,
    tickerData: {
      eventTime,
      lastPrice,
      baseAsset,
      quoteAsset,
      priceChangePercent,
      priceChange,
      high,
      low,
      volume
    }
  }
}) => {
  const { stepSize, tickSize } = useContext(TerminalInfoContext);
  const renderSymbol = () => (
    <h5>
      {baseAsset}/{quoteAsset}
    </h5>
  );
  return (
    <Center>
      <RowItem size={"large"}>
        <ResponsiveContainer
          enabledScreens={["tablet", "landscape-tablet", "desktop"]}
        >
          <MarketWatchTooltipButton>{renderSymbol()}</MarketWatchTooltipButton>
        </ResponsiveContainer>
        <ResponsiveContainer enabledScreens={["large-desktop"]}>
          {renderSymbol()}
        </ResponsiveContainer>
      </RowItem>
      <RowItem>
        <Row>
          <h4>
            <MonoText>
              <TradeStatefulValue
                value={terminalMoneyFormat({
                  amount: lastPrice,
                  tickSize
                })}
                trigger={eventTime}
              />
            </MonoText>
          </h4>
        </Row>
        <Row size={"xsmall"}>
          <Text muted>
            <MonoText>
              {terminalMoneyFormat({ amount: lastPrice, tickSize })}
            </MonoText>
          </Text>
        </Row>
      </RowItem>
      {markPrice && (
        <>
          <RowItem>
            <LabeledValue
              size={"xsmall"}
              label={
                <TooltipLabel
                  labelText={"Mark Price"}
                  tooltipContent={
                    "The latest mark price for this contract. This is the price used for PNL and margin calculations, and may differ from the last price for the purposes of avoiding price manipulation."
                  }
                />
              }
            >
              <Text size={"xsmall"}>
                <MonoText>
                  {terminalMoneyFormat({
                    amount: markPrice.markPrice,
                    tickSize
                  })}
                </MonoText>
              </Text>
            </LabeledValue>
          </RowItem>
          <RowItem>
            <LabeledValue
              size={"xsmall"}
              label={
                <TooltipLabel
                  labelText={"Funding/8h"}
                  tooltipContent={
                    "The payment rate exchanged between the buyer and seller for the next funding."
                  }
                />
              }
            >
              <Text size={"xsmall"}>
                <MonoText>
                  {+markPrice.lastFundingRate} %{" "}
                  {diffDate(new Date(), markPrice.nextFundingTime).format(
                    "HH:mm:ss"
                  )}
                </MonoText>
              </Text>
            </LabeledValue>
          </RowItem>
        </>
      )}
      <RowItem>
        <LabeledValue size={"xsmall"} label={"24 Change"}>
          <MonoText>
            <Text
              size={"xsmall"}
              color={+priceChangePercent > 0 ? "green" : "red"}
            >
              {terminalMoneyFormat({ amount: priceChange, tickSize })}{" "}
              {terminalMoneyFormat({
                amount: priceChangePercent,
                digits: 2
              })}{" "}
              %
            </Text>
          </MonoText>
        </LabeledValue>
      </RowItem>
      <RowItem>
        <BlurableLabeledValue
          size={"xsmall"}
          isPending={!high}
          label={"24 High"}
        >
          <Text size={"xsmall"}>
            <MonoText>
              {terminalMoneyFormat({ amount: high, tickSize })}
            </MonoText>
          </Text>
        </BlurableLabeledValue>
      </RowItem>
      <RowItem>
        <BlurableLabeledValue size={"xsmall"} isPending={!low} label={"24 Low"}>
          <Text size={"xsmall"}>
            <MonoText>
              {terminalMoneyFormat({ amount: low, tickSize })}
            </MonoText>
          </Text>
        </BlurableLabeledValue>
      </RowItem>
      <RowItem>
        <LabeledValue size={"xsmall"} label={"24 Volume"}>
          <Text size={"xsmall"}>
            <MonoText>
              {terminalMoneyFormat({ amount: volume, tickSize: stepSize })}{" "}
              {quoteAsset}
            </MonoText>
          </Text>
        </LabeledValue>
      </RowItem>
      <RowItem>
        <TerminalTypeSwitcher />
      </RowItem>
    </Center>
  );
};
export const SymbolSummarySmallView = withBlurLoader(
  React.memo(_SymbolSummarySmallView)
);
