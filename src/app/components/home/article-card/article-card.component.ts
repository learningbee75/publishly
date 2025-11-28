import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from '../../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: Article;
}
