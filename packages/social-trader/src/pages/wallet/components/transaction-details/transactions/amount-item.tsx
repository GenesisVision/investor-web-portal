import "../transaction-details.scss";

import classNames from "classnames";
import { AmountItem as AmountItemType, Color } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

const _AmountItem: React.FC<Props> = ({
  amount: { amount, currency, color }
}) => {
  return (
    <ColoredAmount color={color}>
      <div className="amount-item">
        <div className="amount-item__amount">
          <NumberFormat
            value={formatValue(amount, DEFAULT_DECIMAL_SCALE)}
            allowNegative={true}
            displayType="text"
          />
        </div>
        {currency}
      </div>
    </ColoredAmount>
  );
};

const ColoredAmount: React.FC<
  { color: Color } & React.HTMLAttributes<HTMLDivElement>
> = ({ color, children }) => {
  return (
    <div
      className={classNames({
        "amount-item__amount--white": color === "White",
        "amount-item__amount--red": color === "Red",
        "amount-item__amount--green": color === "Green"
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  amount: AmountItemType;
}

const AmountItem = React.memo(_AmountItem);
export default AmountItem;
