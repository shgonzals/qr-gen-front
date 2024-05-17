import { Component } from '@angular/core';
import { fadeAnimation } from  '../../animations/fade.animation';
import { HttpClient } from '@angular/common/http';
import { QrGenModel } from '../models/qrgen-model';
import { GenerateQRService } from '../services/generate-qr-service';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { faDownload } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de importar faDownload desde FontAwesome
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { LoggerService } from '@app/services/logger.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [MatFormFieldModule, MatRadioModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, ColorPickerModule, FormsModule, MatDialogModule, MatButtonModule, FontAwesomeModule],
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
  showBtnDownload: boolean = false;
  faDownload = faDownload;


  data: QrGenModel = new QrGenModel();

  constructor(private http: HttpClient, private generateService: GenerateQRService,
    public dialog: MatDialog, private loggerService: LoggerService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent);
  }

  downloadImg() {
    const link = document.createElement('a');
    link.href = this.image;
    link.download = 'QR.png';
    link.click();

    this.loggerService.emit('Download QR');

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
        this.showBtnDownload = true;
      }, 1000);

    }, error => {
      console.log(error);
      this.isLoading = false;
      this.showBtnDownload = false;
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
