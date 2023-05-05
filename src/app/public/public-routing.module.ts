import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PublicAuthGuard } from '../core/auth/public-auth.guard';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductARComponent } from './product/product-ar/product-ar.component';
import { ProductARSceneComponent } from './product/product-ar-scene/product-ar-scene.component';
import { CartComponent } from './cart/cart.component';

const publicRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'authentication', component: AuthComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'products', component: ProductListComponent, canActivate: [PublicAuthGuard] },
    { path: 'products/:id', component: ProductDetailComponent, canActivate: [PublicAuthGuard] },
    { path: 'products/:id/ar', component: ProductARComponent, canActivate: [PublicAuthGuard] },
    { path: 'products/:id/ar-scene', component: ProductARSceneComponent, canActivate: [PublicAuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [PublicAuthGuard] },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }