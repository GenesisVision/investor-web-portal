import "./auth-layout.scss";

import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import GvBrand from "shared/components/gv-brand/gv-brand";
import GvLogo from "shared/components/gv-logo/gv-logo";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { HOME_ROUTE } from "shared/routes/app.routes";

import { ILoginFooterProps } from "../login-footer/login-footer";

const _AuthLayout: NextPage<Props> = ({
  role,
  children,
  titleKey,
  quoteNo,
  Footer,
  footerAuthRoute
}) => {
  const [t] = useTranslation();
  return (
    <div className="root auth page">
      <div className="auth__left">
        <Link href={HOME_ROUTE}>
          <a className="navigation__link auth__logo">
            <GvLogo />
            <GvBrand />
          </a>
        </Link>

        <blockquote className="auth__quote">
          {t(`${role}.auth-quotes.${quoteNo}.quote`)}
          <footer className="auth__quote-footer">
            —{" "}
            <cite className="auth__quote-author">
              {t(`${role}.auth-quotes.${quoteNo}.author`)}
            </cite>
          </footer>
        </blockquote>
      </div>
      <div className="auth__right">
        <div className="auth__content">
          {titleKey && <h1>{t(titleKey)}</h1>}
          {children}
        </div>
        {Footer && (
          <div className="auth__footer">
            <Footer ROUTE={footerAuthRoute} />
          </div>
        )}
      </div>
    </div>
  );
};

interface Props extends OwnProps, WithRoleProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  footerAuthRoute: string;
  titleKey: string;
  quoteNo: number;
  children: React.ReactChild;
}

const AuthLayout = withRole(_AuthLayout);
export default AuthLayout;
