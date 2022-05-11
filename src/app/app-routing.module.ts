import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import { SeeRidesComponent } from "./shared/components/see-rides/see-rides.component"

import {HomeComponent} from "./home/home.component";
import {CreateComponent} from "./rides/create/create.component";
import { SearchRideComponent } from './pages/search-ride/search-ride.component';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "inscription", component:SignUpComponent},
  {path: "trajets", component:SeeRidesComponent},
  {path: "nouveau", component:CreateComponent},
  {path: "rechercher", component:SearchRideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
