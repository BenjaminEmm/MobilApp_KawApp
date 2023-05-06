import { Injectable } from '@angular/core';
import { productsMock } from '../mocks/products.mock';
import { customersMock } from '../mocks/customers.mock';
import { ProductModel } from '../models/product.model';
import { CustomerModel } from '../models/customer.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  public getAllProducts() {
    return productsMock.map((mock: any) => new ProductModel(mock));;
  }

  public getProductById(id: number): ProductModel | null {
    const args = productsMock.find(product => parseInt(product.id) == id);
    return args ? new ProductModel(args) : null;
  }

  public getCustomerById(id: number): CustomerModel | null {
    const args = customersMock.find(customer => parseInt(customer.id) == id);
    return args ? new CustomerModel(args) : null;
  }

  // public getAllOrdersByCurstomerId(customerId: number): OrderModel[] {
  //   const args = customersMock.find(customer => parseInt(customer.id) == customerId);
  //   if (!args) return [];
  //   else {
  //     const customer = new CustomerModel(args);
  //     const orders = [];
  //     customer.orders.forEach(order => {
  //       order.products = this.getProductByCustomerAndOrderId(customer.id, order.id);
  //     })
  //     return customer.orders;
  //   }

  // }

  // public getProductByCustomerAndOrderId(): ProductModel {

  // }
}
