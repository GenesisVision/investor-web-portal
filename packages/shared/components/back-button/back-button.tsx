import "./back-button.scss";

import { CallHistoryMethodAction, goBack, push } from "connected-react-router";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import RootState from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

const BackButton: React.FC<
  StateProps & InjectedTranslateProps & DispatchProps
> = ({ t, service, backPath, prevPath }) => {
  if (!backPath) return null;

  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={prevPath ? () => service.push(prevPath) : service.goBack}
        color="secondary"
        className="back-button__container"
      >
        <React.Fragment>
          <div className="back-button__back-arrow">&larr;</div>
          <div className="back-button__back">{t("buttons.back")}</div>
        </React.Fragment>
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  backPath: state.router.location.state,
  prevPath: state.router.location.prevPath
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): DispatchProps => ({
  service: bindActionCreators({ goBack, push }, dispatch)
});

export default compose<React.FunctionComponent>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BackButton);

interface StateProps {
  backPath: string;
  prevPath?: string;
}

interface DispatchProps {
  service: {
    goBack(): CallHistoryMethodAction<[]>;
    push(route: string): void;
  };
}
