import "./fields.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { allowValuesNumberFormat } from "shared/utils/helpers";

const _FeesSettings: React.FC<Props> = ({
  title,
  entryFeeName,
  successFeeName,
  entryFeeDescription,
  successFeeDescription
}) => {
  const { t } = useTranslation();
  return (
    <div className="create-asset-settings__row">
      <div className="create-asset-settings__row-title">{title}</div>
      <div className="create-asset-settings__field">
        <GVFormikField
          name={entryFeeName}
          label={t("manager.create-program-page.settings.fields.entry-fee")}
          adornment="%"
          component={GVTextField}
          type="number"
          autoComplete="off"
          decimalScale={4}
          isAllowed={allowValuesNumberFormat()}
        />
        <Hint
          content={t("manager.create-program-page.settings.hints.entry-fee")}
          className="create-asset-settings__field-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={entryFeeDescription}
        />
      </div>
      <div className="create-asset-settings__field">
        <GVFormikField
          name={successFeeName}
          label={t("manager.create-program-page.settings.fields.success-fee")}
          adornment="%"
          component={GVTextField}
          type="number"
          autoComplete="off"
          decimalScale={4}
          isAllowed={allowValuesNumberFormat()}
        />
        <Hint
          content={t("manager.create-program-page.settings.hints.success-fee")}
          className="create-asset-settings__field-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={successFeeDescription}
        />
      </div>
    </div>
  );
};

interface Props {
  title: string;
  entryFeeName: string;
  successFeeName: string;
  entryFeeDescription: string;
  successFeeDescription: string;
}

const FeesSettings = React.memo(_FeesSettings);
export default FeesSettings;
