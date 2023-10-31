import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestaurantlistComponent } from './restaurantlist/restaurantlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { OrderComponent } from './order/order.component';
import { ItemComponent } from './item/item.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
import { PaymentComponent } from './payment/payment.component';
import { UserOrderComponent } from './user-order/user-order.component';

const routes: Routes = [
  {path:'register', component: RegistrationComponent},
  {path:'login' , component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'addRestaurant', component: RestaurantComponent},
  {path:'order', component: OrderComponent},
  {path:'addItem', component: ItemComponent},
  {path:'navbar', component: NavbarComponent}, 
  {path:'cart',component:CartComponent},
  {path:'restaurantlist', component: RestaurantlistComponent},
  {path:'userlist', component:UserlistComponent},
  {path:'orderlist', component:OrderlistComponent},
  {path:'search', component:SearchComponent},
  {path: 'itemlist', component:ItemlistComponent},
  // {path: 'home', component:HomePageComponent},
  {path:'userorderlist',component:UserOrderComponent},
  {path:'paymentlist',component:PaymentlistComponent},
  {path:'payment',component:PaymentComponent},
  {path:'profile',component: ProfileComponent},
 // {path:'pay',component:PaymentappComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
