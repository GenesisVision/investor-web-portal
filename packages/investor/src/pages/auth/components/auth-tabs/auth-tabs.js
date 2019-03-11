import { GVTab, GVTabs } from "gv-react-components";
import React from "react";
import { withTranslation } from "react-i18next";

const Tabs = ({ t, authPartUrl }) => {
  return (
    <GVTabs value={"investor"}>
      <GVTab value={"investor"} label={t("auth.tabs.investor")} />
      <GVTab
        value={"manager"}
        label={
          <a href={process.env.REACT_APP_MANAGER_PORTAL_URL + authPartUrl}>
            {t("auth.tabs.manager")}
          </a>
        }
      />
    </GVTabs>
  );
};

const AuthTabs = withTranslation()(Tabs);
export default AuthTabs;
