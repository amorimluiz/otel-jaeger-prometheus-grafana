import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { OTEL_EXPORTER_HTTP_ENDPOINT, OTEL_SERVICE_NAME } from './config';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: OTEL_SERVICE_NAME,
  }),
  spanProcessors: [
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
    new SimpleSpanProcessor(new OTLPTraceExporter()),
  ],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
});