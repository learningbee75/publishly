import { Component, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  private articleService = inject(ArticleService);
  private authorService = inject(AuthorService);

  users = this.authorService.getAllAuthors();
  articles = this.articleService.articles();

  get stats() {
    return {
      userCount: this.users.length,
      articleCount: this.articles.length,
      commentCount: this.articles.reduce((sum, article) => sum + (article.commentCount ?? 0), 0)
    };
  }
}
