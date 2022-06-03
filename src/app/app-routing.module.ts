import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./pages/auth/sign-up/sign-up.component";
import { SeeRidesComponent } from "./pages/see-rides/see-rides.component"
import {HomeComponent} from "./pages/home/home.component";
import {CreateComponent} from "./pages/create-ride/create-ride.component";
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { DataUserGuard } from './shared/guards/data-user.guard';
import { SeeARideComponent } from './pages/see-a-ride/see-a-ride.component';
import {AdminComponent} from "./pages/admin/admin.component";
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { ConfirmComponent } from './pages/auth/confirm/confirm.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: "", canActivate: [DataUserGuard], component:HomeComponent},
  {path: "inscription", canActivate: [DataUserGuard], component:SignUpComponent},
  {path: "connexion", component:SignInComponent},
  {path: "trajets", canActivate: [DataUserGuard], component:SeeRidesComponent},
  {path: "trajet/:id", canActivate: [DataUserGuard], component:SeeARideComponent},
  {path: "nouveau", canActivate: [DataUserGuard, AuthGuard], component:CreateComponent},
  {path: "rechercher", canActivate: [DataUserGuard], component:SeeRidesComponent},
  {path: "mon-compte", canActivate: [DataUserGuard, AuthGuard], component:UserAccountComponent},
  {path: "confirm", canActivate: [DataUserGuard], component:ConfirmComponent},
  {path: "admin", canActivate: [DataUserGuard, AuthGuard], component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
