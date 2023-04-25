import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private _signedIn = false;

  

  signIn(data: { mobileNumber: string; pin: string }) {
    return new Observable((subscriber) => {
      setTimeout(() => {
        if (data.pin === '123456') {
          subscriber.next({ signedIn: true });
          subscriber.complete();
        } else {
          subscriber.error({ wrongPin: true });
        }
      }, 1000);
    });
  }
}
