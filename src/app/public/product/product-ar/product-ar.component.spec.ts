import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductARComponent } from './product-ar.component';

describe('ProductARComponent', () => {
  let component: ProductARComponent;
  let fixture: ComponentFixture<ProductARComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductARComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
