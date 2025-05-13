export type User = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};

export type Suggestion = {
  id: number;
  user: User;
  followed?: boolean;
};

export type Recommendation = {
  id: number;
  title: string;
  icon: string;
};

export type Story = {
  id: number;
  user: User;
  image: string;
};

export type Message = {
  id: number;
  sender: User;
  receiver: User;
  text: string;
  time: string;
  isRead: boolean;
};

export type Chat = {
  id: number;
  user: User;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
};

export type Post = {
  id: number;
  user: User;
  content: string;
  prompt: string;
  model: string;
  images: string[];
  likes: number;
  timeAgo: string;
  mentions?: { name: string; username: string }[];
  reactions?: { emoji: string; count: number }[];
  location?: string;
}; 