// explore.component.ts
import { Component, signal, inject } from '@angular/core';
import { ArticleService, DummyArticle } from '../../services/article.service';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selectedType = 'Authors';
  authorSearch = '';

  filteredAuthors = signal(this.authorService.getRisingAuthors());
  filteredArticles = signal<DummyArticle[]>(this.articleService.getReadersChoice());
  trendingTags = signal(['Everything Explained', 'Teen Reads', 'Family Therapy']);

  // readersChoice = signal(this.articleService.getReadersChoice());
  // risingAuthors = signal(this.authorService.getRisingAuthors());

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
