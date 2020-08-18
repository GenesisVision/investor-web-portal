import clsx from "clsx";
import { ConversationComment } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Message } from "components/conversation/message/message";
import { MessageActions } from "components/conversation/message/message-actions/message-actions";
import { Reply } from "components/conversation/reply/reply";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useEffect, useRef } from "react";

import styles from "./comment.module.scss";

const _Comment: React.FC<Props> = ({
  canReply,
  updateData,
  comment: {
    likesUsers,
    isHighlighted,
    url,
    tags,
    images,
    date,
    text,
    id,
    personalDetails,
    likesCount,
    author
  }
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current !== null && isHighlighted) {
      const top = ref.current.getBoundingClientRect().top;
      window.scroll({ left: 0, top });
    }
  }, [ref.current]);

  return (
    <div
      ref={ref}
      className={clsx(styles["comment"], {
        [styles["comment--highlighted"]]: isHighlighted
      })}
    >
      <Row className={styles["comment__message"]} center={false}>
        <RowItem wide>
          <Message
            row={false}
            settingsBlock={
              <MessageActions
                url={url}
                actions={personalDetails}
                id={id}
                onApply={updateData}
                setDeleted={updateData}
              />
            }
            url={url}
            excludedTagsUnderText={["User"]}
            tags={tags}
            images={images}
            date={date}
            text={text}
            author={author}
          />
        </RowItem>
      </Row>
      <Row className={styles["comment__buttons"]}>
        <RowItem wide>{canReply && <Reply author={author} />}</RowItem>
        <RowItem>
          <LikeContainer
            likesUsers={likesUsers}
            id={id}
            canLike={!!personalDetails}
            count={likesCount}
            liked={personalDetails?.isLiked}
          />
        </RowItem>
      </Row>
    </div>
  );
};

interface Props {
  canReply?: boolean;
  updateData: VoidFunction;
  comment: ConversationComment;
}

export const Comment = React.memo(_Comment);
