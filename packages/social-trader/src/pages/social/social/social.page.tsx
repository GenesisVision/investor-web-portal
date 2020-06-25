import Page from "components/page/page";
import { PostItemsViewModel, SocialSummary } from "gv-api-web";
import { SocialPageContainer } from "pages/social/social/social-page.container";
import { SocialSearchContextProvider } from "pages/social/social/social-page.context";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  initFeedData?: PostItemsViewModel;
  data: SocialSummary;
}

export const SocialPage: React.FC<Props> = ({ data, initFeedData }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("Social")}>
      <SocialSearchContextProvider>
        <SocialPageContainer initFeedData={initFeedData} data={data} />
      </SocialSearchContextProvider>
    </Page>
  );
};
