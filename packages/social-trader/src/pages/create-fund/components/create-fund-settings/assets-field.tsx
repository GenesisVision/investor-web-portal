import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ReallocateFieldWrapper } from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field-wrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fundAssetsSelector } from "reducers/platform-reducer";

const _AssetsField: React.FC<{ name: string }> = ({ name }) => {
  const [t] = useTranslation();
  const assets = useSelector(fundAssetsSelector);
  return (
    <>
      <Text muted size={"small"}>
        {t("create-fund-page:settings.fields.mandatory-assets")}
      </Text>
      <Row onlyOffset wide>
        <GVHookFormField
          scheduleMessage={t("trading-schedule.create-fund")}
          name={name}
          component={ReallocateFieldWrapper}
          assets={assets}
        />
      </Row>
    </>
  );
};
export const AssetsField = React.memo(_AssetsField);
