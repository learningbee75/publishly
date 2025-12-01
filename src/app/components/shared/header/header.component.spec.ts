import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../../services/auth.service';

const mockAuthService = {
  user$: of(null),
  isLoggedIn: () => false,
  logout: jasmine.createSpy('logout'),
};

const activatedRouteMock = {
  snapshot: {},
  params: of({}),
  queryParams: of({}),
  paramMap: of({
    get: (_key: string) => null
  })
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});