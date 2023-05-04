import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { MockService } from 'src/app/shared/services/mock.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: ProductModel[] = [];

  constructor(
    private mockService: MockService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    environment?.useMocks ? this.getProductsFromMocks() : this.getProductsFromAPI();
  }

  private getProductsFromMocks(): void {
    this.products = this.mockService.getAllProducts();
  }

  private getProductsFromAPI(): void {
    // todo: call API /products
    // this.productService.getAll()
    //   .subscribe(res => {
    //     this.products = res;
    //   })
  }
}
