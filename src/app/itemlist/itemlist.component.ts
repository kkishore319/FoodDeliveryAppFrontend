import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Item } from '../model/itemModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../model/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
  
})

export class ItemlistComponent  implements OnInit{

  item!: Item;
  itemForm:FormGroup
  itemId!: string;
  isRole: string | null = null;
  isAdmin:boolean=false;
  public itemList: any;
  // public filtereditemList: any;
  search: string = "";
  cart!: Cart;
  cartId!: number;




  selectedItem: Item | null = null;
  //location: any;
 

  constructor(private formBuilder: FormBuilder,private itemService: RestaurantService ,private cartService: CartService, private router:Router,private route: ActivatedRoute ){
    this.itemForm =this.formBuilder.group({
      itemId: new FormControl('', Validators.required),
      itemName: new FormControl('', Validators.required),
      category:new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
     
   }


  getItem(id:string){
    this.itemService.viewItemById(id).subscribe(
      res => {
        this.item = res
        this.initializeForm()
      }
    )
  }


  showItemDetails(item: Item): void {
    this.selectedItem = item;
  }


  initializeForm() {
    this.itemForm = new FormGroup({
      itemId: new FormControl(this.item.itemId, [Validators.required]),
      itemName: new FormControl(this.item.itemName,[Validators.required]),
      category: new FormControl(this.item.category,[Validators.required]),
      description: new FormControl(this.item.description, [Validators.required]),
      price: new FormControl(this.item.price, [Validators.required,  Validators.pattern('^[0-9]{6}$')]),
      image: new FormControl(this.item.image,[Validators.required])
    });
    this.itemId = this.item?.itemId;
  }






  ngOnInit(): void {
    this.itemService.viewAllItems().subscribe((res: any) => {
      this.itemList = res;
      this.isRole = sessionStorage.getItem('role');
      if(this.isRole=="Admin"){
        this.isAdmin==false;
      }
      this.itemList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
    this.route.queryParams.subscribe((params) => {
      const restaurantName = params['restaurantName'];
      if (restaurantName) {
        // Use the restaurantId to search for items
        // Call your function to fetch items based on restaurantId
        this.getItemsByRestaurant(restaurantName);
      } else {
        this.router.navigate(['/itemlist']);
        // Handle the case where restaurantId is not provided
      }
  
      // Rest of your initialization code
    });
  }
  getItemsByRestaurant(restaurantName: string) {
    this.itemService.getItemByrestaurantName(restaurantName).subscribe(
      res => {
        this.itemList = res;
      },err => {
        console.log(err);
        
      }
    )
  }


  searchByItemName(): void {
    const searchTerm = this.search.toLowerCase();
    if (!searchTerm) {
      // Reset the item list if the search term is empty
      this.itemService.viewAllItems().subscribe((res: any) => {
        this.itemList = res;
      });
    } else {
      // Filter the item list based on the search term
      this.itemList = this.itemList.filter((item: { itemName: string; }) =>
        item.itemName.toLowerCase().includes(searchTerm)
      );
    }
  }


  updateForm(data:any){
    this.itemService.updateItem(this.itemId,data).subscribe(
      res => {
        //alert("item updated")
        location.reload()
      },err => {
        console.log(err);
        
      }
    )
  }

  deleteItem(id:string){
    this.itemService.deleteItem(id).subscribe(
      
      res => {
        alert("item deleted")
        this.router.navigate(['/itemlist']);
      },
      
      err => {
        console.log(err);
      }
    )
    alert("item deleted")
    window.location.reload();
    this.router.navigate(['/itemlist'],{ fragment: 'sectionToNavigate' });
  }

  addItem(itemId: number): void {

    // this.cartService.createCart().subscribe(res => {

    // }
    // ,
    //   err => console.log(err)
    // );
    this.cartService.addingItemToCart(itemId).subscribe(
      res => {
        
        
        this.cart = res;
        this.router.navigate(['/cart']);
      },
      err => {console.log(err)
      // alert("Your are not logged in. If want to order food, please login ");
      // this.router.navigate(['/login']);
      }
    )
  }

  // getCartIdFromServiceOrLocalStorage(): number {
  //   const cartId = localStorage.getItem('cartId');
  //   return cartId ? +cartId : 0; // Convert to a number, default to 0 if not found.
  // }
  stringToNumber(value: string): number {
    return parseInt(value);
  }

}