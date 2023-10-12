import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';


const routes: Routes = [
  { path: 'qrgen', component: GeneratorComponent, data: { animation: 'fade' }},
  { path: '', component: HomeComponent, data: { animation: 'fade' }}
  //{ path: '', redirectTo: 'welcome', pathMatch : 'full', data: { animation: 'fade' }},
  //{ path: '**', redirectTo: 'welcome', pathMatch : 'full', data: { animation: 'fade' }}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
  initialNavigation: 'enabledNonBlocking',
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  onSameUrlNavigation: 'reload',
  paramsInheritanceStrategy: 'always',
  preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
