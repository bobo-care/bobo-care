import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { SigninService } from '../../services/signin.service';
import { SignInResponse } from '../../interfaces/signin-response';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private signinService: SigninService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.authService.authState.pipe(
        switchMap((user: SocialUser) => this.signinService.convertToken(user))
      ).subscribe((response: SignInResponse) => {
        if (response) {
          this.signinService.storeToken(response.access_token);
          this.router.navigateByUrl('babies');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
