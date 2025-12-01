import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (_key: string) => '1'
      },
      params: { id: '1' },
      queryParams: {}
    },
    params: of({ id: '1' }),
    queryParams: of({}),
    paramMap: of({
      get: (_key: string) => '1'
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDetailComponent, CommonModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;

     // @ts-ignore
    if ('article' in component) {
      // @ts-ignore
      component.article = { id: 1, title: 'Test', summary: 'Summary', content: 'Content' };
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
