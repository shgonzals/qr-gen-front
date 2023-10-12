import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qr-gen-front';



  ejecutarAccion() {
    // Agrega aquí la lógica para ejecutar la acción con la URL, el color y la imagen seleccionados.
  }

  hexToRgb(hex: string): string {
    // Elimina el carácter '#' si está presente
    hex = hex.replace(/^#/, '');

    // Divide el valor hexadecimal en componentes rojo, verde y azul
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Devuelve el color en formato RGB
    return `rgb(${r}, ${g}, ${b})`;
  }
}
