import "shared/components/details/details.scss";

import "./asset-settings.scss";

import { TUpdateProgramFunc } from "pages/programs/programs-settings/program-settings.page";
import React, { useCallback, useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import Page from "shared/components/page/page";
import { ASSET } from "shared/constants/constants";
import { DispatchDescriptionType } from "shared/utils/types";

import { AssetDescriptionType, TUpdateAssetFunc } from "./asset-settings.types";
import { editAsset } from "./services/asset-settings.service";

const _AssetsEditPage: React.FC<Props> = ({
  asset,
  settingsBlocks,
  service: { dispatchDescription, editAsset, redirectToAsset },
  t,
  description
}) => {
  useEffect(() => {
    dispatchDescription();
  }, []);
  const editAssetCallback: TUpdateAssetFunc = useCallback(
    values => {
      const currentValues = {
        title: description!.title,
        stopOutLevel: description!.stopOutLevel,
        description: description!.description,
        logo: { src: description!.logo },
        investmentLimit: description!.availableInvestmentLimit
      };
      editAsset(description!.id, { ...currentValues, ...values }, asset).then(
        dispatchDescription
      );
    },
    [description]
  );
  const applyCloseAsset = useCallback(() => redirectToAsset(), []);
  const title = t("manager.asset-settings.title", {
    asset: String(asset).toLowerCase()
  });
  return (
    <Page title={title}>
      <div className="asset-settings">
        <h1 className="asset-settings__title">{title}</h1>
        {settingsBlocks(editAssetCallback, applyCloseAsset)}
      </div>
    </Page>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { dispatchDescription, redirectToAsset }: Props
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchDescription,
      editAsset,
      redirectToAsset
    },
    dispatch
  )
});

interface OwnProps {
  redirectToAsset: () => void;
  asset: ASSET;
  description?: AssetDescriptionType;
  dispatchDescription: DispatchDescriptionType;
  settingsBlocks: (
    editAsset: TUpdateProgramFunc,
    closeAsset: () => void
  ) => JSX.Element;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchDescription: DispatchDescriptionType;
  editAsset: typeof editAsset;
  redirectToAsset: () => void;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps, WithTranslation {}

const AssetSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_AssetsEditPage);
export default AssetSettingsPage;
