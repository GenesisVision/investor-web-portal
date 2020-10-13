import FormError, {
  IFormErrorProps
} from "components/form/form-error/form-error";
import { Row } from "components/row/row";
import * as React from "react";
import styled from "styled-components";
import { $fontSizeCommon } from "utils/style/sizes";
import { fontSize } from "utils/style/style-mixins";

const StyledRow = styled(Row)`
  ${fontSize($fontSizeCommon)};
`;

export const _DialogError: React.FC<IFormErrorProps> = ({ error }) => (
  <StyledRow>
    <FormError error={error} />
  </StyledRow>
);

export const DialogError = React.memo(_DialogError);
