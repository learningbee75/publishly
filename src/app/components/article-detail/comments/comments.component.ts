// // import { Component, Input, OnInit, inject, signal } from '@angular/core';
// // import { CommentService } from '../../../services/comment.service';
// // import { AuthService } from '../../../services/auth.service';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-comments',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './comments.component.html',
// //   styleUrls: ['./comments.component.scss']
// // })
// // export class CommentsComponent implements OnInit {
// //   private commentService = inject(CommentService);
// //   private auth = inject(AuthService);

// //   @Input() articleId!: number;

// //   commentText = signal('');
// //   sortBy = signal<'newest'|'oldest'|'top'>('newest');

// //   comments = signal<any[]>([]);

// //   ngOnInit() {
// //     this.loadComments();
// //   }

// //   // loadComments() {
// //   //   this.commentService.getCommentsByArticleId(this.articleId).subscribe(list => {
// //   //     this.comments.set([...list].sort((a, b) => {
// //   //       if (this.sortBy() === 'oldest') return +new Date(a.createdAt) - +new Date(b.createdAt);
// //   //       if (this.sortBy() === 'top') return b.likes - a.likes;
// //   //       return +new Date(b.createdAt) - +new Date(a.createdAt);
// //   //     }));
// //   //   });
// //   // }

// //   loadComments() {
// //   this.commentService.getCommentsByArticleId(this.articleId).subscribe(list => {
// //     this.comments.set([...list].sort((a, b) => {
// //       if (this.sortBy() === 'oldest') 
// //         return +new Date(a.createdAt) - +new Date(b.createdAt);
// //       if (this.sortBy() === 'top') 
// //         return (b.likes ?? 0) - (a.likes ?? 0);   // <-- handle undefined likes safely
// //       return +new Date(b.createdAt) - +new Date(a.createdAt);
// //     }));
// //   });
// // }

// //   submitComment() {
// //     const text = this.commentText().trim();
// //     const user = this.auth.currentUser();
// //     if (user && text) {
// //       this.commentService.addComment(this.articleId, parseInt(user.id, 10), text);
// //       this.commentText.set('');
// //       this.loadComments();
// //     }
// //   }

// //   // getUser(userId: number) {
// //   //   return this.commentService.getUserById(userId);
// //   // }

// //   getUser(userId: number) {
// //   return this.commentService.getUserById(userId) ?? { name: '', avatar: '' };
// // }

// //   isLoggedIn() {
// //     return this.auth.isLoggedIn();
// //   }
// // }


// import { Component, inject, Input, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CommentService } from '../../../services/comment.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-comments',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './comments.component.html',
//   styleUrls: ['./comments.component.scss']
// })
// export class CommentsComponent {
//   @Input() articleId!: number;
//   commentsService = inject(CommentService)
//   showSidebar = signal(false);
//   newCommentStr = '';
//   newComment = signal('');
//   comments = signal(this.commentsService.getCommentsByArticle(this.articleId));
//   displayCount = signal(3);

//   openSidebar() {
//     this.showSidebar.set(true);
//     this.comments.set(this.commentsService.getCommentsByArticle(this.articleId));
//   }
//   closeSidebar() { this.showSidebar.set(false); }

//   // addComment() {
//   //   if (this.newComment().trim()) {
//   //     this.commentsService.addComment(this.articleId, {
//   //       user: 'You',
//   //       time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),
//   //       text: this.newComment(),
//   //       likes: 0,
//   //       replies: []
//   //     });
//   //     this.comments.set(this.commentsService.getCommentsByArticle(this.articleId));
//   //     this.newComment.set('');
//   //   }
//   // }

//   addComment() {
//   const text = this.newCommentStr.trim();
//   if (!text) return;

//   this.commentsService.addComment(this.articleId, {
//     user: 'You',
//     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     text,
//     likes: 0,
//     replies: []
//   });
//   this.newCommentStr = '';
//   this.comments.set(this.commentsService.getCommentsByArticle(this.articleId));
// }

//   showMore() { this.displayCount.set(this.comments().length); }
//   showReply(comment: any) { comment.showReply = true; }
//   addReply(comment: any, replyText: string) {
//     if (replyText.trim()) {
//       this.commentsService.addReply(this.articleId, comment, {
//         user: 'You',
//         time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),
//         text: replyText
//       });
//       this.comments.set(this.commentsService.getCommentsByArticle(this.articleId));
//       comment.showReply = false;
//     }
//   }

//   onCommentChange(val: string) {
//   this.newCommentStr = val;
//   this.newComment.set(val);
// }
// }

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
  hasAttachment = signal(false); // simple flag to demo attachments

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

  // Dummy handlers for attachment icons
  addEmojiOrPlus() {
    // hook for emoji/poll/etc. For now just mark attachment flag
    this.hasAttachment.set(true);
  }
  attachImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.hasAttachment.set(true);
      // real app: upload or store file ref here
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
      user: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    });
    this.comments.set(this.commentService.getCommentsByArticle(this.articleId));
    comment.showReply = false;
  }

  sortMode = signal<'relevant' | 'newest' | 'oldest'>('relevant');

  // derived sorted comments
  sortedComments = computed(() => {
    const mode = this.sortMode();
    const list = [...this.comments()];

    if (mode === 'newest') {
      return list.sort((a, b) => new Date(b.rawDate ?? b.time).getTime()
                               - new Date(a.rawDate ?? a.time).getTime());
    }
    if (mode === 'oldest') {
      return list.sort((a, b) => new Date(a.rawDate ?? a.time).getTime()
                               - new Date(b.rawDate ?? b.time).getTime());
    }
    // "relevant": more likes first, then newest
    return list.sort((a, b) => {
      const likeDiff = (b.likes ?? 0) - (a.likes ?? 0);
      if (likeDiff !== 0) return likeDiff;
      return new Date(b.rawDate ?? b.time).getTime()
           - new Date(a.rawDate ?? a.time).getTime();
    });
  });
}
