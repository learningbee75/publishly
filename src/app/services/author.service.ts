import { Injectable, signal } from '@angular/core';
import { Author } from '../models/author.model';
import authorsData from '../data/authors.json';
import RISING_AUTHORS from '../data/rising-authors.json';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private _authors = signal<Author[]>(authorsData);
  authors = this._authors.asReadonly();

  getAllAuthors(): Author[] {
    return this._authors();
  }

  getAuthorById(id: number): Author | undefined {
    return this._authors().find(author => author.id === id);
  }

  private _risignAuthors = signal(RISING_AUTHORS);
  dummyAuthors = this._risignAuthors.asReadonly();

  getRisingAuthors() {
    return this._risignAuthors().sort((a,b) => b.followers - a.followers).slice(0, 3);
  }

  searchAuthors(name: string) {
    const lower = name.toLowerCase();
    return this._risignAuthors().filter(a => a.name.toLowerCase().includes(lower));
  }
}
