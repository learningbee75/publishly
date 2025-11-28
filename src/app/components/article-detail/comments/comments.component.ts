import { Component, computed, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() articleId!: number;

  private commentService = inject(CommentService);

  showSidebar = signal(false);
  comments = signal<any[]>([]);
  displayCount = signal(2);

  newCommentStr = '';
  hasAttachment = signal(false);

  openSidebar() {
    this.showSidebar.set(true);
    this.comments.set(this.commentService.getCommentsByArticle(this.articleId));
  }

  closeSidebar() {
    this.showSidebar.set(false);
  }

  resetComposer() {
    this.newCommentStr = '';
    this.hasAttachment.set(false);
  }

  addComment() {
    const text = this.newCommentStr.trim();
    if (!text && !this.hasAttachment()) return;

    this.commentService.addComment(this.articleId, {
      user: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      likes: 0,
      replies: [],
      attachments: this.hasAttachment() ? ['dummy-attachment'] : []
    });
    this.comments.set(this.commentService.getCommentsByArticle(this.articleId));
    this.resetComposer();
  }

  addEmojiOrPlus() {
    this.hasAttachment.set(true);
  }
  attachImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.hasAttachment.set(true);
    }
  }
  attachFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.hasAttachment.set(true);
    }
  }

  showMore() {
    this.displayCount.set(this.comments().length);
  }

  showReply(comment: any) { comment.showReply = true; }

  addReply(comment: any, replyText: string) {
    const text = replyText.trim();
    if (!text) return;
    this.commentService.addReply(this.articleId, comment, {
      userName: 'You',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    });
    this.comments.set(this.commentService.getCommentsByArticle(this.articleId));
    comment.showReply = false;
  }

  sortMode = signal<'relevant' | 'newest' | 'oldest'>('relevant');

  sortedComments = computed(() => {
    const mode = this.sortMode();
    const list = [...this.comments()];

    if (mode === 'newest') {
      return list.sort((a, b) => new Date(b.createdAt ?? b.time).getTime()
        - new Date(a.createdAt ?? a.time).getTime());
    }
    if (mode === 'oldest') {
      return list.sort((a, b) => new Date(a.createdAt ?? a.time).getTime()
        - new Date(b.createdAt ?? b.time).getTime());
    }

    return list.sort((a, b) => {
      const likeDiff = (b.likes ?? 0) - (a.likes ?? 0);
      if (likeDiff !== 0) return likeDiff;
      return new Date(b.createdAt ?? b.time).getTime()
        - new Date(a.createdAt ?? a.time).getTime();
    });
  });
}
