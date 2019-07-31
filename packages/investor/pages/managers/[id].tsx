import { ManagerProfile } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import ManagerPage from "shared/components/manager/manager.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import ManagerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

const Managers: NextPage<OwnProps> = ({ managerProfile, isAuthenticated }) => {
  return (
    <ManagerPage
      managerProfile={managerProfile}
      isAuthenticated={isAuthenticated}
    />
  );
};

Managers.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const managerProfile = await ManagerApi.v10ManagerByIdGet(id as string);
  return {
    namespacesRequired: ["translation"],
    isAuthenticated: authService.isAuthenticated(),
    managerProfile
  };
};

interface OwnProps {
  managerProfile: ManagerProfile;
  isAuthenticated: boolean;
}

export default withDefaultLayout(Managers);
