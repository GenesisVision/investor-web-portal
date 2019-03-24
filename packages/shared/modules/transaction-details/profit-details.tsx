import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import TransactionAsset from "shared/modules/transaction-details/details-asset";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import { formatCurrencyValue } from "shared/utils/formatter";

const ProfitDetails = (props: TransactionDetailsProps) => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t(`transactions-details.profit`)}</p>
        </div>
        <StatisticItem label={`${data.programDetails.programType}`}>
          <TransactionAsset data={data.programDetails} />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.success-fee`)}>
          {data.programDetails.successFeePercent}% (
          {data.programDetails.successFee} {data.currency})
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.gv-fee`)}>
          {data.gvCommissionPercent}% ({data.gvCommission}{" "}
          {data.gvCommissionCurrency ? data.gvCommissionCurrency : ""})
        </StatisticItem>
        <StatisticItem label={t("transactions-details.status.title")}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.external.amount`)} big>
          <NumberFormat
            value={formatCurrencyValue(data.amount, data.currency)}
            suffix={` ${data.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ProfitDetails;
