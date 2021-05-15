import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SigninService } from '../services/signin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private signInService: SigninService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('convert-token')) {
      return next.handle(request);
    }

    const token = this.signInService.getToken();
    const clone = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`)});
    return next.handle(clone);
  }
}
