import "components/assets/create-asset/create-asset.scss";

import Page from "components/page/page";
import { Broker } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CreateAccountContainer from "./components/create-account.container";

const _CreateAccountPage: React.FC<Props> = ({
  brokers,
  requestBrokerName
}) => {
  const [t] = useTranslation();
  return (
    <Page title={t("create-account-page.title")}>
      <CreateAccountContainer
        brokers={brokers}
        requestBrokerName={requestBrokerName}
      />
    </Page>
  );
};

interface Props {
  requestBrokerName?: string;
  brokers: Broker[];
}
const CreateAccountPage = React.memo(_CreateAccountPage);
export default CreateAccountPage;
