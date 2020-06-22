import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import {
  ManagerHistoryItem,
  ManagerHistoryRow
} from "components/manager/manager-history/manager-history-row";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { RowItem } from "components/row-item/row-item";
import { ASSET } from "constants/constants";
import { FundDetailsListItem } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

import styles from "./manager-history-row.module.scss";

interface IManagerHistoryRowProps {
  asset: FundDetailsListItem;
}

const _ManagerFundHistoryRow: React.FC<IManagerHistoryRowProps> = ({
  asset
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeFundsDetailsUrl(asset.url),
    FUND_DETAILS_FOLDER_ROUTE
  );
  return (
    <ManagerHistoryRow
      asset={asset}
      assetType={ASSET.PROGRAM}
      avatarBlock={
        <Link to={linkProps}>
          <AssetAvatarWithName
            url={asset.logoUrl}
            alt={asset.title}
            color={asset.color}
            name={<>{asset.title}</>}
          />
        </Link>
      }
      tileBlock={
        <FundAssetContainer
          noWrap
          assets={asset.topFundAssets}
          type={FUND_ASSET_TYPE.SHORT}
          size={3}
          length={asset.totalAssetsCount}
        />
      }
      dataBlock={
        <>
          <ManagerHistoryItem label={t("header-fields.balance")}>
            <NumberFormat
              value={formatCurrencyValue(
                asset.balance.amount,
                asset.balance.currency
              )}
              suffix={` ${asset.balance.currency}`}
              displayType="text"
            />
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.investors")}>
            {asset.investorsCount}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.age")}>
            {distanceDate(asset.creationDate)}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.drawdown")}>
            <NumberFormat
              value={formatValue(asset.statistic.drawdown, 2)}
              suffix="%"
              displayType="text"
            />
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.profit")}>
            <Profitability
              value={formatValue(asset.statistic.profit, 2)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatValue(asset.statistic.profit, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </ManagerHistoryItem>
          <RowItem
            bottomOffset
            className={styles["manager-history-row__chart"]}
          >
            <ProgramSimpleChart data={asset.statistic?.chart} />
          </RowItem>
        </>
      }
    />
  );
};

export const ManagerFundHistoryRow = React.memo(_ManagerFundHistoryRow);
