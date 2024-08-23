import { Component, ErrorHandler, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { ApmErrorHandler, ApmService } from '@elastic/apm-rum-angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler,
    },
  ],
})
export class AppComponent {
  constructor(service: ApmService) {
    // Agent API is exposed through this apm instance
    const apm = service.init({
      serviceName: 'qr-gen-front',
      serverUrl: 'http://10.20.10.10:8200',
      environment: 'pro',
    });

    /*
    apm.setUserContext({
      username: 'foo',
      id: 'bar',
    });
    */
  }
}
