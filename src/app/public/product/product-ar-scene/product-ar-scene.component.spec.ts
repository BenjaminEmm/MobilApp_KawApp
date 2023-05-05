import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductARSceneComponent } from './product-ar-scene.component';

describe('ProductARSceneComponent', () => {
  let component: ProductARSceneComponent;
  let fixture: ComponentFixture<ProductARSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductARSceneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductARSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
