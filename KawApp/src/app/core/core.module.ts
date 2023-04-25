import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        CoreRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
    exports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        FooterComponent,
        HeaderComponent,
    ],
    providers: []
})
export class CoreModule { }