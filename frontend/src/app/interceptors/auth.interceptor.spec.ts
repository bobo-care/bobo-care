import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { SocialLoginModule } from 'angularx-social-login';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { SocialAuthServiceConfig } from 'angularx-social-login/socialauth.service';
import { BabiesService } from '../services/babies.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SigninService } from '../services/signin.service';

describe('AuthInterceptor', () => {
  let service: BabiesService;
  let httpMock: HttpTestingController;
  const babiesServiceSpy = jasmine.createSpyObj<BabiesService>(['getBabies']);
  babiesServiceSpy.getBabies.and.callFake(() => of({}));
  const fakeAccessToken = 'some_fake_access_token';
  const signInServiceSpy = jasmine.createSpyObj<SigninService>(['getToken']);
  signInServiceSpy.getToken.and.returnValue(fakeAccessToken);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialLoginModule, HttpClientTestingModule, AppRoutingModule, /*AppModule*/],
      providers: [
        {
          provide: BabiesService,
          useValue: babiesServiceSpy
        },
        {
          provide: SigninService,
          useValue: signInServiceSpy
        },
        BabiesService,
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: []
          } as SocialAuthServiceConfig,
        }
      ]
    });

    service = TestBed.inject(BabiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header', () => {
    service.getBabies().subscribe();

    const httpRequest: TestRequest = httpMock.expectOne({
      url: 'api/babies/',
      method: 'GET'
    });

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${fakeAccessToken}`);
  });
});
