import { Component } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { fadeAnimation } from  '../../animations/fade.animation';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  animations: [fadeAnimation]
})
export class GeneratorComponent {

  url: string = "www.google.es";
  seleccion: string = "1";
  color: string = '#ff4081';
  image: string = "";

  generarQR() {
    // Lógica para ejecutar la acción cuando se hace clic en el botón
  }
}
