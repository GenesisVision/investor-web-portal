import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { NextPage } from "next";
import FaqSection from "pages/landing-page/components/faq-section/faq-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Faq: NextPage = () => {
  return (
    <Layout title="Genesis Vision FAQ">
      <main className="internal">
        <FaqSection />
      </main>
    </Layout>
  );
};
