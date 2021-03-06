import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import Link from "components/link/link";
import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "utils/style/media";
import { adaptiveMargin } from "utils/style/mixins";
import { $fontSizeH1, $fontSizeH2, $paddingXsmall } from "utils/style/sizes";

export type DashboardBlockOrientation = "landscapeTablet" | "tablet";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  headerButton?: ReactNode;
  orientation?: DashboardBlockOrientation;
  label?: string;
  all?: string;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  ${adaptiveMargin("bottom", $paddingXsmall)};
`;

const Arrow = styled.div`
  display: inline-block;
  text-align: center;
  font-size: ${$fontSizeH1}px;
  line-height: ${$fontSizeH2}px;
  width: ${$fontSizeH2}px;
`;

const Container = styled.div<{ orientation?: DashboardBlockOrientation }>`
  margin-bottom: ${$paddingXsmall}px;
  &:not(:last-child) {
    ${({ orientation }) => {
      switch (orientation) {
        case "tablet":
          return mediaBreakpointTablet(`margin-right: ${$paddingXsmall}px;`);
        case "landscapeTablet":
          return mediaBreakpointLandscapeTablet(
            `margin-right: ${$paddingXsmall}px;`
          );
      }
    }};
  }
`;

const DashboardBlock: React.FC<Props> = ({
  headerButton,
  orientation,
  label,
  all,
  children
}) => {
  return (
    <Container orientation={orientation}>
      <DefaultTableBlock table tall>
        {(label || all) && (
          <Link to={all} noColor>
            <DetailsBlockTitleBox>
              <Header>
                {label && <h3>{label}</h3>}
                {all && <Arrow>&rsaquo;</Arrow>}
                {headerButton}
              </Header>
            </DetailsBlockTitleBox>
          </Link>
        )}
        {children}
      </DefaultTableBlock>
    </Container>
  );
};

export default DashboardBlock;
