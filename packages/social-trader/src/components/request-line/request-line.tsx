import { Center } from "components/center/center";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { MutedText } from "components/muted-text/muted-text";
import { CancelRequestButton } from "components/request-line/cancel-request-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { localizedDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./request-line.module.scss";

const RequestLineItem: React.FC<{ label: string | JSX.Element }> = ({
  children,
  label
}) => {
  return (
    <div>
      <Row>
        <Text size={"small"}>{label}</Text>
      </Row>
      <Row small>
        <MutedText>{children}</MutedText>
      </Row>
    </div>
  );
};

const _RequestLine: React.FC<Props> = ({
  request: { assetDetails, type, amount, currency, date, canCancelRequest, id },
  onApplyCancelRequest
}) => {
  const {
    title,
    successFee,
    entryFee,
    exitFee,
    managementFee,
    assetType
  } = assetDetails;
  const [t] = useTranslation();
  return (
    <Center className={styles["request-line"]}>
      <RowItem small>
        <PortfolioEventLogo withAsset assetDetails={assetDetails} icon={""} />
      </RowItem>
      <RowItem large>
        <Center>
          <RowItem>
            <RequestLineItem label={<Text weight={"bold"}>{title}</Text>}>
              {type}
            </RequestLineItem>
          </RowItem>
          <RowItem>
            <RequestLineItem
              label={
                assetDetails.isWithdrawAll ? (
                  t("withdraw-program.withdrawing-all")
                ) : (
                  <NumberFormat
                    value={formatCurrencyValue(amount, currency)}
                    decimalScale={8}
                    displayType="text"
                    allowNegative={false}
                    suffix={` ${currency}`}
                  />
                )
              }
            >
              {localizedDate(date)}
            </RequestLineItem>
          </RowItem>
          {successFee !== null && (
            <RowItem>
              <RequestLineItem
                label={
                  <NumberFormat
                    value={successFee}
                    suffix={` %`}
                    allowNegative={false}
                    displayType="text"
                  />
                }
              >
                {t("program-details-page.description.successFee")}
              </RequestLineItem>
            </RowItem>
          )}
          {assetType === "Fund" ? (
            <RowItem>
              {entryFee !== null && (
                <RequestLineItem
                  label={
                    <NumberFormat
                      value={entryFee}
                      suffix={` %`}
                      allowNegative={false}
                      displayType="text"
                    />
                  }
                >
                  {t("fund-details-page.description.entryFee")}
                </RequestLineItem>
              )}
            </RowItem>
          ) : (
            <RowItem>
              {managementFee !== null && (
                <RequestLineItem
                  label={
                    <NumberFormat
                      value={managementFee}
                      suffix={` %`}
                      allowNegative={false}
                      displayType="text"
                    />
                  }
                >
                  {t("program-details-page.description.management-fee")}
                </RequestLineItem>
              )}
            </RowItem>
          )}
          {exitFee !== null && (
            <RowItem>
              <RequestLineItem
                label={
                  <NumberFormat
                    value={exitFee}
                    suffix={` %`}
                    allowNegative={false}
                    displayType="text"
                  />
                }
              >
                {t("fund-details-page.description.exitFee")}
              </RequestLineItem>
            </RowItem>
          )}
        </Center>
      </RowItem>
      {canCancelRequest && (
        <RowItem>
          <CancelRequestButton
            onApplyCancelRequest={onApplyCancelRequest}
            id={id}
          />
        </RowItem>
      )}
    </Center>
  );
};

interface Props {
  request: AssetInvestmentRequest;
  onApplyCancelRequest: () => void;
}

const RequestLine = React.memo(_RequestLine);
export default RequestLine;
