// explore.component.ts
import { Component, signal, inject, computed } from '@angular/core';
import { ArticleService, DummyArticle } from '../../services/article.service';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  private articleService = inject(ArticleService);
  private authorService = inject(AuthorService);
  private router = inject(Router)
  selectedType = 'Authors';
  authorSearch = '';

  filteredAuthors = signal(this.authorService.getRisingAuthors());
  filteredArticles = signal<DummyArticle[]>(this.articleService.getReadersChoice());
  trendingTags = signal(['Everything Explained', 'Teen Reads', 'Family Therapy']);

  // readersChoice = signal(this.articleService.getReadersChoice());
  // risingAuthors = signal(this.authorService.getRisingAuthors());

  cardsStartIndex = signal(0);  // first visible index
cardsPerPage = 4;            // how many cards are visible at once

readersArticles = computed(() => this.filteredArticles()); // or your existing source

readersPaginated = computed(() => {
  const all = this.readersArticles();
  const start = this.cardsStartIndex();
  const end = start + this.cardsPerPage;
  return all.slice(start, end);
});

canSlidePrev = computed(() => this.cardsStartIndex() > 0);

canSlideNext = computed(() => {
  const allLength = this.readersArticles().length;
  return this.cardsStartIndex() + this.cardsPerPage < allLength;
});

slidePrev() {
  if (!this.canSlidePrev()) return;
  this.cardsStartIndex.update(i => i - 1);
}

slideNext() {
  if (!this.canSlideNext()) return;
  this.cardsStartIndex.update(i => i + 1);
}

onBack() {
    this.router.navigate(['/']); // or history.back();
  }

  searchAuthors() {
    this.filteredAuthors.set(this.authorService.getRisingAuthors());
    this.filteredArticles.set(this.articleService.getReadersChoice());
    const search = this.authorSearch.trim();
    if (this.selectedType === 'Authors') {
      this.filteredAuthors.set(
        search
          ? this.authorService.searchAuthors(search)
          : this.authorService.getRisingAuthors()
      );
    } else {
      this.filteredArticles.set(
        search
          ? this.articleService.searchArticles(search) // Add method as needed
          : this.articleService.getReadersChoice()
      );
    }
  }
}
