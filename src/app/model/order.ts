export interface OrderTable {
    orderId: number;
    orderDate: string;
    username: string;
    orderName:string;
    // modeOfPayment: string;
    orderDetails:string[];
    orderStatus: string;
    phoneNumber: string;
    cost: number;
    quantity: number;
    address: string;
    city: string;
    pincode: number;
    state: string;
    orderInstructions:string;

    cart: {
      cartid: number;
      totalPrice: number;
      items: any; // Change this to the appropriate type
    };
    itemId: number;
  }
  
 
  