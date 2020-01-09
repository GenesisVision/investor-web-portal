import { getEquityChartLoaderData } from "components/multi-chart/service/multi-chart.service";
import { ASSETS_TYPES } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ASSET, IDashboardAssetChart } from "constants/constants";
import { AssetType, MoneyLocation } from "gv-api-web";
import {
  TDashboardEvent,
  TDashboardInRequests,
  TDashboardRequest,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TRecommendation
} from "pages/dashboard/dashboard.types";
import {
  getRandomColor,
  getRandomInteger,
  getRandomText,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";

export const getInRequestsData = (): TDashboardRequest => ({
  id: "",
  date: new Date(),
  amount: getRandomInteger(-1000, 1000),
  currency: "GVT",
  type: "Invest",
  status: "Cancelled",
  canCancelRequest: false,
  assetDetails: {
    entryFee: 0,
    isWithdrawAll: false,
    successFee: 0,
    exitFee: 0,
    withdrawPercent: 0,
    id: "",
    logo: "",
    color: "",
    title: "",
    url: "",
    assetType: "Follow",
    programDetails: {
      level: 0,
      levelProgress: 0
    }
  }
});
export const getInRequestsLoadersData = (): TDashboardInRequests =>
  tableLoaderCreator(getInRequestsData, 3);

export const getTradingTotalLoaderData = (): TDashboardTradingStatistic =>
  ({
    // total: getRandomInteger(-1000, 1000),
    equity: getRandomInteger(-1000, 1000),
    aum: getRandomInteger(-1000, 1000)
  } as TDashboardTradingStatistic);

export const getTradingEventsLoaderData = () => {
  const length = getRandomInteger(1, 4);
  return {
    items: tableLoaderCreator(getEventLoaderData, length),
    total: length
  };
};

export const getTradingPublicLoaderData = () => {
  const length = getRandomInteger(5, 15);
  return {
    items: tableLoaderCreator(getRecommendationLoaderData, length),
    total: length
  };
};

export const getTradingFollowLoaderData = () => {
  const length = getRandomInteger(5, 15);
  return {
    items: tableLoaderCreator(
      () => ({ ...getRecommendationLoaderData(), type: ASSET.FOLLOW }),
      getRandomInteger(5, 15)
    ),
    total: length
  };
};

export const getTradingLoaderData = () => ({
  total: getTradingTotalLoaderData(),
  public: getTradingPublicLoaderData(),
  personal: getTradingPublicLoaderData(),
  followThem: getTradingFollowLoaderData()
});

export const DashboardChartValueLoaderData: IDashboardAssetChart = {
  type: ASSETS_TYPES.Fund,
  id: "",
  title: "",
  currency: "GVT",
  equityChart: [],
  pnLChart: []
};

export const assetsLoaderData = () => {
  let sum = 100;
  return tableLoaderCreator((item, i, { length }) => {
    const value = getRandomInteger(Math.round(sum / 4), Math.round(sum / 3));
    sum -= value;
    return {
      name: getRandomText({ length: 3 }),
      percent: i === length - 1 ? sum + value : value,
      color: getRandomColor()
    };
  }, 5);
};

export const portfolioLoaderData = (): Array<MoneyLocation> => {
  let sum = 100;
  const names = ["Funds", "Programs", "Trading", "Wallet"];
  return tableLoaderCreator((item, i, { length }) => {
    const value = getRandomInteger(Math.round(sum / 4), Math.round(sum / 3));
    sum -= value;
    return {
      name: names[i],
      percent: i === length - 1 ? sum + value : value,
      color: getRandomColor()
    };
  }, 4);
};

export const getTradingStatisticLoaderData = (): TDashboardTradingStatistic => ({
  equity: getRandomInteger(-10000, 10000),
  aum: getRandomInteger(-10000, 10000),
  total: 100,
  profits: {
    day: {
      profit: 0,
      profitPercent: 0
    },
    week: {
      profit: 0,
      profitPercent: 0
    },
    month: {
      profit: 0,
      profitPercent: 0
    }
  },
  events: getTradingEventsLoaderData()
});

const getEventLoaderData = (): TDashboardEvent => ({
  icon: "",
  assetDetails: {
    id: "",
    logo: "",
    color: "",
    title: "",
    url: "",
    assetType: (getRandomAsset() as unknown) as AssetType,
    programDetails: { level: 0, levelProgress: 0 }
  },
  currency: "GVT",
  changeState: "NotChanged",
  extendedInfo: [{ title: "", amount: 0, currency: "GVT" }],
  feesInfo: [
    {
      title: "",
      description: "",
      type: "Undefined",
      amount: 0,
      currency: "GVT"
    }
  ],
  totalFeesAmount: 0,
  totalFeesCurrency: "GVT",
  date: new Date(),
  title: getRandomWords(3),
  amount: getRandomInteger(-10000, 10000)
});

const getRandomAsset = () =>
  [ASSET.FUND, ASSET.PROGRAM, ASSET.FOLLOW][getRandomInteger(0, 2)];

export const getRecommendationLoaderData = (): TRecommendation => {
  return {
    brokerType: "MetaTrader5",
    tags: [],
    personalDetails: {
      isOwnAsset: false,
      isFavorite: false
    },
    owner: {
      id: "",
      username: "",
      url: ""
    },
    status: "",
    tradesCount: 0,
    subscribersCount: 0,
    description: "",
    creationDate: new Date(),
    isExternal: false,
    leverageMax: getRandomInteger(-10000, 10000),
    leverageMin: getRandomInteger(-10000, 10000),
    brokerId: "",
    currency: "GVT",
    statistic: {
      chart: getEquityChartLoaderData(),
      profit: getRandomInteger(-10000, 10000),
      drawdown: getRandomInteger(-10000, 10000)
    },
    id: "",
    logo: "",
    title: getRandomText({ length: 7 }),
    url: "",
    color: getRandomColor()
  };
};

export const getTotalLoaderData = (): TDashboardTotal => ({
  total: getRandomInteger(1, 10000),
  trading: getRandomInteger(-10000, 10000),
  invested: getRandomInteger(-10000, 10000),
  wallets: getRandomInteger(-10000, 10000),
  profits: {
    day: {
      profit: 0,
      profitPercent: 0
    },
    week: {
      profit: 0,
      profitPercent: 0
    },
    month: {
      profit: 0,
      profitPercent: 0
    }
  }
});
