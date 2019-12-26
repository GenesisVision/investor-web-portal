import "./asset-settings.scss";

import Page from "components/page/page";
import useApiRequest from "hooks/api-request.hook";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import { TUpdateProgramFunc } from "pages/programs/programs-settings/program-settings.page";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AssetDescriptionType, TUpdateAssetFunc } from "./asset-settings.types";
import { editAsset } from "./services/asset-settings.service";

const _AssetsEditPage: React.FC<Props> = ({
  dispatchDescription,
  asset,
  settingsBlocks,
  redirectToAsset,
  description
}) => {
  const successMessage = `edit-asset.notifications.edit-success.${asset.toLowerCase()}`;
  const { sendRequest: editRequest } = useApiRequest({
    middleware: [dispatchDescription],
    request: editAsset,
    successMessage
  });
  const [t] = useTranslation();
  useEffect(() => {
    dispatchDescription();
  }, []);
  const editAssetCallback: TUpdateAssetFunc = useCallback(
    (values, setSubmitting, resetForm) => {
      const investmentLimit =
        "hasInvestmentLimit" in values
          ? values.hasInvestmentLimit
            ? values.investmentLimit || null
            : null
          : description!.availableInvestmentLimit;
      const currentValues = {
        tradesDelay: description!.tradesDelay,
        exitFee: description!.exitFeeSelected, //exitFee
        entryFee: description!.entryFeeSelected, //entryFee
        successFee: description!.successFeeSelected,
        title: description!.publicInfo.title,
        stopOutLevel: description!.stopOutLevelSelected, // TODO current != selected ? current (selected) : current
        description: description!.publicInfo.description,
        logo: { src: description!.publicInfo.logo }
      };
      editRequest({
        id: description!.id,
        editAssetData: {
          ...currentValues,
          ...values,
          investmentLimit
        }
      }).finally(resetForm);
    },
    [description, editAsset]
  );
  const applyCloseAsset = useCallback(() => redirectToAsset(description!.id), [
    description,
    redirectToAsset
  ]);
  const title = t("asset-settings.title");
  return (
    <Page title={title}>
      <div className="asset-settings">
        <h1 className="asset-settings__title">{title}</h1>
        {settingsBlocks(editAssetCallback, applyCloseAsset)}
      </div>
    </Page>
  );
};

interface Props {
  redirectToAsset: (id: string) => void;
  asset: CLOSEABLE_ASSET;
  description?: AssetDescriptionType;
  dispatchDescription: () => void;
  settingsBlocks: (
    editAsset: TUpdateProgramFunc,
    closeAsset: () => void
  ) => JSX.Element;
}

const AssetSettingsPage = React.memo(_AssetsEditPage);
export default AssetSettingsPage;
