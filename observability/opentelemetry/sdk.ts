import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTEL_COLLECTOR_ENDPOINT, OTEL_SERVICE_NAME } from './config';

export const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: OTEL_SERVICE_NAME,
  }),
  spanProcessors: [
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
    new SimpleSpanProcessor(new OTLPTraceExporter({
      url: `${OTEL_COLLECTOR_ENDPOINT}/v1/traces`,
    })),
  ],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  })
});