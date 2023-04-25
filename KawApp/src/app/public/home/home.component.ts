import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    // this.customerService.getById(7).subscribe(
    //   response => {
    //     console.log(response);
    //   }, error => { console.error(error); }
    // )

    // this.customerService.getAll().subscribe(
    //   response => {
    //     console.log(response);
    //   }, error => { console.error(error); }
    // )

    // this.orderService.getAllByCustomerId(7).subscribe(
    //   response => {
    //     console.log(response);
    //   }, error => { console.error(error); }
    // )

    this.orderService.getById(7, 7).subscribe(
      response => {
        console.log(response);
      }, error => { console.error(error); }
    )


  }
}
