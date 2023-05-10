import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { MockService } from 'src/app/shared/services/mock.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private _currentRoute: string = '/products/0';
  private subscriptionOfCurrentRoute: Subscription = new Subscription();

  public productId: number = 0;
  public product: ProductModel = new ProductModel();
  public quantity: number = 0;

  public previousId: number = 0;
  public nextId: number = 0;

  constructor(
    private cartService: CartService,
    private mockService: MockService,
    private navigationService: NavigationService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscribeToCurrentRoute();
    this.loadData();
  }

  private loadData(): void {
    this.fetchProductIdFromRouteParams();
    this.fetchProductData();
    this.fetchProductQuantityFromCart();
    this.fetchPreviousAndNextId();
  }

  private subscribeToCurrentRoute(): void {
    this._currentRoute = this.navigationService.getCurrentRoute();

    this.subscriptionOfCurrentRoute = this.navigationService.currentRoute.subscribe(
      observer => {
        this._currentRoute = observer;
        this.loadData();
      }
    )
  }

  private fetchProductIdFromRouteParams(): void {
    this.route.params.subscribe(
      (params: any) => {
        this.productId = parseInt(params.id);
      });
  }

  private fetchProductData(): void {
    if (environment?.useMocks) {
      const mock = this.mockService.getProductById(this.productId);

      mock ?
        this.product = mock :
        this.router.navigate(['/products']).then(() => console.error(`No product found with id ${this.productId}`));

    } else {
      this.productService.getById(this.productId).subscribe(
        (response: ProductModel) => this.product = response,
        err => this.router.navigate(['/products']).then(() => console.error(`No product found with id ${this.productId}`))
      )
    }
  }

  private fetchProductQuantityFromCart(): void {
    const item = this.cartService.findItemById(this.productId);
    this.quantity = item ? item.quantity : 0;
  }

  private fetchPreviousAndNextId(): void {
    this.fetchPreviousId();
    this.fetchNextId();
  }

  private fetchPreviousId(): void {
    const getPreviousId = (data: ProductModel[]): number => {
      let previousIndex = data.findIndex(product => product.id === this.productId) - 1;
      if (previousIndex < 0) previousIndex = data.length - 1;
      const previousProduct = data[previousIndex];
      return previousProduct.id;
    }

    if (environment.useMocks) {
      const mocks = this.mockService.getAllProducts();
      this.previousId = getPreviousId(mocks);
    } else {
      this.productService.getAll().subscribe(
        (data: ProductModel[]) => {
          this.previousId = getPreviousId(data);
        }
      )
    }
  }

  private fetchNextId(): void {
    const getNextId = (data: ProductModel[]): number => {
      let nextIndex = data.findIndex(product => product.id === this.productId) + 1;
      if (nextIndex > data.length - 1) nextIndex = 0;
      const nextProduct = data[nextIndex];
      return nextProduct.id;
    };

    if (environment.useMocks) {
      const mocks = this.mockService.getAllProducts();
      this.nextId = getNextId(mocks);
    } else {
      this.productService.getAll().subscribe(
        (data: ProductModel[]) => {
          this.nextId = getNextId(data);
        }
      )
    }
  }

  public getProductQuantityFromCart(): number {
    const item = this.cartService.findItemById(this.productId);
    return item?.quantity ?? 0;
  }

  public addOne(): void {
    this.quantity++;
    this.quantity > this.product.stock ? this.product.stock : this.quantity;
  }

  public removeOne(): void {
    this.quantity--;
  }

  public updateCart(): void {
    this.cartService.updateCart(this.product, this.quantity);
  }
}
