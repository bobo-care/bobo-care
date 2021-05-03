import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigninService } from '../services/signin.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const socialAuthServiceSpy = {
    authState: of({authToken: 'foobar', provider: 'GOOGLE'} as SocialUser)
  };
  const httpClientSpy = jasmine.createSpyObj(['post']);
  httpClientSpy.post.and.callFake(() => of({access_token: 'fake_access_token', resp_token: 'fake_resp_token'}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        {
          provide: SocialAuthService,
          useValue: socialAuthServiceSpy
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
