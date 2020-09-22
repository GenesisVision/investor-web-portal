import useApiRequest from "hooks/api-request.hook";
import { Terminal } from "pages/trades/binance-trade-page/trading/terminal";
import {
  SymbolInitialState,
  SymbolState,
  TerminalTypeInitialState
} from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  getSymbolFromState,
  stringifySymbolFromToParam,
  updateTerminalUrl
} from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  ExchangeInfo,
  TerminalAuthDataType,
  TerminalType
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useState } from "react";

export interface ITerminalContainerProps {
  exchangeAccountId?: string;
  authData?: TerminalAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

interface ITerminalPropsData {
  exchangeInfo?: ExchangeInfo;
  authData?: TerminalAuthDataType;
  terminalType?: TerminalType;
  symbol?: SymbolState;
}

const _TerminalContainer: React.FC<ITerminalContainerProps> = ({
  exchangeAccountId,
  authData,
  type = TerminalTypeInitialState,
  symbol
}) => {
  const { getExchangeInfo } = useContext(TerminalMethodsContext);

  const [isSymbolCorrect, setIsSymbolCorrect] = useState<boolean | undefined>();
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo | undefined>();

  const [checkInfo, setCheckInfo] = useState(false);
  const [updateExchangeInfo, setUpdateExchangeInfo] = useState(false);
  const [terminalPropsData, setTerminalPropsData] = useState<
    ITerminalPropsData
  >({});

  const { sendRequest } = useApiRequest<ExchangeInfo>({
    request: getExchangeInfo
  });

  useEffect(() => {
    setCheckInfo(true);
  }, [type, symbol]);

  useEffect(() => {
    if (checkInfo) setUpdateExchangeInfo(true);
    else setIsSymbolCorrect(undefined);
  }, [checkInfo]);

  useEffect(() => {
    if (updateExchangeInfo) sendRequest().then(setExchangeInfo);
  }, [updateExchangeInfo]);

  useEffect(() => {
    if (!updateExchangeInfo || !exchangeInfo) return;
    const isSymbolCorrect =
      !!symbol &&
      !!exchangeInfo.symbols.find(
        item => item.symbol === getSymbolFromState(symbol)
      );
    setIsSymbolCorrect(isSymbolCorrect);
    setUpdateExchangeInfo(false);
  }, [exchangeInfo]);

  useEffect(() => {
    if (isSymbolCorrect === false) {
      const route = stringifySymbolFromToParam(SymbolInitialState);
      updateTerminalUrl(route);
      setCheckInfo(false);
    } else if (isSymbolCorrect === true) {
      if (exchangeInfo) {
        setTerminalPropsData({
          authData,
          symbol,
          exchangeInfo,
          terminalType: type
        });
        setCheckInfo(false);
      }
    }
  }, [isSymbolCorrect, exchangeInfo]);

  const exchangeInfoProp = useMemo(() => terminalPropsData.exchangeInfo, [
    terminalPropsData
  ]);
  const authDataProp = useMemo(() => terminalPropsData.authData, [
    terminalPropsData
  ]);
  const symbolProp = useMemo(() => terminalPropsData.symbol, [
    terminalPropsData
  ]);
  const terminalTypeProp = useMemo(() => terminalPropsData.terminalType, [
    terminalPropsData
  ]);

  if (!exchangeInfoProp || !terminalTypeProp) return null;

  return (
    <Terminal
      exchangeAccountId={exchangeAccountId}
      exchangeInfo={exchangeInfoProp}
      authData={authDataProp}
      symbol={symbolProp}
      terminalType={terminalTypeProp}
    />
  );
};

export const TerminalContainer = React.memo(_TerminalContainer);
