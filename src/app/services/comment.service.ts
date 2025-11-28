import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/comment.model';
import commentsData from '../data/comments.json';

export interface CommentData {
  articleId: number;
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _comments: CommentData[] = commentsData as CommentData[];

  getCommentsByArticle(articleId: number) {
    const entry = this._comments.find(c => c.articleId === articleId);
    return entry ? [...entry.comments] : [];
  }
  addComment(articleId: number, comment: any) {
    let entry = this._comments.find(c => c.articleId === articleId);

    if (!entry) {
      entry = { articleId, comments: [] };
      this._comments.push(entry);
    }

    entry.comments.unshift(comment);
  }

  addReply(articleId: number, parentComment: Comment, reply: Comment): void {
    parentComment.replies = parentComment.replies || [];
    parentComment.replies.push(reply);
  }
}
