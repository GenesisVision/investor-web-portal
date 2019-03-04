import { replace } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";

import TwoFactorCodeForm from "./two-factor-code-form";

class TwoFactorCodeContainer extends Component {
  componentDidMount() {
    const { email, password, showNotFoundPage } = this.props;
    if (email === "" || password === "") {
      showNotFoundPage();
    }
  }

  componentWillUnmount() {
    this.props.clearLoginData();
  }

  handleSubmit = (twoFactor, setSubmitting) => {
    return this.props.twoFactorLogin(twoFactor, setSubmitting);
  };

  render() {
    return (
      <TwoFactorCodeForm
        onSubmit={this.handleSubmit}
        error={this.props.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return { errorMessage, email, password };
};

const mapDispatchToProps = (dispatch, props) => ({
  twoFactorLogin: (code, setSubmitting) => {
    const onCatch = () => {
      setSubmitting(false);
    };
    return dispatch(props.twoFactorLogin(code, props.TWO_FACTOR_CODE, onCatch));
  },
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
  clearLoginData: () => {
    dispatch(props.clearLoginData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorCodeContainer);
