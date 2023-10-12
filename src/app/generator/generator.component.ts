import { Component } from '@angular/core';
import { fadeAnimation } from  '../../animations/fade.animation';
import { HttpClient } from '@angular/common/http';
import { QrGenModel } from '../models/qrgen-model';
import { GenerateQRService } from '../services/generate-qr-service';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  animations: [fadeAnimation]
})
export class GeneratorComponent {

  url: string = "www.google.es";
  type: number = 1;
  color: string = '#ff4081';
  image: string = "";

  data: QrGenModel = new QrGenModel();

  constructor(private http: HttpClient, private generateService: GenerateQRService) {}

  generarQR() {
    this.data.rgb = this.hexToRgb(this.color);
    this.data.content = this.url;
    this.data.type = this.type;
debugger;
    this.generateService.generarQR(this.data).subscribe(response => {
      debugger;

      const arrayBufferView = new Uint8Array(response);
      const blob = new Blob([arrayBufferView], { type: 'image/png' });
      const urlCreator = window.URL || window.webkitURL;
      this.image = urlCreator.createObjectURL(blob);

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
