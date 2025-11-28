import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleCardComponent } from './article-card/article-card.component';
import { FeaturedCarouselComponent } from './featured-carousel/featured-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ArticleCardComponent, FeaturedCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private articleService = inject(ArticleService);

  searchTerm = signal('');
  sortOption = signal('latest');
  currentPage = signal(1);
  articlesPerPage = 8;

  ngOnInit() {
    this.articleService.fetchArticles?.();
  }

  articles = computed(() => {
    let filtered = this.articleService.articles().filter(article =>
      article.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      article.summary.toLowerCase().includes(this.searchTerm().toLowerCase()));
    if (this.sortOption() === 'latest') filtered = filtered.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    if (this.sortOption() === 'popular') filtered = filtered.sort((a, b) => b.views - a.views);
    if (this.sortOption() === 'editors-pick') filtered = filtered.filter(a => a.featured);
    return filtered;
  });

  paginatedArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.articlesPerPage;
    return this.articles().slice(start, start + this.articlesPerPage);
  });

  totalPages = computed(() =>
    Math.ceil(this.articles().length / this.articlesPerPage)
  );

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(n => n + 1);
  }
  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update(n => n - 1);
  }
}
