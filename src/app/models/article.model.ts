export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  authorId: number;
  authorName?: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  commentCount?: number;
}
