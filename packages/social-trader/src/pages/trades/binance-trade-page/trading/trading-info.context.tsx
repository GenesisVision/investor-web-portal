import useApiRequest from "hooks/api-request.hook";
import Router from "next/router";
import { TYPE_PARAM_NAME } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  filterOutboundAccountInfoStream,
  stringifySymbolFromToParam,
  updateAccountInfo,
  useTradeAuth
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Account,
  ExchangeInfo,
  TerminalType,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import * as qs from "qs";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { BINANCE_ROUTE } from "routes/trade.routes";
import { Observable } from "rxjs";
import { useSockets } from "services/websocket.service";

interface Props {
  outerSymbol?: SymbolState;
  type?: TerminalType;
}

export type SymbolState = {
  quoteAsset: TradeCurrency;
  baseAsset: TradeCurrency;
};

type TradingAccountInfoState = {
  terminalType: TerminalType;
  userStream?: Observable<any>;
  setSymbol: (symbol: SymbolState) => void;
  symbol: SymbolState;
  accountInfo?: Account;
  exchangeInfo?: ExchangeInfo;
};

const SymbolInitialState: SymbolState = {
  quoteAsset: "USDT",
  baseAsset: "BTC"
};

export const TradingAccountInfoInitialState: TradingAccountInfoState = {
  terminalType: "spot",
  setSymbol: () => {},
  symbol: SymbolInitialState
};

export const TradingInfoContext = createContext<TradingAccountInfoState>(
  TradingAccountInfoInitialState
);

export const TradingInfoContextProvider: React.FC<Props> = ({
  outerSymbol = SymbolInitialState,
  type,
  children
}) => {
  const [terminalType, setTerminalType] = useState<TerminalType>(
    type || "spot"
  );
  const {
    getExchangeInfo,
    getAccountInformation,
    getUserStreamKey,
    getUserStreamSocket
  } = useContext(TerminalMethodsContext);
  const { authData } = useTradeAuth();
  const { connectSocket } = useSockets();

  const { data: exchangeInfo } = useApiRequest<ExchangeInfo>({
    request: getExchangeInfo,
    fetchOnMount: true
  });

  const [userStreamKey, setUserStreamKey] = useState<string | undefined>();
  const [userStream, setUserStream] = useState<Observable<any> | undefined>();
  const [symbol, setSymbol] = useState<SymbolState>(outerSymbol);
  const [accountInfo, setAccountInfo] = useState<Account | undefined>();
  const [socketData, setSocketData] = useState<Account | undefined>(undefined);

  useEffect(() => {
    if (type) setTerminalType(type);
  }, [type]);

  useEffect(() => {
    if (!authData.publicKey) return;
    const accountInfo = getAccountInformation(authData);
    accountInfo.subscribe(data => {
      setAccountInfo(data);
    });
    getUserStreamKey(authData).subscribe(({ listenKey }) =>
      setUserStreamKey(listenKey)
    );
  }, [authData]);

  useEffect(() => {
    if (!userStreamKey) return;
    const userStream = getUserStreamSocket(connectSocket, userStreamKey);
    setUserStream(userStream);
    const accountInfoStream = filterOutboundAccountInfoStream(userStream);
    accountInfoStream.subscribe(data => {
      setSocketData(data);
    });
  }, [userStreamKey]);

  useEffect(() => {
    if (!socketData || !accountInfo) return;
    const updatedData = updateAccountInfo(accountInfo, socketData);
    setAccountInfo(updatedData);
  }, [socketData]);

  const handleSetSymbol = useCallback(
    (newSymbol: SymbolState) => {
      setSymbol(newSymbol);
      const symbolPath = stringifySymbolFromToParam(newSymbol);
      const terminalTypeParam = qs.stringify({
        [TYPE_PARAM_NAME]: terminalType
      });
      const route = `${BINANCE_ROUTE}/${symbolPath}?${terminalTypeParam}`;
      Router.replace(route);
    },
    [setSymbol, terminalType]
  );

  const value = useMemo(
    () => ({
      terminalType,
      userStream,
      setSymbol: handleSetSymbol,
      symbol,
      accountInfo,
      exchangeInfo
    }),
    [
      terminalType,
      userStream,
      handleSetSymbol,
      symbol,
      accountInfo,
      exchangeInfo
    ]
  );

  return (
    <TradingInfoContext.Provider value={value}>
      {children}
    </TradingInfoContext.Provider>
  );
};