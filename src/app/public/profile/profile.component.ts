import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/auth/current-user.service';
import { CurrentUser } from 'src/app/shared/classes/CurrentUser';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { ProductModel } from 'src/app/shared/models/product.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
// import { MockService } from 'src/app/shared/services/mock.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: CurrentUser = new CurrentUser();
  private orders: any[] = [];

  constructor(
    private currentUserService: CurrentUserService,
    // private mockService: MockService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
    this.loadOrders();
  }

  public logout() {
    this.currentUserService.reset();
    this.router.navigate(['/home']);
  }

  private loadOrders() {
    environment.useMocks ? this.getOrdersFromMocks() : this.getOrdersFromAPI();
  }

  private getOrdersFromMocks() {
    console.error('no mock found');
  }

  private getOrdersFromAPI() {
    this.customerService.getById(this.currentUser.id).subscribe(
      (response: CustomerModel) => {
        this.orders = response.orders;
        this.loadProducts();
      }
    )
  }

  private loadProducts() {
    for (let i in this.orders) {
      let order = this.orders[i];
      order.products = [];

      this.productService.getAllByOrderId(this.currentUser.id, order.id)
        .subscribe(
          res => {
            order.products = res.map((product: any) => new ProductModel(product));
          }
        )
    }
  }

  public getOrders() {
    return this.orders.filter(order => order.products.length >= 1);
  }

  public getTotalByOrderId(orderId: number): number {
    const order: any = this.orders.find(order => order.id === orderId);
    const products = order?.products;
    if (!products) return 0;
    return products.map((product: any) => parseInt(product.details.price))
      .reduce((a: number, b: number) => a + b, 0);
  }
}

