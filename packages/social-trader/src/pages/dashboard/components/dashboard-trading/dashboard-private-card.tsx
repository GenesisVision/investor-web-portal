import GVButton from "components/gv-button";
import Hint from "components/hint/hint";
import Link from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import { DashboardTradingAsset } from "gv-api-web";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import CloseAssetButton from "modules/asset-settings/close-asset/close-asset-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import * as React from "react";
import { useContext } from "react";
import NumberFormat from "react-number-format";
import { META_TRADER_4_ROUTE } from "routes/trade.routes";
import {
  ASSET,
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import { composeAccountDetailsUrl } from "utils/compose-url";
import { formatValueDifferentDecimalScale } from "utils/formatter";

const _DashboardPrivateCard: React.FC<Props> = ({ asset }) => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const makeSignalLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.SIGNAL
  });
  const terminalLink = {
    pathname: META_TRADER_4_ROUTE,
    state: `/ ${title}`
  };
  const makeSignalAccountLink = {
    pathname: makeSignalLinkMethod(asset.id),
    state: `/ ${title}`
  };
  const makeProgramExternalLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.EXTERNAL_ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramExternalLink = {
    pathname: makeProgramExternalLinkMethod(asset.id),
    state: `/ ${title}`
  };
  const renderActions = ({
    anchor,
    clearAnchor
  }: {
    anchor: TAnchor;
    clearAnchor: (event: TEvent) => void;
  }) => (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={clearAnchor}
    >
      <div className="popover-list">
        <Link to={terminalLink}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("dashboard-page.trading.actions.terminal")}
          </GVButton>
        </Link>
        {asset.actions
          .canMakeSignalProviderFromPrivateExternalTradingAccount && (
          <Link to={makeProgramExternalLink}>
            <GVButton variant="text" color="secondary" onClick={clearAnchor}>
              {t("dashboard-page.trading.actions.make-program")}
            </GVButton>
          </Link>
        )}
        <MakeProgramButton
          canMake={asset.actions.canMakeProgramFromPrivateTradingAccount}
          id={asset.id}
          title={title}
          clearAnchor={clearAnchor}
        />
        {asset.actions.canMakeSignalProviderFromPrivateTradingAccount && (
          <Link to={makeSignalAccountLink}>
            <GVButton variant="text" color="secondary" onClick={clearAnchor}>
              {t("dashboard-page.trading.actions.make-signal-account")}
            </GVButton>
          </Link>
        )}
        <CloseAssetButton
          type={"account" as ASSET}
          id={asset.id}
          variant={"text"}
        />
      </div>
    </Popover>
  );
  const detailsLink = {
    pathname: composeAccountDetailsUrl(asset.id),
    state: `/ ${title}`
  };
  return (
    <TableCard
      detailsUrl={detailsLink}
      assetId={asset.id}
      profit={asset.statistic.profit}
      chart={asset.statistic.chart}
      title={asset.accountInfo.title}
      logo={asset.broker.logo}
      renderActions={renderActions}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.equity")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.balance,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${asset.accountInfo.currency}`}
              displayType="text"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.leverage")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.leverage,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.age")}>
            {distanceDate(asset.accountInfo.creationDate)}
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
    </TableCard>
  );
};

interface Props {
  asset: DashboardTradingAsset;
}

const MakeProgramButton: React.FC<{
  canMake: boolean;
  id: string;
  title: string;
  clearAnchor: (event: TEvent) => void;
}> = React.memo(({ canMake, id, title, clearAnchor }) => {
  const [t] = useTranslation();
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = {
    pathname: makeProgramLinkMethod(id),
    state: `/ ${title}`
  };
  const label = t("dashboard-page.trading.actions.make-program");
  return canMake ? (
    <Link to={makeProgramLink}>
      <GVButton variant="text" color="secondary" onClick={clearAnchor}>
        {label}
      </GVButton>
    </Link>
  ) : (
    <GVButton variant="text" color="secondary">
      <Hint
        content={label}
        className="dashboard-trading__disable-button"
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        tooltipContent={t("manager.program-settings.trades-update.text")}
      />
    </GVButton>
  );
});

const DashboardPrivateCard = React.memo(_DashboardPrivateCard);
export default DashboardPrivateCard;
