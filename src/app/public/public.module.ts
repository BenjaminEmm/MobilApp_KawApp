import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductARComponent } from './product/product-ar/product-ar.component';
import { ProductARSceneComponent } from './product/product-ar-scene/product-ar-scene.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartComponent } from './cart/cart.component';

@NgModule({
    declarations: [
        HomeComponent,
        AuthComponent,
        RegistrationComponent,
        ProductListComponent,
        ProductDetailComponent,
        ProductARComponent,
        ProductARSceneComponent,
        CartComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        SharedModule,
    ],
    exports: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PublicModule { }
