import copy from "copy-to-clipboard";
import { TransactionDetails } from "gv-api-web";
import { GVButton } from "gv-react-components";
import * as React from "react";
import NumberFormat from "react-number-format";

import CopyIcon from "../../components/icon/copy-icon";
import Profitability from "../../components/profitability/profitability";
import StatisticItem from "../../components/statistic-item/statistic-item";
import { formatCurrencyValue } from "../../utils/formatter";

const ExternalDeposit = (props: { data: TransactionDetails }) => {
  const onCopy = () => {
    try {
      copy(data.externalTransactionDetails.fromAddress); // add notifications
    } catch (error) {}
  };
  const { data } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>Transaction Details</h2>
          <p>Deposit</p>
        </div>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={`From address`}>
          {data.externalTransactionDetails.fromAddress}
          <GVButton color="secondary" onClick={onCopy}>
            <CopyIcon />
            &nbsp;
            {"buttons.copy"}
          </GVButton>
        </StatisticItem>
        <StatisticItem label={"Status"}>
          {data.status} {data.externalTransactionDetails.description}
        </StatisticItem>
        <StatisticItem label={"Amount"} big>
          <Profitability value={data.amount} prefix="sign">
            <NumberFormat
              value={formatCurrencyValue(data.amount, "BTC")}
              suffix=" BTC"
              allowNegative={false}
              displayType="text"
            />
          </Profitability>
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ExternalDeposit;
