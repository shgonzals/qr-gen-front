import { trigger, state, style, animate, transition } from '@angular/animations';

/*
export const slideInAnimation = trigger('slideInAnimation', [
  state('void', style({ transform: 'translateX(100%)' })),
  state('*', style({ transform: 'translateX(0)' })),
  transition('void => *', animate('500ms ease-in')),
  transition('* => void', animate('500ms ease-out'))
]);
*/

export const fadeAnimation = trigger('fadeAnimation', [
  state('void', style({ opacity: 0 })), // Estado inicial del elemento
  transition(':enter, :leave', [ // Transiciones al entrar o salir
    animate('0.5s', style({ opacity: 1 })), // Animación de desvanecimiento
  ]),
]);
