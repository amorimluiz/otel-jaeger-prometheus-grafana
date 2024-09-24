import dotenv from 'dotenv';
dotenv.config();

const OTEL_SERVICE_NAME = process.env.OTEL_SERVICE_NAME || 'products-nodejs';

const OTEL_COLLECTOR_ENDPOINT = process.env.OTEL_COLLECTOR_ENDPOINT;

export {
  OTEL_SERVICE_NAME,
  OTEL_COLLECTOR_ENDPOINT
}