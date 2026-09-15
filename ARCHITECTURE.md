# AgriGuard AI Architecture

## Overview
AgriGuard AI utilizes a scalable monorepo architecture using Next.js for the frontend applications, FastAPI (Python) for the backend microservices, and PostgreSQL as the primary data store.

## Monorepo Structure
- `apps/`: User-facing Next.js applications (web, admin, expert-portal)
- `services/`: Python FastAPI microservices (api, ai-service, voice-service, etc.)
- `packages/`: Shared internal libraries (ui, validation, api-client)
- `ml/`: Machine learning pipelines and assets
- `database/`: SQL schemas, migrations, and seeds
- `infrastructure/`: Docker, CI/CD, deployment configurations

## Key Providers
The system abstracts external dependencies using Provider Interfaces:
- `AIProvider`
- `VoiceProvider`
- `WeatherProvider`
- `StorageProvider`

This ensures that the platform remains operational in local or isolated environments without relying on third-party API keys, in line with core requirements.
