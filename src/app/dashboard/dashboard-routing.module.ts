import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    component: HomeComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
