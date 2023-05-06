import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/auth/current-user.service';
import { CurrentUser } from 'src/app/shared/classes/CurrentUser';
import { OrderModel } from 'src/app/shared/models/order.model';
import { MockService } from 'src/app/shared/services/mock.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: CurrentUser = new CurrentUser();
  orders: OrderModel[] = [];

  constructor(
    private currentUserService: CurrentUserService,
    private mockService: MockService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
    this.loadCurrentUserOrders();
  }

  public logout() {
    this.currentUserService.reset();
    this.router.navigate(['/home']);
  }

  private loadCurrentUserOrders() {
    environment.useMocks ? this.getOrdersFromMocks() : this.getOrdersFromAPI();
  }

  private getOrdersFromMocks() {

  }

  private getOrdersFromAPI() {
    console.log('todo: load orders of current user only!');
    this.orderService.getAll().subscribe(
      (response: OrderModel[]) => {
        this.orders = response;
      }
    )
  }
}
