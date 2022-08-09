[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](
https://cloud.digitalocean.com/apps/new?repo=https://github.com/fossilfuelregistry/portal-v2/tree/master
)

# fossilfuelregistry.org web client

## Stack

The client is based on the NextJS framework.

It is based on:

- Chakra UI for UI components
- Apollo GraphQL for data fetching
- The POEditor translation service for i18n texts
- AirBnB VisX for chart graphics
- MaplibreGL with a private vector tile server for maps

## Building

The build process is 100% standard NextJS. It needs a `.env.local` file for various keys:

```
POEDITOR_API_TOKEN=...
POEDITOR_PROJECT_ID=...

NEXT_PUBLIC_BACKEND_URL=https://api.fossilfuelregistry.org

NEXT_PUBLIC_GA=... (Google Analytics Property id)
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=...
NEXT_PUBLIC_OPENCORPORATES_API_TOKEN=...

NEXT_PUBLIC_CMS_URL=https://cms.fossilfuelregistry.org
NEXT_PUBLIC_CMS_TOKEN=...

NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_ENVIRONMENT= local | development | production
```
