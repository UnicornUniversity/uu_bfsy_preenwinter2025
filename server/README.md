# Simple Express Auth Server

Endpoints:

- POST `/login` { email, password } => { token, user }
- POST `/logout` (Bearer token) => { success }
- GET `/auth/check` (Bearer token) => { authenticated, user }
- GET `/api/profile` (Bearer token) => { user }
- GET `/health` => { status: 'ok' }

Mock users:

- Emails: `user1@example.com` ... `user10@example.com`
- Password: `Password123!` (hashed with bcrypt at startup)

Environment variables:

- `PORT` (default 4000)
- `JWT_SECRET` (required for production; defaults to a dev value)
- `JWT_EXPIRES_IN` (default `1h`)

Install and run:

```bash
cd server
npm install
npm run dev
```

Example login:

```bash
curl -s -X POST http://localhost:4000/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user1@example.com","password":"Password123!"}'
```

Use the returned token in Authorization header:

```bash
curl -s http://localhost:4000/auth/check \
  -H 'Authorization: Bearer <TOKEN>'
```
