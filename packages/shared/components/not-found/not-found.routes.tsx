import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";

export const NOT_FOUND_PAGE_ROUTE = "/404";

const NotFoundPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Page title={t("not-found-page.title")}>
    <div className="app__main-wrapper">{t("not-found-page.body")}</div>
  </Page>
);

export default translate()(React.memo(NotFoundPage));
