import { WithTranslation } from "react-i18next";
import { passwordValidator } from "shared/utils/validators/validators";
import { object, ref, string } from "yup";

import { PASSWORD_CHANGE_FORM_FIELDS } from "./password-change-form";

export const passwordChangeValidationSchema = ({ t }: WithTranslation) =>
  object().shape({
    [PASSWORD_CHANGE_FORM_FIELDS.oldPassword]: string().required(
      t("Password is required")
    ),
    [PASSWORD_CHANGE_FORM_FIELDS.password]: passwordValidator,
    [PASSWORD_CHANGE_FORM_FIELDS.confirmPassword]: string()
      .oneOf(
        [ref(PASSWORD_CHANGE_FORM_FIELDS.password)],
        t("Passwords don't match.")
      )
      .required(t("Confirm Password is required"))
  });
