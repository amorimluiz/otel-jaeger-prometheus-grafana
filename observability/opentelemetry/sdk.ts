import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import {
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTEL_COLLECTOR_ENDPOINT, OTEL_SERVICE_NAME } from './config';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

export const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: OTEL_SERVICE_NAME,
  }),
  spanProcessors: [
    new SimpleSpanProcessor(new OTLPTraceExporter({
      url: `${OTEL_COLLECTOR_ENDPOINT}/v1/traces`,
    })),
  ],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${OTEL_COLLECTOR_ENDPOINT}/v1/metrics`,
    }),
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ]
});