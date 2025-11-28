import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorCardComponent } from './author-card/author-card.component';

@Component({
  selector: 'app-author-directory',
  standalone: true,
  imports: [CommonModule, AuthorCardComponent, FormsModule],
  templateUrl: './author-directory.component.html',
  styleUrls: ['./author-directory.component.scss']
})
export class AuthorDirectoryComponent implements OnInit {
  private authorService = inject(AuthorService);

  search = signal('');
  authors = signal<any[]>([]);

  ngOnInit() {
    this.authors.set(this.authorService.getAllAuthors());
  }

  filtered = computed(() =>
    this.authors().filter(a =>
      a.name.toLowerCase().includes(this.search().toLowerCase()) ||
      (a.bio ?? '').toLowerCase().includes(this.search().toLowerCase()))
  );
}
