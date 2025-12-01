import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, CommentsComponent, RelatedArticlesComponent],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private articleService = inject(ArticleService);
  private authorService = inject(AuthorService);
  @ViewChild('commentsSidebar') commentsSidebar!: CommentsComponent;
  articleId = signal<number>(0);
  article = signal<any>(null);
  private bookmarked = signal<boolean>(false);

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      const id = +(map.get('id') ?? 0);
      this.articleId.set(id);
      this.article.set(this.articleService.getArticleById(id));
      this.articleService.incrementViews(id);
    });

    this.route.paramMap.subscribe(map => {
      const id = +(map.get('id') ?? 0);
      this.articleId.set(id);
      const art = this.articleService.getArticleById(id);
      this.article.set(art);
      if (art) {
        this.articleService.incrementViews(id);
        const saved = localStorage.getItem('bookmarkedArticles') ?? '[]';
        const ids = JSON.parse(saved) as number[];
        this.bookmarked.set(ids.includes(id));
      }
    });
  }

  get author() {
    return this.article() ? this.authorService.getAuthorById(this.article().authorId) : null;
  }

  goBack() {
    this.router.navigate(['/'])
  }

  showComments() {
    this.commentsSidebar.openSidebar();
  }

  isBookmarked(): boolean {
    return this.bookmarked();
  }

  toggleBookmark(): void {
    const id = this.articleId();
    const saved = localStorage.getItem('bookmarkedArticles') ?? '[]';
    let ids = JSON.parse(saved) as number[];

    if (this.bookmarked()) {
      ids = ids.filter(x => x !== id);
      this.bookmarked.set(false);
    } else {
      if (!ids.includes(id)) ids.push(id);
      this.bookmarked.set(true);
    }

    localStorage.setItem('bookmarkedArticles', JSON.stringify(ids));
  }

  async shareArticle(): Promise<void> {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.article()?.title,
          text: this.article()?.summary || '',
          url
        });
      } catch {
        console.log('error occurred while sharing');
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard.');
    }
  }

  async copyLink(): Promise<void> {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard.');
  }

  reportArticle(): void {
    alert('Thanks for your feedback. This article will be reviewed.');
  }
}
