import { TFunction } from "i18next";
import { boolean, mixed, number, object } from "yup";

export enum WITHDRAW_FORM_FIELDS {
  amount = "amount",
  withdrawAll = "withdrawAll"
}

export interface IProgramWithdrawAmountFormValues {
  [WITHDRAW_FORM_FIELDS.amount]: number | string;
  [WITHDRAW_FORM_FIELDS.withdrawAll]: boolean;
}

export const programWithdrawAmountValidationSchema = ({
  t,
  availableToWithdraw
}: {
  t: TFunction;
  availableToWithdraw: number;
}) =>
  object().shape({
    [WITHDRAW_FORM_FIELDS.withdrawAll]: boolean(),
    [WITHDRAW_FORM_FIELDS.amount]: mixed().when(
      WITHDRAW_FORM_FIELDS.withdrawAll,
      {
        is: false,
        then: number()
          .moreThan(0, t("withdraw-program.validation.amount-is-zero"))
          .max(
            availableToWithdraw,
            t("withdraw-program.validation.amount-more-than-available")
          )
      }
    )
  });
