import "./app-layout.scss";

import React, { ComponentType, useEffect } from "react";
import { connect } from "react-redux";
import { initOnResizeEvent } from "shared/actions/ui-actions";
import HeaderContainer from "shared/components/header/header.container";
import NotificationsContainer from "shared/components/notifications/components/notifications-container";

const _AppLayout: ComponentType<Props> = ({ initOnResizeEvent, children }) => {
  useEffect(() => {
    initOnResizeEvent();
  }, []);
  return (
    <div className="app__wrapper">
      <div className="app">
        <div className="app__header">
          <HeaderContainer />
        </div>
        <div className="app__main">{children}</div>
        <NotificationsContainer />
      </div>
      <div id="modal-root" />
    </div>
  );
};

const mapDispatchToProps = (): DispatchProps => ({
  initOnResizeEvent
});

interface Props extends DispatchProps {}

interface DispatchProps {
  initOnResizeEvent: () => void;
}

const AppLayout = connect<null, DispatchProps>(
  null,
  mapDispatchToProps,
  null,
  { pure: false }
)(_AppLayout);
export default AppLayout;
