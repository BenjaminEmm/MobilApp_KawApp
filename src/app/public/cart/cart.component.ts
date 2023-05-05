import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart: any = null;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.fetchProductsFromCart();
  }

  private fetchProductsFromCart(): any {
    this.cart = this.cartService.cart;
  }

  public isEmpty(): boolean {
    return this.cartService.isEmpty();
  }

  public getTotal(): number {
    return this.cartService.getTotal();
  }

  public validateTheOrder(): void {
    console.log('todo: validate the order...');
  }
}
