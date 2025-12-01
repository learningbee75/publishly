import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthorCardComponent } from './author-card.component';

describe('AuthorCardComponent', () => {
  let component: AuthorCardComponent;
  let fixture: ComponentFixture<AuthorCardComponent>;

   const routerMock: Partial<Router> = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true)),
    createUrlTree: (..._args: any[]) => ({} as any),
    serializeUrl: (_u: any) => '/',
    events: of(),
    url: '/'
  };

  const activatedRouteMock = {
    snapshot: { paramMap: { get: (_k: string) => '1' } },
    params: of({ id: '1' }),
    queryParams: of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [AuthorCardComponent, CommonModule, RouterModule.forRoot([])],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorCardComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.author = { id: '1', name: 'Test Author', bio: '' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});