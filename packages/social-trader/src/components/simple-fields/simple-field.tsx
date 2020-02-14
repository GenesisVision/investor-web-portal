import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useState } from "react";

const _SimpleField: React.FC<ISimpleFieldProps> = props => {
  const {
    error,
    showCorrect,
    triggerValidation,
    setFieldValue,
    name,
    emptyInit,
    value,
    InputComponent,
    valueCallback
  } = props;
  const [correct, setCorrect, setNotCorrect] = useIsOpen();
  const [dirty, setDirty] = useIsOpen();
  const [init, setInit] = useState(true);
  const handleOnChange = useCallback(
    (value: any) => {
      setInit(false);
      if (setFieldValue) setFieldValue(name, valueCallback(value), dirty);
    },
    [name, setFieldValue, valueCallback, dirty]
  );
  const handleOnBlur = useCallback(() => {
    if (showCorrect && !!value)
      if (error) setNotCorrect();
      else setCorrect();

    if (!dirty) {
      setDirty();
      triggerValidation && triggerValidation(name);
    }
  }, [name, triggerValidation, dirty, showCorrect, error, value]);

  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      correct={correct}
      value={setEmpty ? "" : value}
      onBlur={handleOnBlur}
      onChange={!InputComponent ? handleOnChange : undefined}
      onValueChange={handleOnChange}
      InputComponent={InputComponent}
    />
  );
};

export interface ISimpleFieldProps extends GVTextFieldProps {
  showCorrect?: boolean;
  triggerValidation?: (name: string) => void;
  valueCallback: (value: any) => any;
  validateOnInput?: boolean;
  refProp?: any;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleField = React.memo(_SimpleField);
