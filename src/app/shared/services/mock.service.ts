import { Injectable } from '@angular/core';
import { productsMock } from '../mocks/products.mock';
import { ProductModel } from '../models/product.model';

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
}
