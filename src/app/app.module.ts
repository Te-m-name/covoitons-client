import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { SeeRidesComponent } from './pages/see-rides/see-rides.component';
import { CreateComponent } from './pages/create-ride/create-ride.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptors';
import { SeeARideComponent } from './pages/see-a-ride/see-a-ride.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CardLightComponent } from './shared/components/card-light/card-light.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { UserBookedRideComponent } from './shared/components/user-booked-ride/user-booked-ride.component';
import { UserProposedRideComponent } from './shared/components/user-proposed-ride/user-proposed-ride.component';
import { UserInfosComponent } from './shared/components/user-infos/user-infos.component';
import { ConfirmComponent } from './pages/auth/confirm/confirm.component';
import { ListUsersComponent } from './shared/components/list-users/list-users.component';
import {ListRidesComponent} from "./shared/components/list-rides/list-rides.component";
import { UserBookingsComponent } from './shared/components/user-bookings/user-bookings.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { QAndAComponent } from './pages/q-and-a/q-and-a.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserBookingRequestComponent } from './shared/components/user-booking-request/user-booking-request.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    SeeRidesComponent,
    CreateComponent,
    SignInComponent,
    SeeARideComponent,
    SeeRidesComponent,
    NavbarComponent,
    CardLightComponent,
    FooterComponent,
    AdminComponent,
    UserAccountComponent,
    UserBookedRideComponent,
    UserProposedRideComponent,
    UserInfosComponent,
    ConfirmComponent,
    ListUsersComponent,
    ListRidesComponent,
    QAndAComponent,
    ChatComponent
    UserBookingsComponent,
    QAndAComponent,
    UserBookingRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function JWT_Module_Options(JWT_Module_Options: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}
