import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-restaurantlist',
  templateUrl: './restaurantlist.component.html',
  styleUrls: ['./restaurantlist.component.css']
})
export class RestaurantlistComponent implements OnInit {
  formValue!: FormGroup;
  isLoggedIn: boolean = false;
  isRole: string | null = null;


  dataSource: any[] = [];
  data: any;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private formbuilder: FormBuilder,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    this.getRestaurantList();
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');
    this.formValue = this.formbuilder.group({
      restaurantId: ['', [Validators.required, Validators.pattern('\\d{3}')]],
      restaurantName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
       rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      location: ['', [Validators.required, Validators.min(5), Validators.max(50)]]
    });
    this.getUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource = this.dataSource.filter((row) => {
      return (
        row.restaurantId.toLowerCase().includes(filterValue) ||
        row.restaurantName.toLowerCase().includes(filterValue) ||
        row.type.toLowerCase().includes(filterValue) ||
        row.location.toLowerCase().includes(filterValue)
      );
    });

    if (!filterValue || filterValue === '') {
      this.getRestaurantList();
    }
  }

  getRestaurantList() {
    this.restaurantService.viewAllRestaurants().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: console.error,
    });
  }

  deleteRestaurant(restaurantId: any) {
    console.log('Deleting train with restaurantId: ', restaurantId);

    this.restaurantService.deleteRestaurant(restaurantId).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    alert('Restaurant deleted successfully ' + restaurantId);
    this.getRestaurantList();
  }

  EditForm(data: any) {
    this.formValue.controls['restaurantId'].setValue(data.restaurantId);
    this.formValue.controls['restaurantName'].setValue(data.restaurantName);
    this.formValue.controls['rating'].setValue(data.rating);
    this.formValue.controls['type'].setValue(data.type);
    this.formValue.controls['location'].setValue(data.location);
    console.log(this.formValue.value.restaurantId);
    sessionStorage.setItem('restaurantId', this.formValue.value.restaurantId);
    
  }

  redirectToItems(restaurantName: any) {
    if (this.isLoggedIn) {
      // If logged in, check their role
      sessionStorage.setItem('restaurantName', restaurantName);
      //sessionStorage.setItem('Fare',fare);
      console.log(restaurantName)
      
        // Redirect regular user to booking page
        this.router.navigate(['/itemlist'],{ queryParams: { restaurantName } });

       
      
    } else {
      // If not logged in, redirect to login page
      this.router.navigate(['/login']);
    }
  }
  updateRestaurant() {
    console.log(this.formValue.value)
    this.restaurantService
      .updateRestaurant(this.formValue.value.restaurantId, this.formValue.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getRestaurantList();
          location.reload()
          //this.router.navigate(['/restaurantlist']);
          // this.getRestaurantList();
        },
      });
      // this.getRestaurantList();
  }
  onSubmit() {
    this.router.navigate(['/restaurantlist']);
    this.getRestaurantList();
  }
// to add cartId to sessionstorage
  getUser()
  {
    const user=sessionStorage.getItem("username");
    this.loginService.showuserdetails(user).subscribe({
      next:(res:any)=>
      {
        this.data=res;
        console.log(res);
        var fullPhoneNumber = res.phoneNumber.toString(); // Convert to string

        if (typeof fullPhoneNumber === 'string') {
          var lastFiveDigits = fullPhoneNumber.slice(-5);
          sessionStorage.setItem('cartId', lastFiveDigits);
        } else {
          console.error('res.phoneNumber is not a string.');
        }

      }
    }) 
  }
}
