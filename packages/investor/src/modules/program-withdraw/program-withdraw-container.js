import {
  alert,
  getProgramWithdrawInfo,
  withdrawProgramById
} from "modules/program-withdraw/servives/program-withdraw.services";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import ProgramWithdrawPopup from "shared/components/program-withdraw/program-withdraw-popup";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

class ProgramWithdrawContainer extends PureComponent {
  state = { errorMessage: null };

  handleWithdraw = (id, percent) => {
    return investorApi
      .v10InvestorProgramsByIdWithdrawMultiByAmountPost(
        id,
        percent,
        authService.getAuthArg()
      )
      .then(() => {
        this.props.onClose();
        this.props.onSubmit();
        this.props.services.alert(
          "success",
          "withdraw-program.success-alert-message",
          true
        );
      })
      .catch(error => {
        this.setState(error);
      });
  };

  render() {
    const {
      open,
      onClose,
      services,
      id,
      assetCurrency,
      accountCurrency
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <ProgramWithdrawPopup
          programCurrency={assetCurrency}
          accountCurrency={accountCurrency}
          fetchInfo={() => services.getProgramWithdrawInfo(id)}
          withdraw={amount => this.handleWithdraw(id, amount)}
          errorMessage={this.state.errorMessage}
        />
      </Dialog>
    );
  }
}

ProgramWithdrawContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  accountCurrency: state.accountSettings.currency
});

const mapDispathToProps = dispatch => ({
  services: bindActionCreators(
    {
      getProgramWithdrawInfo,
      withdrawProgramById,
      alert
    },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispathToProps
  )
)(ProgramWithdrawContainer);
