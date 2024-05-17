import {
  BatchSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import {
  LoggerProvider,
  BatchLogRecordProcessor,
} from '@opentelemetry/sdk-logs';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_INSTANCE_ID, SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_NAMESPACE, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { ConsoleLogRecordExporter, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

const collectorOptions = {
  url: 'http://10.20.10.10:32250', // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 10, // an optional limit on pending requests
};

export const loggerProvider = new LoggerProvider();


export const setupOpenTelemetry = () => {

  const logExporter = new OTLPLogExporter(collectorOptions);
  //const logExporter = new ConsoleLogRecordExporter ();

  loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(logExporter));
  const logger = loggerProvider.getLogger('qrgen', '1.0.0');

  const provider = new WebTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'QRGEN',
      [SEMRESATTRS_SERVICE_NAMESPACE]: 'DEV',
      [SEMRESATTRS_SERVICE_VERSION]: '1.0.0',
      [SEMRESATTRS_SERVICE_INSTANCE_ID]: '1',
    })
  });

  const exporter = new OTLPTraceExporter(collectorOptions);

  provider.addSpanProcessor(new BatchSpanProcessor(exporter, {
    // The maximum queue size. After the size is reached spans are dropped.
    maxQueueSize: 100,
    // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
    maxExportBatchSize: 10,
    // The interval between two consecutive exports
    scheduledDelayMillis: 500,
    // How long the export can run before it is cancelled
    exportTimeoutMillis: 30000,
  }));

  provider.register();



  registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {},
            '@opentelemetry/instrumentation-xml-http-request': {},
        }),
    ],
  });

}



