import {
  alert,
  getFundWithdrawInfo
} from "modules/fund-withdraw/servives/fund-withdraw.services";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import FundWithdrawPopup from "shared/components/fund-withdraw/fund-withdraw-popup";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

class FundWithdrawContainer extends PureComponent {
  handleWithdraw = ({ percent, currency }) => {
    const { id } = this.props;
    return managerApi
      .v10ManagerFundsByIdWithdrawByPercentPost(
        id,
        percent,
        authService.getAuthArg(),
        { currency }
      )
      .then(res => {
        this.props.onClose();
        this.props.services.alert(
          "success",
          "withdraw-fund.success-alert-message",
          true
        );
        return res;
      });
  };

  getFundWithdrawInfo = () => {
    const { id, accountCurrency } = this.props;
    return this.props.services.getFundWithdrawInfo(id, accountCurrency);
  };

  render() {
    const { open, onClose, accountCurrency, services, id } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <FundWithdrawPopup
          accountCurrency={accountCurrency}
          fetchInfo={this.getFundWithdrawInfo}
          withdraw={this.handleWithdraw}
        />
      </Dialog>
    );
  }
}

FundWithdrawContainer.propTypes = {
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
      getFundWithdrawInfo,
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
)(FundWithdrawContainer);
