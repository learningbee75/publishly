import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss']
})
export class FeaturedCarouselComponent implements OnInit {
  private articleService = inject(ArticleService);
  featuredArticles = signal<any[]>([]);

  ngOnInit() {
    const all = this.articleService.articles();
    this.featuredArticles.set(all.filter(article => article.featured));
  }
}
