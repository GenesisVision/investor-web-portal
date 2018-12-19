import { bindActionCreators, compose } from "redux";
import { INVESTOR } from "shared/constants/constants";
import connect from "react-redux/es/connect/connect";
import DashboardAssets from "shared/components/dashboard/dashboard-assets/dashboard-assets";
import React, { Component } from "react";

import { fetchAssetsCount } from "../../services/dashboard.service";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";

class DashboardAssetsContainer extends Component {
  getAssets = () => {
    const { service } = this.props;
    service.getDashboardFunds();
    service.getDashboardPrograms();
  };

  onChangeStatus = () => this.getAssets();

  render() {
    const { title } = this.props;
    return (
      <DashboardAssets
        getDashboardPrograms={getDashboardPrograms}
        getDashboardFunds={getDashboardFunds}
        fetchAssetsCount={fetchAssetsCount}
        title={title}
        role={INVESTOR}
        onChangeStatus={this.onChangeStatus}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getDashboardFunds, getDashboardPrograms },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssetsContainer);
