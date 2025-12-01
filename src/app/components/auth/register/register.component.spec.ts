import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';

const mockAuthService = {
  user$: of(null),
  register: jasmine.createSpy('register').and.returnValue(Promise.resolve({})),
  isAuthenticated: () => false,
  logout: jasmine.createSpy('logout')
};

const activatedRouteMock = {
  snapshot: {},
  params: of({}),
  queryParams: of({}),
  paramMap: of({
    get: (_key: string) => null
  })
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});