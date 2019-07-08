import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import TransactionAsset from "shared/modules/transaction-details/transactions/transaction-asset";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const InvestingTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <TransactionDetails
    header={t(
      `transactions-details.investment.${data.programDetails.programType}`
    )}
    body={
      <StatisticItem
        label={t(
          `transactions-details.investment.to-${
            data.programDetails.programType
          }`
        )}
      >
        <TransactionAsset
          url={data.programDetails.logo}
          data={data.programDetails}
        />
      </StatisticItem>
    }
    bottom={
      <>
        <StatisticItem label={t(`transactions-details.entry-fee`)}>
          <NumberFormat
            value={data.programDetails.entryFeePercent}
            suffix="%"
            displayType="text"
          />
          <NumberFormat
            value={formatValue(
              data.programDetails.entryFee,
              DEFAULT_DECIMAL_SCALE
            )}
            prefix={" ("}
            suffix={` ${data.currency})`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.gv-fee`)}>
          <NumberFormat
            value={data.gvCommissionPercent}
            suffix="%"
            displayType="text"
          />
          <NumberFormat
            value={formatValue(data.gvCommission, DEFAULT_DECIMAL_SCALE)}
            prefix={" ("}
            suffix={
              data.gvCommissionCurrency ? ` ${data.gvCommissionCurrency})` : ")"
            }
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.investment.amount`)} big>
          <NumberFormat
            value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
            suffix={` ${data.currency}`}
            displayType="text"
          />
        </StatisticItem>
      </>
    }
  />
);

export default InvestingTransaction;
