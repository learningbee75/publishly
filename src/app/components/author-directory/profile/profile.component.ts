import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ArticleService } from '../../../services/article.service';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private authorService = inject(AuthorService);
  private articleService = inject(ArticleService);

  profileUser = signal<any>(null);
  authoredArticles = signal<any[]>([]);

  ngOnInit() {
    const routeId = +this.route.snapshot.paramMap.get('id')!;
    let user;
    if (!routeId || isNaN(routeId)) {
      user = this.auth.currentUser();
    } else {
      user = this.authorService.getAuthorById(routeId);
    }
    this.profileUser.set(user);

    if (user) {
      const articles = this.articleService.articles();
      this.authoredArticles.set(articles.filter(a => a.authorId === user.id));
    }
  }

  isOwnProfile() {
    return this.profileUser()?.id === this.auth.currentUser()?.id;
  }
}
