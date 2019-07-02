import "./wallet-balance/wallet-balance.scss";

import * as React from "react";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Page from "shared/components/page/page";
import SvgLoader from "shared/components/svg-loader/svg-loader";

import WalletBalanceButtonsLoader from "./wallet-balance/wallet-balance-buttons-loader";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletTablesLoader from "./wallet-tables/wallet-tables-loader";

const WalletLoader = () => (
  <Page title={""}>
    <div className="wallet-balance">
      <WalletTitleLoader />
      <WalletBalanceLoader />
      <WalletTablesLoader />
    </div>
  </Page>
);

const WalletTitleLoader: React.FC = () => (
  <div className="wallet-balance__wrapper">
    <h1 className="wallet-balance__title">
      <SvgLoader width={210} height={32}>
        <rect x="0" y="0" width="100" height="32" rx="8" ry="8" />
        <rect x="110" y="0" width="100" height="32" rx="8" ry="8" />
      </SvgLoader>
      <WalletImage
        imageClassName="wallet-balance__title-icon"
        alt={""}
        url={""}
      />
    </h1>
    <WalletBalanceButtonsLoader />
  </div>
);

export default WalletLoader;
