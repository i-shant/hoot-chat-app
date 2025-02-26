export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Chat = {
  _id: string;
  members: User[];
  lastMessage?: Message;
  typing?: boolean;
};

export type Message = {
  _id: string;
  sender: string;
  content: string;
  chat: string;
  createdAt: string;
};

export type PendingMessage = {
  chatId: string;
  content: string;
};
