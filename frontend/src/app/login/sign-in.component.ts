import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  constructor(private authService: SocialAuthService, private http: HttpClient) {
  }

  ngOnInit() {
    this.sub.add(
      this.authService.authState.subscribe(user => {
        this.http.post(
          '/api/auth/convert-token',
          {
            grant_type: 'convert_token',
            backend: 'google-oauth2',
            client_id: 'TeOcWRoC1Wnq4eftcpWU8rjVYvmOKfmjylXPNJs6',
            client_secret: '7cGWz0OkTmftW8D5r91sqcvwt6eoBKXR9xqCq6ReCo4GSZXOGKLH9zS1W3PuFaROW9j662UavyAFv7FdppmCtmM6n2TqjB7Scf50Ne5vvErHBpXwwyuymfRgKwPSjNV3',
            token: user.authToken
          }
        ).subscribe((resp: any) => {
          console.log(resp.access_token, resp.refresh_token);
        });
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
