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

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      const id = +(map.get('id') ?? 0);
      this.articleId.set(id);
      this.article.set(this.articleService.getArticleById(id));
      this.articleService.incrementViews(id);
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
}
