import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  getIsSignedIn() {
    return localStorage.getItem("signedIn") === "true" ? true : false;
  }

  private setIsSignedIn(status: boolean) {
    localStorage.setItem("signedIn", status ? "true" : "false");
  }

  signIn(data: { mobileNumber: string; pin: string }) {
    return new Observable((subscriber) => {
      setTimeout(() => {
        if (data.pin === "123456") {
          subscriber.next({ signedIn: true });
          this.setIsSignedIn(true);
          subscriber.complete();
        } else {
          subscriber.error({ wrongPin: true });
        }
      }, 1000);
    });
  }

  signUp(data: { mobileNumber: string; pin: string }) {
    return new Observable((subscriber) => {
      setTimeout(() => {
        if (data.mobileNumber === "1234567890") {
          subscriber.error({ accountExists: true });
        } else if (data.pin === "123456") {
          subscriber.next({ signedIn: true });
          this.setIsSignedIn(true);
          subscriber.complete();
        } else {
          subscriber.error({ wrongPin: true });
        }
      }, 1000);
    });
  }

  signOut() {
    localStorage.removeItem("signedIn");
  }
}
