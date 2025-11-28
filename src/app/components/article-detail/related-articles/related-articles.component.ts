import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-related-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.scss']
})
export class RelatedArticlesComponent implements OnInit {
  private articleService = inject(ArticleService);

  @Input() currentArticleId!: number;
  relatedArticles = signal<any[]>([]);

  @Input() showCarousel = false;
  carouselIndex = 0;
  visibleCount = 2;

  ngOnInit() {
    const current = this.articleService.getArticleById(this.currentArticleId);
    if (!current) return this.relatedArticles.set([]);
    const candidates = this.articleService.articles()
      .filter(a => a.id !== current.id &&
        (a.authorId === current.authorId || a.tags.some(t => current.tags.includes(t)))
      ).slice(0, 4);
    console.log(this.articleService.articles())
    console.log(candidates)
    this.relatedArticles.set(candidates);
  }

  currentRelated() {
    return this.showCarousel ?
    this.relatedArticles().slice(this.carouselIndex, this.carouselIndex + this.visibleCount) :
    this.relatedArticles();
    // if (!this.showCarousel) return this.relatedArticles;
    // return this.relatedArticles().slice(this.carouselIndex, this.carouselIndex + this.visibleCount);
  }

  next() {
    if (this.carouselIndex + this.visibleCount < this.relatedArticles().length)
      this.carouselIndex++;
  }

  prev() {
    if (this.carouselIndex > 0)
      this.carouselIndex--;
  }
}
