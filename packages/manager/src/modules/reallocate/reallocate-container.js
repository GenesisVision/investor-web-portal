import "./reallocate-container.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader";

import * as createFundService from "../../pages/create-fund/services/create-fund.service";
import ReallocatePopup from "./components/reallocate-popup";
import { updateAssets } from "./services/reallocate.services";

class ReallocateContainer extends Component {
  state = { errorMessage: "", assets: [] };

  fillAssets = (target, data) => {
    data.forEach(dataItem => {
      target.forEach(targetItem => {
        if (!targetItem.percent)
          targetItem.percent =
            targetItem.name === dataItem.name ? dataItem.percent : 0;
      });
    });
    return target;
  };

  componentDidMount() {
    createFundService.fetchAssets().then(response => {
      const assets = this.fillAssets(response.assets, this.props.assets);
      this.setState({
        assets: assets
      });
    });
  }

  render() {
    const { service, id, remainder, open, onClose, onApply } = this.props;
    const { assets } = this.state;
    const handleApply = values => {
      service
        .updateAssets(id, values)
        .then(() => {
          handleClose();
          onApply();
        })
        .catch(error => {
          this.setState({ errorMessage: error.errorMessage });
        });
    };
    const handleClose = () => {
      this.setState({ errorMessage: "" });
      onClose();
    };
    return (
      <Dialog open={open} onClose={handleClose}>
        {assets.length ? (
          <ReallocatePopup
            assets={assets}
            remainder={remainder}
            reallocate={handleApply}
            errorMessage={this.state.errorMessage}
          />
        ) : (
          <DialogLoader />
        )}
      </Dialog>
    );
  }
}

ReallocateContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  assets: PropTypes.array,
  remainder: PropTypes.number,
  id: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      updateAssets
    },
    dispatch
  )
});

export default connect(
  undefined,
  mapDispatchToProps
)(ReallocateContainer);
