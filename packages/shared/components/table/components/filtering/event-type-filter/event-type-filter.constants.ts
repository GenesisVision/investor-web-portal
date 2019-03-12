import {
  IInvestorEventFilterValue,
  IManagerEventFilterValue
} from "../filter.type";

export const EVENT_TYPE_FILTER_NAME = "type";

export enum INVESTOR_EVENT_TYPE {
  All = "All",
  Invest = "Invest",
  Withdraw = "Withdraw",
  Profit = "Profit",
  Loss = "Loss",
  Reinvest = "Reinvest",
  Canceled = "Canceled",
  Ended = "Ended"
}

export enum MANAGER_EVENT_TYPE {
  All = "All",
  AssetStarted = "AssetStarted",
  ProgramPeriodStarts = "ProgramPeriodStarts",
  ProgramPeriodEnds = "ProgramPeriodEnds",
  InvestorInvest = "InvestorInvest",
  InvestorWithdraw = "InvestorWithdraw",
  ManagerInvest = "ManagerInvest",
  ManagerWithdraw = "ManagerWithdraw",
  AssetFinished = "AssetFinished",
  EntranceFee = "EntranceFee",
  ExitFee = "ExitFee"
}

export const INVESTOR_EVENT_TYPE_FILTER_VALUES: IInvestorEventFilterValue<
  INVESTOR_EVENT_TYPE
>[] = Object.values(INVESTOR_EVENT_TYPE).map(x => ({ value: x, label: x }));

export const MANAGER_EVENT_TYPE_FILTER_VALUES: IManagerEventFilterValue<
  INVESTOR_EVENT_TYPE
>[] = Object.values(MANAGER_EVENT_TYPE).map(x => ({
  value: x,
  labelKey: `manager.dashboard-page.portfolio-events.types.${x}`
}));

export const EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";
