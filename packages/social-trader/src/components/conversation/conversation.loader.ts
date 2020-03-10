import {
  ConversationMessage,
  ConversationPersonalDetails,
  ConversationPost,
  MessageDetailType
} from "components/conversation/conversation.types";
import {
  getRandomInteger,
  getRandomWord,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";

export const getPostDetailLoaderData = (): MessageDetailType => ({
  title: getRandomWord(),
  value: getRandomWord()
});

export const getPostDetailListLoaderData = (): MessageDetailType[] =>
  tableLoaderCreator(getPostDetailLoaderData, 3);

export const getConversationPersonalDetailsLoaderData = (): ConversationPersonalDetails => ({
  canComment: !!getRandomInteger(0, 1),
  canLike: !!getRandomInteger(0, 1),
  liked: !!getRandomInteger(0, 1)
});

export const getConversationMessageLoaderData = (): ConversationMessage => ({
  avatar: "",
  date: new Date().toLocaleString(),
  likesCount: getRandomInteger(1, 10),
  name: getRandomWord(),
  text: getRandomWords(getRandomInteger(10, 20)),
  personalDetails: getConversationPersonalDetailsLoaderData()
});

export const getConversationPostLoaderData = (): ConversationPost => {
  const hasEvent = getRandomInteger(0, 1);
  const message = getConversationMessageLoaderData();
  return {
    ...message,
    details: hasEvent ? getPostDetailListLoaderData() : undefined,
    comments: tableLoaderCreator(
      getConversationMessageLoaderData,
      getRandomInteger(0, 5)
    ),
    personalDetails: getConversationPersonalDetailsLoaderData()
  };
};

export const getConversationPostListLoaderData = (): ConversationPost[] =>
  tableLoaderCreator(getConversationPostLoaderData, getRandomInteger(2, 5));
