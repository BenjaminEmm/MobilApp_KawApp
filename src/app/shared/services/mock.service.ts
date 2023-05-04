import { Injectable } from '@angular/core';
import { productsMock } from '../mocks/products.mock';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  public getProductMock() {
    return productsMock.map((mock: any) => new ProductModel(mock));;
  }
}
