import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/auth/current-user.service';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public customer: any = {};
  private orders: any[] = [];

  public userDataForm: FormGroup = new FormGroup({
    adresseMail: new FormControl(null, [Validators.email]),
    username: new FormControl(null, []),
    firstName: new FormControl(null, []),
    lastName: new FormControl(null, []),
    companyName: new FormControl(null, []),
    postalCode: new FormControl(null, []),
    city: new FormControl(null, []),
  });

  constructor(
    private currentUserService: CurrentUserService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customer.adresseMail = this.currentUserService.currentUser.adresseMail;

    this.loadData();

    this.userDataForm = new FormGroup({
      adresseMail: new FormControl(this.customer.adresseMail, [Validators.email]),
      username: new FormControl(this.customer.username, []),
      firstName: new FormControl(this.customer?.firstName, []),
      lastName: new FormControl(this.customer.lastName, []),
      companyName: new FormControl(this.customer?.company?.companyName, []),
      postalCode: new FormControl(this.customer?.address?.postalCode, []),
      city: new FormControl(this.customer?.address?.city, []),
    });
  }

  public loadData() {
    this.customerService.getById(this.currentUserService.currentUser.id).subscribe(
      response => {
        this.customer = { ...this.customer, ...response };
        this.loadOrders();
      }
    )
  }

  public loadOrders() {
    for (let i in this.orders) {
      let order = this.orders[i];
      order.products = [];

      this.productService.getAllByOrderId(this.customer.id, order.id)
        .subscribe(
          res => {
            order.products = res;
          }
        )
    }
  }

  public logout() {
    this.currentUserService.reset();
    this.router.navigate(['/home']);
  }

  public getOrders() {
    return this.customer.orders ? this.customer.orders.filter((order: any) => order.products.length >= 1) : [];
  }

  public getTotalByOrderId(orderId: number): number {
    const order: any = this.orders.find(order => order.id === orderId);
    const products = order?.products;
    if (!products) return 0;
    return products.map((product: any) => parseInt(product.details.price))
      .reduce((a: number, b: number) => a + b, 0);
  }

  public onSubmit(): void {
    const name = `${this.userDataForm.value.firstName} ${this.userDataForm.value.lastName}`;
    const profile = { fistName: this.userDataForm.value.firstName, lastName: this.userDataForm.value.lastName };
    const address = { city: this.userDataForm.value.city, postalCode: this.userDataForm.value.postalCode };
    const company = { companyName: this.userDataForm.value.companyName };

    const args = { ...this.customer, ...this.userDataForm.value, name, profile, address, company };
    const data = new CustomerModel(args);

    const id = this.currentUserService.currentUser.id;

    this.customerService.updateById(id, data)
      .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      });
  }
}

