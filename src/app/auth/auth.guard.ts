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
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.authService.getIsSignedIn()) {
      if (state.url === "/signin" || state.url === "/signup") {
        this.router.navigateByUrl("/dashboard");
      }
    } else {
      if (state.url === "/dashboard") {
        this.router.navigateByUrl("/signin");
        return false;
      }
    }
    return true;
  }
}
