import { Component, OnInit, OnDestroy, inject, signal, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { PostService, EditorPostDraft, Draft } from '../../services/post.service';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEditorModule, PreviewModalComponent, RouterModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  private postService = inject(PostService);
  private router = inject(Router)
  @ViewChild(PreviewModalComponent) previewModal!: PreviewModalComponent;

  editor!: Editor;

  title = 'My first article...';
  category = '';
  content = '';
  coverImage: string | null = null;

  isSavingDraft = signal(false);
  isPublishing = signal(false);
  scheduleEnabled = signal(false);
  scheduledAt = signal<string | null>(null);
  currentDraftId = signal<number | null>(null);
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right'],
    ['undo', 'redo']
  ];
  userDrafts = computed(() => this.postService.getUserDrafts());

  ngOnInit() {
    this.editor = new Editor();
    this.startNewDraft();
  }

  ngOnDestroy() {
    this.editor.destroy();
  }

  startNewDraft() {
    this.currentDraftId.set(null);
    this.title = 'My first article...';
    this.category = '';
    this.content = '';
    this.coverImage = null;
    this.scheduledAt.set(null);
    this.scheduleEnabled.set(false);
  }

  loadDraft(id: number | null) {
    if (!id) return;
    const d = this.postService.getDraftById(id);
    if (!d) return;
    this.currentDraftId.set(d.id);
    this.title = d.title;
    this.category = d.category;
    this.content = d.content;
    this.coverImage = d.coverImage;
    this.scheduledAt.set(d.scheduledAt);
    this.scheduleEnabled.set(!!d.scheduledAt);
  }

  onCoverSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.coverImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveDraft() {
    this.isSavingDraft.set(true);
    const payloadId = this.currentDraftId();
    const saved: Draft = this.postService.upsertDraft({
      id: payloadId !== null ? payloadId : undefined,
      title: this.title,
      category: this.category,
      content: this.content,
      coverImage: this.coverImage,
      scheduledAt: this.scheduleEnabled() ? this.scheduledAt() : null
    });
    this.currentDraftId.set(saved.id);
    this.isSavingDraft.set(false);
  }

  publishNow() {
    this.isPublishing.set(true);
    this.postService.publish({
      title: this.title,
      category: this.category,
      content: this.content,
      coverImage: this.coverImage,
      status: 'published',
      publishedAt: new Date().toISOString()
    });
    this.postService.clearDraft();
    this.isPublishing.set(false);
  }

  schedulePost() {
    if (!this.scheduledAt()) return;
    this.isPublishing.set(true);
    this.postService.publish({
      title: this.title,
      category: this.category,
      content: this.content,
      coverImage: this.coverImage,
      status: 'scheduled',
      publishedAt: this.scheduledAt()!
    });
    this.postService.clearDraft();
    this.isPublishing.set(false);
  }

  openPreview() {
    const previewObj = {
      title: this.title,
      category: this.category,
      content: this.content,
      coverImage: this.coverImage,
      scheduledAt: this.scheduleEnabled() ? this.scheduledAt() : null
    };
    this.previewModal.open(previewObj);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  publishArticle(): void {
   alert('Publish clicked');
  }

  newArticle(): void {
    this.startNewDraft();
  }
}
