import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPercent } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import { CurrencyEnum } from "shared/utils/types";

const _FundAsset: React.FC<Props> = ({
  name,
  percent,
  currency,
  type,
  last,
  removable,
  removeHandle,
  icon,
  className,
  ...other
}) => {
  switch (type) {
    case FUND_ASSET_TYPE.TEXT:
      return (
        <div {...other}>
          {currency}
          {!last && <span>,&nbsp;</span>}
        </div>
      );
    default:
      return (
        <div
          {...other}
          className={classNames(
            "fund-asset",
            "fund-asset--default",
            className,
            {
              "fund-asset--large": type === FUND_ASSET_TYPE.LARGE
            }
          )}
        >
          <FundAssetImage url={icon} alt={currency} />
          {currency && (
            <div className="fund-asset__currencies">
              {type === FUND_ASSET_TYPE.LARGE && (
                <div className="fund-asset__currency-full">
                  {name || CURRENCY_VALUES[currency]}
                </div>
              )}
              {type !== FUND_ASSET_TYPE.SHORT && (
                <div className="fund-asset__currency-short">{currency}</div>
              )}
            </div>
          )}
          <div className="fund-asset__percent">
            <NumberFormat value={percent} suffix="%" displayType="text" />
          </div>
          {removable && removeHandle && (
            <div
              className="fund-asset__remove-button"
              onClick={removeHandle(currency)}
            >
              +
            </div>
          )}
        </div>
      );
  }
};

export enum FUND_ASSET_TYPE {
  LARGE = "large",
  MIDDLE = "middle",
  SHORT = "short",
  TEXT = "text"
}

interface Props extends FundAssetPercent {
  currency: CurrencyEnum;
  type: FUND_ASSET_TYPE;
  last: boolean;
  removable?: boolean;
  removeHandle?(
    currency: CurrencyEnum
  ): (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const FundAsset = React.memo(_FundAsset);
export default FundAsset;
