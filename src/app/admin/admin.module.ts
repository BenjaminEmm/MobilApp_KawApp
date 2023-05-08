import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { QRCodeScannerComponent } from './qrcode-scanner/qrcode-scanner.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [
    QRCodeScannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    NgxScannerQrcodeModule,
  ],
  exports: [],
})
export class AdminModule { }
