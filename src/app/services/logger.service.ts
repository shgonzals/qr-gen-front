import { trace } from '@opentelemetry/api';
import { loggerProvider } from "../otel/otel.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService  {
  private tracer = trace.getTracer('angular-tracer');
  private logger = loggerProvider.getLogger('angular-logger');


  emit(body: string){
    this.logger.emit({
      severityText: 'info',
      body: body,
      timestamp: new Date()
    });
  }
}
