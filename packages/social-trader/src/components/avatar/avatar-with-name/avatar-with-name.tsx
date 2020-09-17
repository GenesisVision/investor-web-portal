import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { OptionalClickable, Sizeable } from "utils/types";

interface Props extends Sizeable, OptionalClickable {
  className?: string;
  avatar?: React.ReactNode;
  name: string | JSX.Element | React.ReactNode;
}

const _AvatarWithName: React.FC<Props> = ({
  className,
  onClick,
  size,
  avatar,
  name
}) => {
  return (
    <Row className={className} onClick={onClick}>
      {avatar && (
        <RowItem size={size}>
          <Row>{avatar}</Row>
        </RowItem>
      )}
      <RowItem>
        <Text wrap={false}>{name}</Text>
      </RowItem>
    </Row>
  );
};

export const AvatarWithName = React.memo(_AvatarWithName);
