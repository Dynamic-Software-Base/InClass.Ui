# InClass Frontend (Angular + BFF)

Angular frontend configured to call the ASP.NET Core BFF only (`http://localhost:5181`) using session cookie auth.

## Run locally

1. Start the BFF on `http://localhost:5181`.
2. Start your API backend (if separate from the BFF).
3. Install dependencies:

```bash
npm install
```

4. Start Angular:

```bash
npm run start
```

5. Build Angular:

```bash
npm run build
```

## Notes

- All `HttpClient` calls run with `withCredentials: true` via a global interceptor.
- Auth redirects are browser redirects to BFF endpoints:
  - `/auth/login`
  - `/auth/logout`
  - `/auth/me`
- API traffic is BFF-prefixed via `ApiUrlBuilder` and targets `/api/...` endpoints.