import { $labelColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeSmall } from "components/gv-styles/gv-sizes";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TextColor } from "components/text/text.types";
import { ChangeState } from "gv-api-web";
import styled from "styled-components";

export const getAssetTagTextColor = (
  changeState: ChangeState
): TextColor | undefined => {
  switch (changeState) {
    case "Decreased":
      return "red";
    case "Increased":
      return "green";
  }
};

export const TagTitleRow = styled(Row)`
  & div {
    font-size: ${$fontSizeSmall}px;
    color: ${$labelColor};
  }
`;

export const AssetTagArrow = styled(RowItem)`
  font-size: 18px;
  line-height: 15px;
`;
