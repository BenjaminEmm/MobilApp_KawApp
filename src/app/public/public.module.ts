import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

// import { MatListModule } from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card'; 
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatTabsModule } from '@angular/material/tabs';  
// import { MatButtonModule } from '@angular/material/button'; 
// import { MatIconModule } from '@angular/material/icon';
// import { MatExpansionModule } from '@angular/material/expansion'; 
// import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

@NgModule({
    declarations: [
        HomeComponent,
        AuthComponent,
        RegistrationComponent,
        ProductListComponent,
        ProductDetailComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        SharedModule,
        // MatListModule,
        // MatCardModule,
        // MatGridListModule,
        // MatTabsModule,
        // MatButtonModule,
        // MatIconModule,
        // MatExpansionModule,
        // MatTableModule,
    ],
    exports: [],
})
export class PublicModule { }
