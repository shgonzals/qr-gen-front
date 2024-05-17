import { Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'qrgen', component: GeneratorComponent, data: { animation: 'fade' }},
  { path: '', component: HomeComponent, data: { animation: 'fade' }}
];
