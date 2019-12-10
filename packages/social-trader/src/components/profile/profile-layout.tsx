import "./profile-layout.scss";

import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import Page from "components/page/page";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";

import {
  KYC_ROUTE,
  PROFILE,
  PROFILE_ROUTE,
  REFERRAL_PROGRAM,
  REFERRAL_PROGRAM_ROUTE,
  SECURITY,
  SECURITY_ROUTE,
  SETTINGS,
  SETTINGS_ROUTE,
  SOCIAL_LINKS,
  SOCIAL_LINKS_ROUTE,
  VERIFY
} from "./profile.constants";

const tabs = [
  { pathname: SOCIAL_LINKS_ROUTE, value: SOCIAL_LINKS },
  { pathname: PROFILE_ROUTE, value: PROFILE },
  { pathname: KYC_ROUTE, value: VERIFY, hideable: true },
  { pathname: SETTINGS_ROUTE, value: SETTINGS },
  { pathname: SECURITY_ROUTE, value: SECURITY },
  { pathname: REFERRAL_PROGRAM_ROUTE, value: REFERRAL_PROGRAM }
];

const _ProfileLayout: React.FC<Props> = ({ route, children }) => {
  const [t] = useTranslation();
  const verified = useSelector(kycConfirmedSelector);
  return (
    <Page title={t("profile-page.title")}>
      <div className="app__main-wrapper">
        <h1>{t("profile-page.title")}</h1>
        <GVTabs value={route}>
          {tabs
            .filter(tab => !tab.hideable || !verified)
            .map(x => (
              <GVTab
                key={x.value}
                label={
                  <Link
                    to={{
                      pathname: x.pathname
                    }}
                  >
                    {t(`profile-page.tabs.${x.value}`)}
                  </Link>
                }
                value={x.value}
              />
            ))}
        </GVTabs>
      </div>
      <div className="profile-layout">{children}</div>
    </Page>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  route: string;
}

const ProfileLayout = React.memo(_ProfileLayout);
export default ProfileLayout;
