import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVNumberField from "shared/components/gv-number-field/gv-number-field";

const _InputAmountField: React.FC<Props> = ({
  emptyInit,
  onChange,
  t,
  name,
  label,
  currency,
  isAllow,
  setMax,
  placeholder,
  autoFocus = true,
  disabled
}) => (
  <GVFormikField
    emptyInit={emptyInit}
    onChange={onChange}
    name={name}
    label={label}
    placeholder={placeholder}
    component={GVNumberField}
    adornment={
      setMax && (
        <GVButton
          onClick={setMax}
          variant="text"
          color="secondary"
          className="gv-btn--no-padding"
        >
          {t("Max")}
        </GVButton>
      )
    }
    autoComplete="off"
    autoFocus={autoFocus}
    suffix={` ${currency}`}
    allowNegative={false}
    isAllowed={isAllow}
    disabled={disabled}
  />
);

interface Props extends WithTranslation {
  name: string;
  label: React.ReactNode;
  currency: string;
  placeholder?: string;
  isAllow?: (values: NumberFormatValues) => boolean;
  setMax?(): void;
  autoFocus?: boolean;
  onChange?(event: string | number): void;
  emptyInit?: boolean;
  disabled?: boolean;
}

const InputAmountField = translate()(React.memo(_InputAmountField));
export default InputAmountField;
