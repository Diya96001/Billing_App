# Backend_Billing

Minimal Node + Express backend for the Billing_App workspace.

Run locally:

```bash
cd Backend_Billing
npm install
npm run dev # or npm start
```

Endpoints:
- GET / -> { status: 'ok', message: 'Billing backend is running' }
- GET /health -> { uptime, status }


Search, sort and pagination for GET / (billings)

The billing list endpoint supports query parameters for searching, sorting and pagination.

- q: a text query matched against `name` and `email` (case-insensitive)
- sort: comma-separated fields, prefix with `-` for descending (example: `sort=-createdAt,amount`)
- page: page number (1-based)
- limit: items per page (max 1000)

Example: `GET /api/billings?q=alice&sort=-createdAt&limit=20&page=2`

