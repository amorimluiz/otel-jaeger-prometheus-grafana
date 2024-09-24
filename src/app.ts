import { trace } from '@opentelemetry/api'
import express from 'express'
import { OTEL_EXPORTER_HTTP_ENDPOINT, OTEL_SERVICE_NAME } from '../observability/opentelemetry/config';
import { sdk } from '../observability/opentelemetry/sdk';

sdk.start();

const tracer = trace.getTracer(OTEL_SERVICE_NAME)

const port = 3000

const app = express()

const route = express.Router()

app.use(express.json())

function getProduct(index: number) {
  return {
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 100),
  };
}

function getProducts(length: number) {
  return Array.from({ length }, (_, index) => tracer.startActiveSpan(`getProduct${index}`, span => {
    const product = getProduct(index)
    span.end()
    return product
  }))
}

route.get('/products', (req: express.Request, res: express.Response) => {
  tracer.startActiveSpan('getProducts', (span) => {
    try {
      const productsLength = req.query?.productsLength ? Number(req.query?.productsLength) : 10

      if (isNaN(productsLength)) {
        throw new Error('Invalid productsLength')
      }

      const products = getProducts(productsLength)

      res.json(products)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    } finally {
      span.end()
    }
    console.log(OTEL_EXPORTER_HTTP_ENDPOINT)
  })
});

app.use(route)


app.listen(port, () => `server running on port ${port}`)