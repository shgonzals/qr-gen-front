import { loggerProvider } from '../otel/otel.config';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements OnDestroy {
  private logger = loggerProvider.getLogger('qrgen', '1.0.0');

  emit(level: 'info' | 'warn' | 'error' | 'debug', body: string) {
    this.logger.emit({
      severityText: level,
      body: body,
      timestamp: new Date(),
      attributes: {},
    });
  }

  async forceFlush() {
    try {
      await loggerProvider.forceFlush();
    } catch (error) {
      console.error('Failed to force flush:', error);
    }
  }

  async shutdown() {
    try {
      await loggerProvider.shutdown();
    } catch (error) {
      console.error('Failed to shutdown logger provider:', error);
    }
  }

  ngOnDestroy() {
    this.forceFlush().then(() => this.shutdown());
  }
}
