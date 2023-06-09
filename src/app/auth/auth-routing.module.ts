import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AuthGuard } from "./auth.guard";
import { SignOutComponent } from "./sign-out/sign-out.component";

const routes: Routes = [
  {
    path: "signin",
    component: SignInComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "signout",
    component: SignOutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
