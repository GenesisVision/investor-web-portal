import { CommentInput } from "components/conversation/comment/comment-input/comment-input";
import { sendComment } from "components/conversation/conversation.service";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

const _CommentInputContainer: React.FC<Props> = ({}) => {
  const { sendRequest } = useApiRequest({
    request: sendComment
  });
  return <CommentInput onSubmit={sendRequest} />;
};

interface Props {
  id: string;
}

export const CommentInputContainer = React.memo(_CommentInputContainer);
