# OpenTelemetry, Jaeger, Prometheus, and Grafana Integration

This repository demonstrates the integration of OpenTelemetry, Jaeger, Prometheus, and Grafana for observability in a Node.js application.

## Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Setup](#setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Viewing Metrics and Traces](#viewing-metrics-and-traces)
- [License](#license)

## Introduction

This project sets up a complete observability stack using OpenTelemetry for instrumentation, Jaeger for tracing, Prometheus for metrics collection, and Grafana for visualization.

## Requirements

- Docker
- Docker Compose

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/amorimluiz/otel-jaeger-prometheus-grafana.git
    cd otel-jaeger-prometheus-grafana
    ```

2. Copy the example environment file:
    ```sh
    cp .env.example .env
    ```

3. Update `.env` with any necessary configuration.

## Configuration

### OpenTelemetry Collector

The OpenTelemetry Collector configuration is in `collector-config.yml`. This file sets up the pipelines for receiving, processing, and exporting traces and metrics.

### Prometheus

Prometheus configuration is in `prometheus.yml`. It includes scrape configurations to collect metrics from the OpenTelemetry Collector.

### Docker Compose

The `docker-compose.yml` file sets up all the services, including the OpenTelemetry Collector, Jaeger, Prometheus, and Grafana.

## Running the Application

To start all services, run:
```sh
docker-compose up --build
```

## Viewing Metrics and Traces

- **Jaeger UI**: Available at `http://localhost:16686` for viewing traces.
- **Prometheus UI**: Available at `http://localhost:9090` for querying metrics.
- **Grafana UI**: Available at `http://localhost:3000` for dashboards and visualizations (default login: `admin`/`admin`).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
