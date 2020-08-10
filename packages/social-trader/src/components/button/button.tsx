import {
  LabelAdditionalStyles,
  SuccessMarkAdditionalStyles,
  SuccessMarkStyles
} from "components/button/button.styles";
import {
  IButtonProps,
  ILabelProps,
  ISuccessMarkProps
} from "components/button/button.types";
import { withStyles } from "decorators/withStyles";
import React from "react";

const _Label: React.FC<ILabelProps> = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};

const Label = withStyles<ILabelProps>({
  staticStyles: LabelStyles,
  dynamicStyles: LabelAdditionalStyles
})(_Label);

const _SuccessMark: React.FC<ISuccessMarkProps> = ({ className }) => {
  return <span className={className}>✔</span>;
};
const SuccessMark = withStyles<ISuccessMarkProps>({
  staticStyles: SuccessMarkStyles,
  dynamicStyles: SuccessMarkAdditionalStyles
})(_SuccessMark);

const _Button: React.FC<IButtonProps> = ({
  isSuccessful,
  successSymbol,
  children,
  testId,
  id,
  disabled,
  className,
  onClick,
  title,
  type,
  name
}) => {
  return (
    <button
      data-test-id={testId}
      id={id}
      disabled={disabled}
      className={className}
      onClick={onClick}
      title={title}
      type={type}
      name={name}
    >
      <Label isSuccessful={isSuccessful}>{children}</Label>
      {successSymbol && <SuccessMark isSuccessful={isSuccessful} />}
    </button>
  );
};

export const Button = React.memo(_Button);
