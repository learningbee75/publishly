// import { Injectable, signal } from '@angular/core';
// import { Article } from '../models/article.model';
// import articlesData from '../data/articles.json';

// @Injectable({
//   providedIn: 'root'
// })
// export class ArticleService {
//   private _articles = signal<Article[]>(articlesData);
//   articles = this._articles.asReadonly();

//   getArticleById(id: number): Article | undefined {
//     return this._articles().find(article => article.id === id);
//   }

//   incrementViews(articleId: number): void {
//     const articles = this._articles();
//     const index = articles.findIndex(a => a.id === articleId);
//     if (index !== -1) {
//       const updatedArticle = { ...articles[index], views: articles[index].views + 1 };
//       this._articles.set([
//         ...articles.slice(0, index),
//         updatedArticle,
//         ...articles.slice(index + 1)
//       ]);
//     }
//   }

//   createArticle(article: Article): void {
//     this._articles.set([article, ...this._articles()]);
//   }
// }


import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article.model';

// Dummy data import or define your static data here:
import articlesData from '../data/articles.json';
import { DUMMY_ARTICLES } from '../data/articles-data';

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
  // Signal holding the article list
  private _articles = signal<Article[]>(articlesData);
  articles = this._articles.asReadonly();

  private _dummyArticles = signal(DUMMY_ARTICLES);
  dummyArticles = this._dummyArticles.asReadonly();

  getReadersChoice() {
    return this._articles().slice(0, 5); // Top 4, customize as needed
  }

  // Optional: Simulate async fetch of articles (could be HTTP call)
  fetchArticles(): void {
    // For demo, we just reset the signal with the static data;
    // replace this with real HTTP call or other logic as needed
    this._articles.set(articlesData);
  }

  // Method to get a single article by id (not used in HomeComponent but useful)
  getArticleById(id: number): Article | undefined {
    return this._articles().find(a => a.id === id);
  }

  // Optional: Increment views for article, useful for tracking popularity
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

  // For adding new articles if needed
  addArticle(article: Article): void {
    this._articles.update(articles => [article, ...articles]);
  }

  createArticle(article: Article): void {
    // Add the new article to the beginning of the articles list
    this._articles.update(articles => [article, ...articles]);
  }

  searchArticles(title: string) {
    const lower = title.toLowerCase();
    return this._articles().filter(a => a.title.toLowerCase().includes(lower));
  }
}
