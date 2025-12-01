import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDirectoryComponent } from './author-directory.component';
import { ActivatedRoute } from '@angular/router';

describe('AuthorDirectoryComponent', () => {
  let component: AuthorDirectoryComponent;
  let fixture: ComponentFixture<AuthorDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorDirectoryComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
