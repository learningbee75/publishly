import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/comment.model';
import commentsData from '../data/comments.json';
const DUMMY_COMMENTS: Record<number, any[]> = {
  1: [
    {
      user: 'Anna',
      time: '12:03 PM',
      rawDate: '2024-11-27T12:03:00',
      text: 'Ut in ad laborum minim aliqua mollit...',
      likes: 2,
      replies: []
    },
    {
      user: 'John',
      time: '08:10 AM',
      rawDate: '2025-01-12T08:10:00',
      text: 'Id ullamco qui tempor consectetur...',
      likes: 12,
      replies: [
        {
          user: 'Benjamin Foster',
          time: '08:20 AM',
          rawDate: '2025-01-12T08:20:00',
          text: 'Ipsum anim est consequat commodo reprehenderit...'
        }
      ]
    },
    {
      user: 'Lisa',
      time: '10:50 AM',
      rawDate: '2025-06-01T10:50:00',
      text: 'Anim aute ad dolore et enim...',
      likes: 0,
      replies: []
    }
  ]
  // Add more articles/comments as needed.
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _comments = [...commentsData];

  // getCommentsByArticleId(articleId: number): Observable<Comment[]> {
  //   return of(this._comments.filter(c => c.articleId === articleId));
  // }

  // addComment(articleId: number, userId: number, text: string): void {
  //   const newComment: Comment = {
  //     id: Date.now(),
  //     articleId,
  //     userId,
  //     text,
  //     userName: `User ${userId}`,  // Replace with actual user data lookup
  //     userAvatar: 'assets/avatar.svg',
  //     createdAt: new Date().toISOString(),
  //     likes: 0,
  //     replies: []
  //   };
  //   this._comments.push(newComment as any);
  // }

  // getUserById(userId: number) {
  //   return {
  //     name: `User ${userId}`,
  //     avatar: 'assets/avatar.svg'
  //   };
  // }

   getCommentsByArticle(articleId: number) {
    return DUMMY_COMMENTS[articleId] ? [...DUMMY_COMMENTS[articleId]] : [];
  }
  addComment(articleId: number, comment: any) {
    if (!DUMMY_COMMENTS[articleId]) DUMMY_COMMENTS[articleId] = [];
    DUMMY_COMMENTS[articleId].unshift(comment);
  }
  addReply(articleId: number, comment: any, reply: any) {
    comment.replies = comment.replies || [];
    comment.replies.push(reply);
  }

  
}
