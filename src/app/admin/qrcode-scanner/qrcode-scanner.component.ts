import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';

@Component({
  selector: 'app-qrcode-scanner',
  templateUrl: './qrcode-scanner.component.html',
  styleUrls: ['./qrcode-scanner.component.css']
})
export class QRCodeScannerComponent implements AfterViewInit {

  public config: ScannerQRCodeConfig = {
    isBeep: false,
  }

  public qrcode!: ScannerQRCodeResult;

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(
    private qrcodeService: NgxScannerQrcodeService
  ) { }

  ngAfterViewInit(): void {
    this.action.isReady.pipe(delay(3000)).subscribe(() => {
      this.action.start();
    });
  }

  public onEvent(event: ScannerQRCodeResult[]): void {
    const res: ScannerQRCodeResult = event[0];
    if (res.typeName === 'ZBAR_QRCODE')
      this.qrcode = res;
  }

}
