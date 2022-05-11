import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./pages/auth/sign-up/sign-up.component";
import { SeeRidesComponent } from "./pages/see-rides/see-rides.component"
import {HomeComponent} from "./pages/home/home.component";
import {CreateComponent} from "./pages/create-ride/create-ride.component";
import {SeeARideComponent} from "./pages/see-a-ride/see-a-ride.component";

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "inscription", component:SignUpComponent},
  {path: "nouveau", component:CreateComponent},
  {path: "rechercher", component:SeeRidesComponent},
  {path: "trajets", component:SeeRidesComponent},
  {path:"trajet/:id", component:SeeARideComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
