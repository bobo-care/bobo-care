import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { SocialLoginModule } from 'angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { SocialAuthServiceConfig } from 'angularx-social-login/socialauth.service';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SocialLoginModule, HttpClientTestingModule, AppRoutingModule],
    providers: [
      AuthInterceptor,
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: []
        } as SocialAuthServiceConfig,
      }
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
