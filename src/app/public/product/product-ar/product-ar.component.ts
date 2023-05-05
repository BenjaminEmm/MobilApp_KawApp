import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-ar',
  templateUrl: './product-ar.component.html',
  styleUrls: ['./product-ar.component.css']
})
export class ProductARComponent implements OnInit {
  public productId: number = 0;
  public sceneURI: string = '/products/0/ar-scene';

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fetchProductIdFromRouteParams();
    this.setIFrameSource();
  }

  private fetchProductIdFromRouteParams(): void {
    this.route.params.subscribe(
      (params: any) => {
        this.productId = parseInt(params.id);
      });
  }

  private setIFrameSource(): void {
    this.sceneURI = `/products/${this.productId}/ar-scene`;
    document.querySelector('#productARComponent iframe')?.setAttribute('src', this.sceneURI);
  }
}
