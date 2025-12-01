import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';

const mockAuthService = {
  user$: of(null),
  login: jasmine.createSpy('login').and.returnValue(Promise.resolve(true)),
  logout: jasmine.createSpy('logout'),
  isAuthenticated: () => false,
  signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({}))
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: {},
      params: of({}),
      queryParams: of({}),
      paramMap: of({
        get: (_key: string) => null
      })
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});