import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(state.url);

    if (this.authService.getIsSignedIn()) {
      if (state.url === "/signin" || state.url === "/signup") {
        this.router.navigateByUrl("/dashboard");
      }
      console.log("canActivate", true);
    } else {
      if (state.url === "/dashboard") {
        this.router.navigateByUrl("/signin");
        return false;
      }
    }
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(currentState.url);
    console.log("CanDeactivate", this.authService.getIsSignedIn());
    if (this.authService.getIsSignedIn()) {
      console.log("CanDeactivate", true);

      return false;
    } else {
      console.log("CanDeactivate", true);

      return true;
    }
  }
}
