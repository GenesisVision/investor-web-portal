import { mockDate } from "components/details/details.loader-data";
import { AssetDetails } from "gv-api-web";
import { AccountSubscriptionsDataType } from "pages/accounts/account-details/services/account-details.types";
import {
  getRandomInteger,
  getRandomWord,
  tableLoaderCreator
} from "utils/helpers";

export const statisticDataLoaderData = {
  statisticCurrency: "",
  statistic: {
    equityChart: [],
    totalProgramCurrencyProfit: getRandomInteger(),
    timeframeProgramCurrencyProfit: getRandomInteger(),
    programCurrency: "GVT",
    trades: getRandomInteger(),
    successTradesPercent: getRandomInteger(),
    profitFactor: getRandomInteger(),
    periods: [],
    lastPeriodStarts: mockDate,
    lastPeriodEnds: mockDate,
    tradingVolume: getRandomInteger(),
    totalGvtProfit: getRandomInteger(),
    timeframeGvtProfit: getRandomInteger(),
    balance: getRandomInteger(),
    investors: getRandomInteger(),
    profitChangePercent: getRandomInteger(),
    sharpeRatio: getRandomInteger(),
    sortinoRatio: getRandomInteger(),
    calmarRatio: getRandomInteger(),
    maxDrawdown: getRandomInteger(),
    rate: getRandomInteger()
  }
};

export const assetInfoLoaderData: AssetDetails = {
  id: "",
  logoUrl: "",
  color: "",
  title: "",
  url: "",
  assetType: "Follow",
  programDetails: {
    successFeeSelected: 0,
    successFeeCurrent: 0,
    managementFeeSelected: 0,
    managementFeeCurrent: 0,
    level: 0,
    levelProgress: 0
  }
};

export const getAccountSubscriptionLoaderData = (): AccountSubscriptionsDataType => ({
  successFeePersonal: 0,
  volumeFeePersonal: 0,
  detachMode: "None",
  unsubscriptionDate: new Date(),
  isExternal: false,
  subscriptionDate: new Date(),
  subscriberInfo: {
    asset: assetInfoLoaderData,
    tradingAccountId: getRandomWord(),
    tradingAccountLogin: getRandomWord()
  },
  asset: assetInfoLoaderData,
  status: "",
  hasSignalAccount: false,
  hasActiveSubscription: false,
  mode: "Percent",
  percent: getRandomInteger(0, 100),
  openTolerancePercent: getRandomInteger(0, 100),
  fixedVolume: getRandomInteger(0, 100),
  fixedCurrency: "USD",
  totalProfit: getRandomInteger(0, 100),
  totalVolume: getRandomInteger(0, 100)
});

export const getAccountSubscriptionsLoaderData = (): AccountSubscriptionsDataType[] =>
  tableLoaderCreator(getAccountSubscriptionLoaderData, 3);
