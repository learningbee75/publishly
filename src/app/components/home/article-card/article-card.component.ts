import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from '../../../models/article.model';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent  implements OnInit {
  @Input() article!: Article;
  
  private authorService = inject(AuthorService);
  author = signal<Author | undefined>(undefined);

  ngOnInit() {    
    if (this.article?.authorId) {
      this.author.set(this.authorService.getAuthorById(this.article.authorId));
    }
  }
}
