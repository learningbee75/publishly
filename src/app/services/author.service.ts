import { Injectable, signal } from '@angular/core';
import { Author } from '../models/author.model';
import authorsData from '../data/authors.json';
import { DUMMY_AUTHORS } from '../data/authors-data';

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

  private _dummyAuthors = signal(DUMMY_AUTHORS);
  dummyAuthors = this._dummyAuthors.asReadonly();

  getRisingAuthors() {
    return this._dummyAuthors().slice(0, 3); // Top 3 by followers or logic
  }

  searchAuthors(name: string) {
    const lower = name.toLowerCase();
    return this._dummyAuthors().filter(a => a.name.toLowerCase().includes(lower));
  }
}
