import "./simple-text-field.scss";

import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import React, { useCallback, useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

const _SimpleNumberField: React.FC<ISimpleNumberFieldProps> = props => {
  const { setFieldValue, name, triggerValidation, emptyInit, value } = props;
  const [init, setInit] = useState(true);
  const handleOnChange = useCallback(
    ({ floatValue }: NumberFormatValues) => {
      setInit(false);
      if (setFieldValue) setFieldValue(name, floatValue);
      if (triggerValidation) triggerValidation(name);
    },
    [name]
  );

  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      value={setEmpty ? "" : value}
      //@ts-ignore
      onValueChange={handleOnChange}
      InputComponent={NumberFormat}
    />
  );
};

export interface ISimpleNumberFieldProps extends GVTextFieldProps {
  refProp?: any;
  triggerValidation?: (name: string) => any;
  setFieldValue?: (name: string, value?: any) => void;
  [key: string]: any;
}

export const SimpleNumberField = React.memo(_SimpleNumberField);
