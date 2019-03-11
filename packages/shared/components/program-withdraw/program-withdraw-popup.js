import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import ProgramWithdrawForm from "./program-withdraw-form";
import ProgramWithdrawTop from "./program-withdraw-top";

class ProgramWithdrawPopup extends Component {
  state = {
    data: undefined,
    isPending: false
  };

  componentDidMount() {
    this.setState({ isPending: true });
    this.props
      .fetchInfo()
      .then(data => this.setState({ data, isPending: false }))
      .catch(() => this.setState({ isPending: false }));
  }

  handleSubmit = amount => {
    this.setState({ isPending: true });
    return this.props
      .withdraw(amount)
      .catch(() => this.setState({ isPending: false }));
  };

  render() {
    if (!this.state.data) return null;
    const { assetCurrency, accountCurrency, errorMessage } = this.props;
    const { title, availableToWithdraw, periodEnds, rate } = this.state.data;
    return (
      <Fragment>
        <ProgramWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          programCurrency={assetCurrency}
        />
        <ProgramWithdrawForm
          programCurrency={assetCurrency}
          accountCurrency={accountCurrency}
          availableToWithdraw={availableToWithdraw}
          periodEnds={periodEnds}
          rate={rate}
          onSubmit={this.handleSubmit}
          errorMessage={errorMessage}
          disabled={this.state.isPending}
        />
      </Fragment>
    );
  }
}

ProgramWithdrawPopup.propTypes = {
  fetchInfo: PropTypes.func,
  withdraw: PropTypes.func,
  accountCurrency: PropTypes.string.isRequired,
  programCurrency: PropTypes.string.isRequired
};

export default ProgramWithdrawPopup;
