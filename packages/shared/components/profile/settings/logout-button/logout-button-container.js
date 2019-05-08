import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import GVButton from "shared/components/gv-button";

class LogoutButtonContainer extends PureComponent {
  state = {
    isPending: false
  };
  handleSubmit = () => {
    this.setState({ isPending: true }, () => {
      this.props.services
        .logoutFromDevices()
        .then(() => this.setState({ isPending: false }))
        .catch(() => this.setState({ isPending: false }));
    });
  };

  render() {
    return (
      <GVButton
        variant="text"
        onClick={this.handleSubmit}
        color="secondary"
        disabled={this.state.isPending}
        className="profile-settings__logout-devices"
      >
        {this.props.t("profile-page.settings.logout-from-another-devices")}
      </GVButton>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  services: bindActionCreators(props.profileSettingsService, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(LogoutButtonContainer);
