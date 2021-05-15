import { TestBed } from '@angular/core/testing';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialLoginModule
} from 'angularx-social-login';
import { SigninService } from './signin.service';
import { SocialAuthServiceConfig } from 'angularx-social-login/socialauth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';

describe('SigninService', () => {
  let service: SigninService;

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
    service = TestBed.inject(SigninService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return backend type for provider', () => {
    expect(service.getBackendTypeForProvider('GOOGLE')).toEqual('google-oauth2');
    expect(service.getBackendTypeForProvider('FACEBOOK')).toEqual('facebook');
  });

  it('should throw an error when there is no backend type for provider', () => {
    expect(() => {
      service.getBackendTypeForProvider('foobar');
    }).toThrowError();
  });
});
