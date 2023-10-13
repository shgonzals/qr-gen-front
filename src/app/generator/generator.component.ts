import { Component } from '@angular/core';
import { fadeAnimation } from  '../../animations/fade.animation';
import { HttpClient } from '@angular/common/http';
import { QrGenModel } from '../models/qrgen-model';
import { GenerateQRService } from '../services/generate-qr-service';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  animations: [fadeAnimation]
})
export class GeneratorComponent {

  url: string = "qrgen.shgonzals.es";
  type: number = 1;
  color: string = '#000000';
  image: string = "./assets/images/qrcode-solid.svg";
  isLoading: boolean = false;

  data: QrGenModel = new QrGenModel();

  constructor(private http: HttpClient, private generateService: GenerateQRService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent);
  }

  generarQR() {
    this.image = "";
    this.isLoading = true;
    this.data.rgb = this.hexToRgb(this.color);
    this.data.content = this.url;
    this.data.type = this.type;
    this.generateService.generarQR(this.data).subscribe(response => {
      const arrayBufferView = new Uint8Array(response);
      const blob = new Blob([arrayBufferView], { type: 'image/png' });
      const urlCreator = window.URL || window.webkitURL;

      setTimeout(() => {
        this.image = urlCreator.createObjectURL(blob);
        this.isLoading = false;
      }, 1000);

    }, error => {
      console.log(error);
      this.isLoading = false;
      this.openDialog();
    });
  }

  hexToRgb(hex: string): number[] {
    // Elimina el carácter '#' si está presente
    hex = hex.replace(/^#/, '');

    // Divide el valor hexadecimal en componentes rojo, verde y azul
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Devuelve el color en formato RGB
    return [r, g, b];
  }
}
