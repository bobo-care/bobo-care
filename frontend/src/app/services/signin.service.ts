import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignInResponse } from '../interfaces/signin-response';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private providerMapping: Map<string, string> = new Map();

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.providerMapping.set('GOOGLE', 'google-oauth2');
    this.providerMapping.set('FACEBOOK', 'facebook');
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();

    return !!token;
  }

  public getBackendTypeForProvider(provider: string): string {
    if (this.providerMapping.has(provider)) {
      return this.providerMapping.get(provider) as string;
    }

    throw new Error('No type for specified provider');
  }

  public convertToken(user: SocialUser): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(
      /*eslint-disable */
      '/api/auth/convert-token',
      {
        grant_type: 'convert_token',
        backend: this.getBackendTypeForProvider(user.provider),
        client_id: 'TeOcWRoC1Wnq4eftcpWU8rjVYvmOKfmjylXPNJs6',
        client_secret: '7cGWz0OkTmftW8D5r91sqcvwt6eoBKXR9xqCq6ReCo4GSZXOGKLH9zS1W3PuFaROW9j662UavyAFv7FdppmCtmM6n2TqjB7Scf50Ne5vvErHBpXwwyuymfRgKwPSjNV3',
        token: user.authToken
        /*eslint-enable */
      }
    );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.socialAuthService.signOut().then(() => {
      this.router.navigateByUrl('sign-in');
    });
  }

  public storeToken(accessToken: string): void {
    localStorage.setItem('access_token', accessToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
