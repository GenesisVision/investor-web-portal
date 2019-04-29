import { ProfileHeaderViewModel } from "gv-api-web";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTwoFactor } from "shared/actions/2fa-actions";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { logout } from "shared/components/auth/login/login.service";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import Header from "shared/components/header/header";
import { notificationsToggle } from "shared/components/notifications/actions/notifications.actions";

import { ManagerRootState } from "../../../reducers";

export interface IHeaderContainerStateProps {
  isAuthenticated: boolean;
  info: ProfileHeaderViewModel | undefined;
  backPath: string;
}
export interface IHeaderContainerDispatchProps {
  fetchProfileHeaderInfo: any;
  logout(): void;
  notificationsToggle: any;
  fetchTwoFactor: any;
}

class HeaderContainer extends Component<
  IHeaderContainerStateProps & IHeaderContainerDispatchProps
> {
  componentDidMount() {
    this.fetchHeaderInfo();
  }

  componentDidUpdate(
    prevProps: IHeaderContainerStateProps & IHeaderContainerDispatchProps
  ) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.fetchHeaderInfo();
    }
  }

  fetchHeaderInfo = () => {
    if (this.props.isAuthenticated) {
      this.props.fetchProfileHeaderInfo();
      this.props.fetchTwoFactor();
    }
  };

  render() {
    const {
      info,
      logout,
      notificationsToggle,
      isAuthenticated,
      backPath
    } = this.props;
    return (
      <Header
        profileHeader={info}
        backPath={backPath}
        isAuthenticated={isAuthenticated}
        logout={logout}
        openNotifications={notificationsToggle}
        LOGIN_ROUTE={LOGIN_ROUTE}
        SIGNUP_ROUTE={SIGNUP_ROUTE}
        GLOBAL_SEARCH_ROUTE={GLOBAL_SEARCH_ROUTE}
      />
    );
  }
}

const mapDispatchToProps: IHeaderContainerDispatchProps = {
  fetchProfileHeaderInfo,
  logout,
  notificationsToggle,
  fetchTwoFactor
};

const mapStateToProps = (
  state: ManagerRootState
): IHeaderContainerStateProps => ({
  info: state.profileHeader.info.data,
  isAuthenticated: state.authData.isAuthenticated,
  backPath: state.router.location ? state.router.location.pathname : ""
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(HeaderContainer);
