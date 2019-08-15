import "./about.scss";

import { goBack } from "connected-react-router";
import { FormikProps, withFormik } from "formik";
import { UpdateProfileViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";

const _AboutForm: React.FC<Props> = ({
  t,
  handleSubmit,
  errorMessage,
  isValid,
  dirty,
  isSubmitting
}) => (
  <form id="about-manager" onSubmit={handleSubmit} className="about">
    <div>
      <div className="profile__row">
        <GVFormikField
          label={t("profile-page.login")}
          component={GVTextField}
          name={FIELDS.userName}
          autoFocus
        />
      </div>
      <div className="profile__row">
        <GVFormikField
          label={t("profile-page.about")}
          component={GVTextField}
          type="textarea"
          name={FIELDS.about}
        />
      </div>
      <div className="form-error">{errorMessage}</div>
    </div>
    <div className="profile__row">
      <GVButton type="submit" disabled={isSubmitting || !isValid || !dirty}>
        {t("buttons.save")}
      </GVButton>
    </div>
  </form>
);

enum FIELDS {
  userName = "userName",
  about = "about"
}

export interface IAboutFormValues extends UpdateProfileViewModel {}

interface IAboutFormOwnProps {
  onSubmit(values: IAboutFormValues, setSubmitting: SetSubmittingType): void;
  userName: string;
  about: string;
  errorMessage?: string;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { goBack },
    dispatch
  )
});

interface Props
  extends WithTranslation,
    FormikProps<IAboutFormValues>,
    IAboutFormOwnProps,
    DispatchProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  goBack: typeof goBack;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const AboutForm = compose<React.ComponentType<IAboutFormOwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  withFormik<IAboutFormOwnProps, IAboutFormValues>({
    displayName: "about-manager",
    mapPropsToValues: ({ userName = "", about = "" }) => ({
      [FIELDS.userName]: userName,
      [FIELDS.about]: about
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_AboutForm);
export default AboutForm;
