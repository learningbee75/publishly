import { Injectable, signal } from '@angular/core';

export interface EditorPostDraft {
  title: string;
  category: string;
  content: string;
  coverImage: string | null;
  scheduledAt: string | null;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  coverImage: string | null;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string | null;
}

export interface Draft {
  id: number;
  userId: number;
  title: string;
  category: string;
  content: string;
  coverImage: string | null;
  scheduledAt: string | null;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts = signal<Post[]>([]);
  posts = this._posts.asReadonly();

  private draftKey = 'editor-draft';

  saveDraft(draft: EditorPostDraft) {
    localStorage.setItem(this.draftKey, JSON.stringify(draft));
  }

  loadDraft(): EditorPostDraft | null {
    const raw = localStorage.getItem(this.draftKey);
    return raw ? JSON.parse(raw) as EditorPostDraft : null;
  }

  clearDraft() {
    localStorage.removeItem(this.draftKey);
  }

  publish(data: Omit<Post, 'id'>) {
    const post: Post = { id: Date.now(), ...data };
    this._posts.update(list => [post, ...list]);
  }

  // dummy users
  users = [
    { id: 1, name: 'Ava Patel' },
    { id: 2, name: 'John Smith' }
  ];

  // dummy drafts
  private _drafts = signal<Draft[]>([
    {
      id: 101,
      userId: 1,
      title: 'My first article...',
      category: 'Wellbeing',
      content: '<p>Draft intro content for first article.</p>',
      coverImage: null,
      scheduledAt: null,
      updatedAt: new Date().toISOString()
    },
    {
      id: 102,
      userId: 1,
      title: 'Angular Signals Deep Dive',
      category: 'Tech',
      content: '<p>Signals draft content with some dummy text.</p>',
      coverImage: null,
      scheduledAt: null,
      updatedAt: new Date().toISOString()
    },
    {
      id: 201,
      userId: 2,
      title: 'Mindful Mornings',
      category: 'Wellbeing',
      content: '<p>Another user draft example.</p>',
      coverImage: null,
      scheduledAt: null,
      updatedAt: new Date().toISOString()
    }
  ]);

  drafts = this._drafts.asReadonly();
  currentUserId = 1;

  getUserDrafts(): Draft[] {
    return this._drafts().filter(d => d.userId === this.currentUserId);
  }

  getDraftById(id: number): Draft | undefined {
    return this._drafts().find(d => d.id === id);
  }

  upsertDraft(draft: Omit<Draft, 'id' | 'updatedAt' | 'userId'> & { id?: number }): Draft {
    const now = new Date().toISOString();
    if (draft.id != null) {
      let updated: Draft | undefined;
      this._drafts.update(list =>
        list.map(d => {
          if (d.id === draft.id) {
            updated = {
              ...d,
              ...draft,
              id: d.id,
              userId: d.userId,
              updatedAt: now
            };
            return updated!;
          }
          return d;
        })
      );
      if (updated) return updated;
    }

    const newId = Math.max(0, ...this._drafts().map(d => d.id)) + 1;
    const newDraft: Draft = {
      id: newId,
      userId: this.currentUserId,
      updatedAt: now,
      ...draft
    };
    this._drafts.update(list => [newDraft, ...list]);
    return newDraft;
  }
}
