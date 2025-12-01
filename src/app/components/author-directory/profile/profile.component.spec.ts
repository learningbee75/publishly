import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../services/auth.service';
const mockAuthService = {
  user$: of(null),
  isLoggedIn: () => false,
  isAuthenticated: () => false,
  logout: jasmine.createSpy('logout'),
  getUser: () => null,
  currentUser: () => ({ uid: '1', email: 'test@example.com' })
};
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

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});