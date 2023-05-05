import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: any[] = [];

  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) this.cart = JSON.parse(cart);
  }

  public findItemById(id: number): any | null {
    return this.cart.find(item => item.product.id === id);
  }

  public updateCart(product: ProductModel, quantity: number): void {
    if (quantity <= 0) return this.removeItem(product);

    const item = this.findItemById(product.id);
    item ? this.updateItem(product, quantity) : this.addItem(product, quantity);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private updateItem(product: ProductModel, quantity: number): void {
    const item = this.findItemById(product.id);
    item.quantity = quantity > product.stock ? product.stock : quantity;
    if (item.quantity <= 0) this.removeItem(product);
  }

  private addItem(product: ProductModel, quantity: number): void {
    this.cart.push({ product, quantity });
  }

  private removeItem(product: ProductModel): void {
    const index = this.cart.findIndex(item => item.product.id === product.id);
    this.cart.splice(index, 1);
  }

  public isEmpty(): boolean {
    return this.cart.length <= 0;
  }

  public getTotal(): number {
    return this.cart
      .map((item: any) => parseFloat(item.product.details.price) * item.quantity)
      .reduce((a: number, b: number) => a + b, 0);
  }
}
