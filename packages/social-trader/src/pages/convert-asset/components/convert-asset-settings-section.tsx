import AssetContent from "components/assets/asset-fields/asset-content";
import { TFAConfirmBlock } from "components/assets/tfa-confirm-block";
import useIsOpen from "hooks/is-open.hook";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  createFollowInfoSelector,
  programsInfoSelector
} from "reducers/platform-reducer";

import useConvertAssetSubmit from "../convert-asset-submit.hook";
import ConvertAssetSettings, {
  IConvertAssetSettingsFormOwnProps
} from "./convert-asset-settings";

const _ConvertAssetSettingsSection: React.FC<Props> = ({
  currency,
  fromTo,
  id,
  broker
}) => {
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();

  const programsInfo = useSelector(programsInfoSelector);
  const followInfo = useSelector(createFollowInfoSelector);

  const handleCreate = useConvertAssetSubmit({
    fromTo,
    condition: ({ twoFactorRequired, programId }) => {
      if (twoFactorRequired) {
        setProgramId(programId);
        setTwoFactorRequired();
        return false;
      }
      return true;
    }
  });

  return (
    <AssetContent>
      <ConvertAssetSettings
        followInfo={followInfo}
        currency={currency}
        id={id}
        broker={broker}
        fromTo={fromTo}
        programsInfo={programsInfo}
        onSubmit={handleCreate}
      />
      {twoFactorRequired && <TFAConfirmBlock id={programId!} />}
    </AssetContent>
  );
};

export const ConvertAssetSettingsSection = React.memo(
  _ConvertAssetSettingsSection
);

interface Props extends IConvertAssetSettingsFormOwnProps {}
