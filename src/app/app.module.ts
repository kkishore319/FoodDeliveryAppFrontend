import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{ HttpClientModule} from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantlistComponent } from './restaurantlist/restaurantlist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
import { PaymentComponent } from './payment/payment.component';
import { UserOrderComponent } from './user-order/user-order.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    RestaurantComponent,
    ItemComponent,
    CartComponent,
    OrderComponent,
    NavbarComponent,
    RestaurantlistComponent,
    ItemlistComponent,
    OrderlistComponent,
    PaymentlistComponent,
    SearchComponent,
    ProfileComponent,
    UserlistComponent,
    PaymentComponent,
    UserOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
