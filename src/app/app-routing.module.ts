import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import { SeeRidesComponent } from "./shared/components/see-rides/see-rides.component"

import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"inscription", component:SignUpComponent},
  {path:"trajets", component:SeeRidesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
