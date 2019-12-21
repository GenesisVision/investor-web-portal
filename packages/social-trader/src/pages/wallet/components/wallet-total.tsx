import Page from "components/page/page";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { WalletSummary } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

import { WalletRouteProps } from "../wallet.routes";
import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletSettingsContainer from "./wallet-settings/wallet-settings-container";
import WalletTablesTotal from "./wallet-tables/wallet-tables-total";

const _WalletTotal: React.FC<Props & WalletRouteProps> = ({ data: wallet }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("wallet-page.title")}>
      <div className="wallet-balance">
        <div className="wallet-balance__wrapper">
          <h1 className="wallet-balance__title">{t("wallet-page.title")}</h1>
          <WalletSettingsContainer isPayFeesWithGvt={wallet.payFeesWithGvt} />
        </div>
        <WalletBalanceElements
          available={wallet.grandTotal.available}
          pending={wallet.grandTotal.trading}
          total={wallet.grandTotal.total}
          invested={wallet.grandTotal.invested}
          currency={wallet.grandTotal.currency}
        />
        <WalletTablesTotal wallets={wallet.wallets} />
      </div>
    </Page>
  );
};

interface Props {
  data: WalletSummary;
}

const WalletTotal = compose<
  React.ComponentType<Props & WithBlurLoaderProps<WalletSummary>>
>(
  withBlurLoader,
  React.memo
)(_WalletTotal);
export default WalletTotal;
