import { CurrencyItem } from "components/currency-item/currency-item";
import { PlatformAsset, ProviderPlatformAssets } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { UpdateFilterFunc } from "../../table.types";
import TileFilter from "../tile-filter";
import TileFilterItem from "../tile-filter-item";
import styles from "./fund-asset-filter.module.scss";
import FundAssetPopover from "./fund-asset-popover";

export interface IFundAssetFilterProps {
  name: string;
  value: string[];
  values: PlatformAsset[];
  onChange: UpdateFilterFunc;
}

interface OwnProps {
  providers: Array<ProviderPlatformAssets>;
}

interface Props extends IFundAssetFilterProps, OwnProps {}

const _FundAssetFilter: React.FC<Props> = ({
  providers,
  name,
  values,
  value,
  onChange
}) => {
  const [t] = useTranslation();
  const selectedAssets = values
    .filter(x => value.includes(x.asset))
    .map(asset => (
      <TileFilterItem key={asset.id} id={asset.asset}>
        <CurrencyItem
          className={styles["fund-asset-filter__asset-name"]}
          logo={asset.logoUrl}
          name={asset.asset}
          small
        />
      </TileFilterItem>
    ));
  const notSelectedAssets = values.filter(x => !value.includes(x.asset));
  return (
    <TileFilter
      name={name}
      value={value}
      updateFilter={onChange}
      buttonTitle={t("filters.fund-asset.add")}
      selectedTiles={selectedAssets}
    >
      <FundAssetPopover providers={providers} values={notSelectedAssets} />
    </TileFilter>
  );
};

const FundAssetFilter = React.memo(_FundAssetFilter);
export default FundAssetFilter;
