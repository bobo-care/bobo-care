import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { SocialAuthServiceConfig } from 'angularx-social-login/socialauth.service';
import { SocialLoginModule } from 'angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialLoginModule, HttpClientTestingModule, AppRoutingModule],
      providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: []
          } as SocialAuthServiceConfig,
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
