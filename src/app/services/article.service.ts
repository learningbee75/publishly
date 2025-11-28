import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article.model';
import articlesData from '../data/articles.json';

export interface DummyArticle {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  views: number;
  likes: number;
  featured: boolean;
  publishedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articles = signal<Article[]>(articlesData);
  articles = this._articles.asReadonly();

  getReadersChoice() {
    return this._articles().slice(0, 5);
  }

  fetchArticles(): void {
    this._articles.set(articlesData);
  }

  getArticleById(id: number): Article | undefined {
    return this._articles().find(a => a.id === id);
  }

  incrementViews(id: number): void {
    const articles = this._articles();
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      const article = articles[index];
      const updated = { ...article, views: article.views + 1 };
      this._articles.set([
        ...articles.slice(0, index),
        updated,
        ...articles.slice(index + 1)
      ]);
    }
  }
  
  addArticle(article: Article): void {
    this._articles.update(articles => [article, ...articles]);
  }

  createArticle(article: Article): void {
  
    this._articles.update(articles => [article, ...articles]);
  }

  searchArticles(title: string) {
    const lower = title.toLowerCase();
    return this._articles().filter(a => a.title.toLowerCase().includes(lower));
  }
}
