import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRCodeScannerComponent } from './qrcode-scanner/qrcode-scanner.component';
import { AdminAuthGuard } from '../core/auth/admin-auth.guard';

const adminRoutes: Routes = [
    { path: 'qrcode-scanner', component: QRCodeScannerComponent, canActivate: [AdminAuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
