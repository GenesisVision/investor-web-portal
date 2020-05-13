import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import { ASSET } from "constants/constants";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import DetailsDescriptionControl from "./details-description-control";
import styles from "./details-description-control.module.scss";

const _DetailsFavorite: React.FC<Props> = ({
  asset,
  id,
  isFavorite: isFavoriteProp
}) => {
  const [t] = useTranslation();
  const [isFavorite, setIsFavoriteValue] = useState(isFavoriteProp);

  const onApply = useCallback(() => {
    setIsFavoriteValue(!isFavorite);
  }, [isFavorite]);
  return (
    <ToggleAssetFavoriteButton
      onApply={onApply}
      assetType={asset}
      id={id}
      isFavorite={isFavorite}
    >
      <DetailsDescriptionControl
        text={t("fund-details-page.description.addToFavorites")}
      >
        <FavoriteIcon
          className={styles["details-description-control__icon"]}
          selected={isFavorite}
        />
      </DetailsDescriptionControl>
    </ToggleAssetFavoriteButton>
  );
};

interface Props {
  asset?: ASSET;
  id: string;
  isFavorite: boolean;
}

const DetailsFavorite = React.memo(_DetailsFavorite);
export default DetailsFavorite;
