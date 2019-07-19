import { PlatformInfo } from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import React, { Component } from "react";
import AppLayout from "shared/components/app-layout/app-layout";
import { platformContext } from "shared/context/platform";
import platformApi from "shared/services/api-client/platform-api";

const withDefaultLayout = (WrappedComponent: NextPage<any>) =>
  class extends Component<{
    info: PlatformInfo;
  }> {
    static async getInitialProps(ctx: NextPageContext) {
      const info = await platformApi.v10PlatformInfoGet();
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        info,
        namespacesRequired: ["translation"],
        ...componentProps
      };
    }
    render() {
      const { info } = this.props;
      return (
        <AppLayout>
          <platformContext.Provider value={info}>
            <WrappedComponent {...this.props} />
          </platformContext.Provider>
        </AppLayout>
      );
    }
  };

export default withDefaultLayout;
