import classNames from "classnames";
import { SignalSubscriber } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import AssetStatusLabel from "shared/components/asset-status/asset-status-label";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import { DEFAULT_DECIMAL_SCALE, STATUS } from "shared/constants/constants";
import { formatDate } from "shared/utils/dates";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import SubscriptionsFeesTooltip from "./program-subscriptions-fees-tooltip";

const _ProgramSubscriptionsRow: React.FC<Props> = ({
  subscription,
  currency
}) => (
  <TableRow stripy>
    <TableCell>{subscription.number}</TableCell>
    <TableCell>{subscription.trades}</TableCell>
    <TableCell>
      <Profitability
        value={formatCurrencyValue(subscription.profit, currency)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatCurrencyValue(subscription.profit, currency)}
          thousandSeparator=" "
          displayType="text"
          allowNegative={false}
        />
      </Profitability>
    </TableCell>
    <TableCell className="subscription-fees">
      <SubscriptionsFeesTooltip subscription={subscription}>
        <span
          className={classNames({
            "fee-commission__value": subscription.totalCommissionAmount > 0
          })}
        >
          {formatValue(
            subscription.totalCommissionAmount,
            DEFAULT_DECIMAL_SCALE
          )}
        </span>
      </SubscriptionsFeesTooltip>
    </TableCell>
    <TableCell>{subscription.volume}</TableCell>
    <TableCell>{formatDate(subscription.subscriptionDate)}</TableCell>
    <TableCell>
      {subscription.unsubscriptionDate &&
        formatDate(subscription.unsubscriptionDate)}
    </TableCell>
    <TableCell>
      <AssetStatusLabel status={subscription.status as STATUS} />
    </TableCell>
  </TableRow>
);

interface Props {
  currency: CurrencyEnum;
  subscription: SignalSubscriber;
}

const ProgramSubscriptionsRow = React.memo(_ProgramSubscriptionsRow);
export default ProgramSubscriptionsRow;
