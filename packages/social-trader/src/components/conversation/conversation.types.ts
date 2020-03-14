export type OnMessageSendFunc = (values: { text: string }) => Promise<void>;

export interface MessageDetailType {
  value: string;
  title: string;
}

export interface ConversationPersonalDetails {
  canLike?: boolean;
  canComment?: boolean;
  liked?: boolean;
}

export interface ConversationMessage {
  id: string;
  avatar: string;
  name: string;
  text?: string;
  date: string | Date;
  likesCount: number;
  personalDetails?: ConversationPersonalDetails;
}

export interface ConversationPost extends ConversationMessage {
  details?: MessageDetailType[];
  comments: ConversationMessage[];
  personalDetails?: ConversationPersonalDetails;
}