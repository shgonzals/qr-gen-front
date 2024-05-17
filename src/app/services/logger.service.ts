import { loggerProvider } from "../otel/otel.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService  {
  private logger = loggerProvider.getLogger('qrgen', '1.0.0');

  emit(body: string){
    this.logger.emit({
      severityText: 'info',
      body: body,
      timestamp: new Date()
    });
  }
}
