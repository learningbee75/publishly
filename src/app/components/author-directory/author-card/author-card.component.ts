import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent {
  @Input() author!: any;
}
