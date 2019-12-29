import { IImageValue } from "components/form/input-image/input-image";
import { TradesDelay } from "gv-api-web";
import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import { programDescriptionSelector } from "pages/programs/program-details/reducers/description.reducer";
import { dispatchProgramDescriptionWithId } from "pages/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProgramInfoSelector } from "reducers/platform-reducer";
import { SetSubmittingType } from "utils/types";

import ProgramSettings from "./program-settings";
import { redirectToProgram } from "./services/program-settings.service";

const _ProgramsEditPage: React.FC = () => {
  const dispatch = useDispatch();

  const createProgramInfo = useSelector(createProgramInfoSelector);
  const description = useSelector(programDescriptionSelector);
  const isProgram = description && description.programDetails;

  const updateDescription = useCallback(
    () => dispatch(dispatchProgramDescriptionWithId(description!.id)),
    [description]
  );

  return (
    <AssetSettingsPage
      redirectToAsset={redirectToProgram}
      asset={isProgram ? CLOSEABLE_ASSET.PROGRAM : CLOSEABLE_ASSET.FOLLOW}
      description={description as AssetDescriptionType}
      dispatchDescription={updateDescription}
      settingsBlocks={(editProgram: any, applyCloseAsset: any) => (
        <ProgramSettings
          updateDescription={updateDescription}
          condition={!!description && !!createProgramInfo}
          createProgramInfo={createProgramInfo}
          closeProgram={applyCloseAsset}
          description={description!}
          editProgram={editProgram}
          loader={<AssetSettingsLoader />}
        />
      )}
    />
  );
};

export type TUpdateProgramFunc = (
  values: {
    tradesDelay?: TradesDelay;
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
    entryFee?: number;
    successFee?: number;
  },
  setSubmitting: SetSubmittingType,
  resetForm?: () => void
) => void;

const ProgramSettingsPage = React.memo(_ProgramsEditPage);
export default ProgramSettingsPage;
