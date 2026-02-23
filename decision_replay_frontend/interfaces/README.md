Backend OpenAPI discovery notes

- The backend `/docs` is serving Swagger UI with an embedded minimal `swaggerDoc` (currently only GET `/` health).
- A separate OpenAPI JSON endpoint does not appear to be exposed yet.
- The frontend API client (`src/lib/api/client.ts`) is wired to `NEXT_PUBLIC_API_BASE` and:
  - calls GET `/` for health
  - stubs expected future routes:
    - POST `/auth/login`
    - POST `/auth/signup`
    - GET/POST `/decisions`
    - GET/PUT `/decisions/:id`
    - POST `/similarity/search`

When the backend implements these routes, remove stub fallbacks and validate responses with the zod schemas.
