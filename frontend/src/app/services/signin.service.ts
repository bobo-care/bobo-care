import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private providerMapping: Map<string, string> = new Map();

  constructor() {
    this.providerMapping.set('GOOGLE', 'google-oauth2');
    this.providerMapping.set('FACEBOOK', 'facebook');
  }

  public getBackendTypeForProvider(provider: string): string {
    if (this.providerMapping.has(provider)) {
      return this.providerMapping.get(provider) as string;
    }

    throw new Error('No type for specified provider');
  }
}
