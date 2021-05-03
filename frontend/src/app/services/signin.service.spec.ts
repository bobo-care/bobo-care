import { TestBed } from '@angular/core/testing';

import { SigninService } from './signin.service';

describe('SigninService', () => {
  let service: SigninService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
