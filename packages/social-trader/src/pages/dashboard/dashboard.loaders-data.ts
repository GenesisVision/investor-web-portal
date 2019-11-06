import * as faker from "faker";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import { getEquityChartLoaderData } from "shared/components/multi-chart/service/multi-chart.service";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ASSET, IDashboardAssetChart } from "shared/constants/constants";
import { getRandomInteger, tableLoaderCreator } from "shared/utils/helpers";

export const getTradingTotalLoaderData = () => ({
  total: getRandomInteger(-1000, 1000),
  equity: getRandomInteger(-1000, 1000),
  AUM: getRandomInteger(-1000, 1000)
});
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
      name: faker.finance.currencyCode(),
      percent: i === length - 1 ? sum + value : value,
      color: faker.internet.color()
    };
  }, getRandomInteger(4, 15));
};

export const portfolioLoaderData = () => {
  let sum = 100;
  const names = ["Funds", "Programs", "Trading", "Wallet"];
  return tableLoaderCreator((item, i, { length }) => {
    const value = getRandomInteger(Math.round(sum / 4), Math.round(sum / 3));
    sum -= value;
    return {
      name: names[i],
      percent: i === length - 1 ? sum + value : value,
      color: faker.internet.color()
    };
  }, 4);
};

export const getProgramStatisticLoaderData = () => ({
  equity: getRandomInteger(-10000, 10000),
  AUM: getRandomInteger(-10000, 10000),
  total: {
    day: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    week: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    month: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    }
  },
  events: tableLoaderCreator(getEventLoaderData, getRandomInteger(1, 10))
});

export const getInvestingStatisticLoaderData = () => ({
  balance: getRandomInteger(-10000, 10000),
  programs: getRandomInteger(-10000, 10000),
  funds: getRandomInteger(-10000, 10000),
  total: {
    day: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    week: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    month: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    }
  },
  events: tableLoaderCreator(getEventLoaderData, getRandomInteger(1, 10))
});

const getEventLoaderData = () => ({
  data: new Date(),
  description: faker.lorem.words(3),
  amount: getRandomInteger(-10000, 10000)
});

const getRandomAsset = () =>
  [ASSET.FUND, ASSET.PROGRAM, ASSET.FOLLOW][getRandomInteger(0, 2)];

export const getRecommendationLoaderData = (): TRecommendation => {
  const type = getRandomAsset();
  return {
    type,
    color: faker.internet.color(),
    level: type === ASSET.PROGRAM ? getRandomInteger(1, 7) : undefined,
    levelProgress:
      type === ASSET.PROGRAM ? getRandomInteger(1, 100) : undefined,
    logo: "",
    id: "",
    url: "",
    title: faker.name.lastName(),
    manager: {
      username: faker.name.lastName(),
      url: faker.name.lastName()
    },
    currency: "GVT",
    statistic: {
      ddown: getRandomInteger(-1000, 1000),
      leverage: getRandomInteger(-1000, 1000),
      age: getRandomInteger(-1000, 1000),
      balance: { amount: getRandomInteger(-1000, 1000), currency: "GVT" },
      profit: getRandomInteger(-1000, 1000),
      profitPercent: getRandomInteger(-1000, 1000)
    },
    value: getRandomInteger(-1000, 1000),
    chart: getEquityChartLoaderData(),
    login: type === ASSET.PROGRAM ? faker.name.lastName() : undefined,
    broker: type === ASSET.PROGRAM ? faker.name.lastName() : undefined
  };
};

export const getTotalLoaderData = () => ({
  day: {
    value: getRandomInteger(-10000, 10000),
    profit: getRandomInteger(-100, 100)
  },
  week: {
    value: getRandomInteger(-10000, 10000),
    profit: getRandomInteger(-100, 100)
  },
  month: {
    value: getRandomInteger(-10000, 10000),
    profit: getRandomInteger(-100, 100)
  }
});
