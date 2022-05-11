import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./pages/auth/sign-up/sign-up.component";
import { SeeRidesComponent } from "./shared/components/see-rides/see-rides.component"

import {HomeComponent} from "./pages/home/home.component";
import {CreateComponent} from "./pages/create-ride/create-ride.component";
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { DataUserGuard } from './shared/guards/data-user.guard';

const routes: Routes = [
  {path: "", canActivate: [DataUserGuard], component:HomeComponent},
  {path: "inscription", canActivate: [DataUserGuard], component:SignUpComponent},
  {path: "trajets", canActivate: [DataUserGuard], component:SeeRidesComponent},
  {path: "nouveau", canActivate: [DataUserGuard], component:CreateComponent},
  {path: "connexion", component:SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
