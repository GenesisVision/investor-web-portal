import ManagerPage from "components/manager/manager.page";
import withDefaultLayout from "decorators/with-default-layout";
import { PublicProfile } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import profileApi from "shared/services/api-client/profile-api";

const Page: NextPage<Props> = ({ profile }) => {
  return <ManagerPage profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const profile = await profileApi.getManagerProfile(id as string);
  return {
    profile
  };
};

interface Props {
  profile: PublicProfile;
}

export const Managers = withDefaultLayout(Page);
