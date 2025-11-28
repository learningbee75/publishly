export interface Comment {
  id: number;
  articleId: number;
  userId: number;
  userName?: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  likes?: number;
  replies?: Comment[];
}
