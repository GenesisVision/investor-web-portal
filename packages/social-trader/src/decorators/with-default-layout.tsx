import { changeLocationAction } from "actions/location.actions";
import platformActions from "actions/platform-actions";
import AppLayout from "components/layouts/app-layout/app-layout";
import ServerErrorPage from "components/server-error-page/server-error-page";
import withReduxStore from "decorators/with-redux-store";
import { ErrorViewModel, PlatformInfo } from "gv-api-web";
import { NextPage } from "next";
import React, { Component } from "react";
import { compose, Dispatch } from "redux";
import { initializeStore } from "store";
import { NextPageWithReduxContext } from "utils/types";

const withDefaultLayout = (WrappedComponent: NextPage<any>) =>
  class extends Component<{
    info: PlatformInfo;
    ex: ErrorViewModel;
  }> {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      const hasPlatformData = !!ctx.reduxStore?.getState()?.platformData?.data;
      let componentProps = {};
      await ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
        await dispatch(changeLocationAction());
      });
      await Promise.all([
        WrappedComponent.getInitialProps &&
          WrappedComponent.getInitialProps(ctx),
        ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
          !hasPlatformData &&
            (await dispatch(platformActions.fetchPlatformSettings()));
        })
      ])
        .then(([data]) => {
          if (data) componentProps = data;
        })
        .catch(ex => {
          componentProps = { ex };
        });
      return {
        namespacesRequired: ["translations"],
        ...componentProps
      };
    }
    render() {
      const { ex, ...others } = this.props;
      return (
        <AppLayout>
          {ex ? <ServerErrorPage ex={ex} /> : <WrappedComponent {...others} />}
        </AppLayout>
      );
    }
  };

export default compose(withReduxStore(initializeStore), withDefaultLayout);
