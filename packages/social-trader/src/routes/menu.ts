import GVLogo from "components/gv-logo/gv-logo";
import { DashboardIcon } from "components/icon/dashboard-icon";
import { DetailsIcon } from "components/icon/details-icon";
import { FollowIcon } from "components/icon/follow-icon";
import { FundsIcon } from "components/icon/funds-icon";
import { HistoryIcon } from "components/icon/history-icon";
import { InvestIcon } from "components/icon/invest-icon";
import { Mt4Icon } from "components/icon/mt4-icon";
import { Mt5Icon } from "components/icon/mt5-icon";
import { ProgramsIcon } from "components/icon/programs-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import { StatisticIcon } from "components/icon/statistic-icon";
import { TradeArrowsIcon } from "components/icon/trade-arrows-icon";
import { TradeIcon } from "components/icon/trade-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "components/profile/profile.constants";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.routes";
import * as React from "react";

import { HOME_ROUTE } from "./app.routes";
import {
  EVENTS_ROUTE,
  FINANCIAL_STATISTIC_ROUTE,
  INVESTMENTS_ROUTE,
  OVERVIEW_ROUTE,
  TRADING_ROUTE
} from "./dashboard.routes";
import {
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE,
  INVEST_ROUTE
} from "./invest.routes";
import {
  META_TRADER_4_ROUTE,
  META_TRADER_5_ROUTE,
  TRADE_ROUTE
} from "./trade.routes";

export type TMenuItem = {
  route?: string;
  Icon: React.ComponentType<any>;
  label?: string;
  children?: TMenuItem[];
};

const advancedMobileMenuItems: TMenuItem[] = [
  {
    Icon: DetailsIcon,
    route: PROFILE_ROUTE,
    label: "navigation.personal-details"
  },
  {
    Icon: WalletIcon,
    route: WALLET_TOTAL_PAGE_ROUTE,
    label: "navigation.wallet"
  },
  { Icon: SettingsIcon, route: SETTINGS_ROUTE, label: "navigation.settings" }
];

const mainMenuItemsUnion = [
  {
    Icon: DashboardIcon,
    label: "navigation.dashboard",
    route: OVERVIEW_ROUTE,
    children: [
      /*{
        Icon: SearchIcon,
        route: OVERVIEW_ROUTE,
        label: "navigation.overview"
      },*/
      { Icon: HistoryIcon, route: EVENTS_ROUTE, label: "navigation.events" },
      {
        Icon: InvestIcon,
        route: INVESTMENTS_ROUTE,
        label: "navigation.investments"
      },
      {
        Icon: TradeArrowsIcon,
        route: TRADING_ROUTE,
        label: "navigation.trading"
      },
      {
        Icon: StatisticIcon,
        route: FINANCIAL_STATISTIC_ROUTE,
        label: "navigation.financial-statistic"
      }
    ]
  },
  {
    Icon: InvestIcon,
    label: "navigation.invest",
    route: INVEST_ROUTE,
    children: [
      {
        Icon: FollowIcon,
        route: GV_FOLLOW_ROUTE,
        label: "navigation.gv-follow"
      },
      {
        Icon: FundsIcon,
        route: GV_FUNDS_ROUTE,
        label: "navigation.gv-funds"
      },
      {
        Icon: ProgramsIcon,
        route: GV_PROGRAMS_ROUTE,
        label: "navigation.gv-programs"
      }
    ]
  },
  {
    Icon: TradeIcon,
    label: "navigation.trade",
    route: TRADE_ROUTE,
    children: [
      {
        Icon: Mt5Icon,
        route: META_TRADER_5_ROUTE,
        label: "navigation.mt5"
      }
    ]
  }
];
export const topMenuItems: TMenuItem[] = [
  { Icon: GVLogo, route: HOME_ROUTE },
  ...mainMenuItemsUnion
];

export const mobileMenuItems: TMenuItem[] = [
  ...mainMenuItemsUnion,
  ...advancedMobileMenuItems
];
