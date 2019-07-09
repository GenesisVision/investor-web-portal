import { ProgramRequest } from "gv-api-web";
import moment from "moment";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import useIsOpen from "shared/hooks/is-open.hook";
import { formatCurrencyValue } from "shared/utils/formatter";

import { EVENT_LOGO_TYPE } from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import { CancelRequestPropsType } from "../../dashboard.constants";

const _DashboardRequest: React.FC<Props> = ({
  t,
  request,
  cancelRequest,
  onApplyCancelRequest,
  role,
  asset = ASSET.PROGRAM
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [disabled, setDisabled, setNotDisabled] = useIsOpen();
  const handleApplyCancelRequest = useCallback(
    () => {
      setDisabled();
      const onFinally = () => onApplyCancelRequest();
      const removeDisableBtn = () => setNotDisabled();
      cancelRequest({
        id: request.id,
        onFinally,
        removeDisableBtn,
        role,
        asset
      });
    },
    [onApplyCancelRequest, request, role, asset]
  );
  return (
    <div className="dashboard-request-popover__request">
      <div className="dashboard-request-popover__logo">
        <PortfolioEventLogo
          type={request.type as EVENT_LOGO_TYPE}
          logo={request.logo}
          color={request.color}
        />
      </div>
      <StatisticItem
        className={
          "dashboard-request-popover__statistic-item dashboard-request-popover__statistic-item--title"
        }
        label={request.title}
        invert
        accent
      >
        {request.type}
      </StatisticItem>
      <StatisticItem
        className={"dashboard-request-popover__statistic-item"}
        label={
          request.withdrawAll ? (
            t("withdraw-program.withdrawing-all")
          ) : (
            <NumberFormat
              value={formatCurrencyValue(request.value, request.currency)}
              decimalScale={8}
              displayType="text"
              allowNegative={false}
              suffix={` ${request.currency}`}
            />
          )
        }
        invert
      >
        {moment(request.date).format("ll")}
      </StatisticItem>
      <div className="dashboard-request-popover__btns">
        {request.canCancelRequest && (
          <GVButton color="primary" variant="text" onClick={setOpenPopup}>
            {t("buttons.cancel")}
          </GVButton>
        )}
        <ConfirmPopup
          open={isOpenPopup}
          onClose={setClosePopup}
          onCancel={setClosePopup}
          onApply={handleApplyCancelRequest}
          header={"Cancel request"}
          body={"Please confirm that you want to cancel the request."}
          applyButtonText={t("buttons.confirm")}
          className="dialog--wider"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export interface Props
  extends InjectedTranslateProps,
    WithRoleProps,
    OwnProps {}

interface OwnProps {
  request: ProgramRequest;
  cancelRequest(x: CancelRequestPropsType): void;
  onApplyCancelRequest(): void;
  asset?: ASSET;
}

const DashboardRequest = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(_DashboardRequest);
export default DashboardRequest;
