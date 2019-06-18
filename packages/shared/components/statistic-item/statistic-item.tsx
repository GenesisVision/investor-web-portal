import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";

const _StatisticItem: React.FC<Props> = ({
  invert,
  large,
  big,
  small,
  label,
  children,
  accent,
  half,
  className,
  equivalent,
  equivalentCurrency
}) => {
  const generateClasses = (item: ITEM) => {
    switch (
      (item === ITEM.VALUE && !invert) || (item === ITEM.LABEL && invert)
    ) {
      case true:
        return classNames("statistics-item__value", {
          "statistics-item__value--accent": accent,
          "statistics-item__value--small": small,
          "statistics-item__value--big": big,
          "statistics-item__value--large": large
        });
      case false:
      default:
        return "statistics-item__label";
    }
  };

  return (
    <div
      className={classNames(
        "statistics-item",
        {
          "statistics-item--half": half,
          "statistics-item--small": small
        },
        className
      )}
    >
      <div
        className={classNames(
          "statistics-item__top",
          generateClasses(ITEM.LABEL)
        )}
      >
        {label}
      </div>
      <div className={generateClasses(ITEM.VALUE)}>{children}</div>
      {equivalent !== undefined && equivalentCurrency !== undefined ? (
        <div className="statistics-item__equivalent">
          <NumberFormat
            value={formatCurrencyValue(equivalent, equivalentCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${equivalentCurrency}`}
          />
        </div>
      ) : null}
    </div>
  );
};

enum ITEM {
  LABEL = "LABEL",
  VALUE = "VALUE"
}

interface Props {
  label: string | React.ReactNode;
  equivalent?: number;
  equivalentCurrency?: string;
  small?: boolean;
  big?: boolean;
  large?: boolean;
  accent?: boolean;
  half?: boolean;
  invert?: boolean;
  className?: string;
}

const StatisticItem = React.memo(withLoader(_StatisticItem));
export default StatisticItem;
