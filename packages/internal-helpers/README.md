# @owox/internal-helpers

These are internal helpers used by core OWOX packages. This package should not be used externally

## Utilities

### parseMysqlSslEnv(raw?: string): unknown

Parses MySQL SSL env variable into a value suitable for `mysql2.createPool({ ssl })`. [All options](https://sidorares.github.io/node-mysql2/docs/documentation/ssl).

Supported inputs (as strings):

- `true` → `{}` (enable TLS with default verification)
- `false` → `undefined` (disable TLS)
- JSON → parsed object (e.g. `{ "rejectUnauthorized": true, "ca": "..." }`)

Examples:

```ts
import { parseMysqlSslEnv } from '@owox/internal-helpers';

const ssl = parseMysqlSslEnv(process.env.DB_SSL);
const poolConfig = { host: '...', ssl }; // pass to mysql2
```

#### .env examples (Better Auth provider)

```env
# Enable TLS with default verification
IDP_BETTER_AUTH_MYSQL_SSL=true

# Strict verification (recommended)
IDP_BETTER_AUTH_MYSQL_SSL={"rejectUnauthorized":true}

# Provide custom CA (inline PEM)
IDP_BETTER_AUTH_MYSQL_SSL={"rejectUnauthorized":true,"ca":"-----BEGIN CERTIFICATE-----\\n...\\n-----END CERTIFICATE-----\\n"}

# Minimum TLS version
IDP_BETTER_AUTH_MYSQL_SSL={"rejectUnauthorized":true,"minVersion":"TLSv1.2"}
```

#### .env examples (NestJS + TypeORM)

```env
# Enable TLS with default verification
DB_SSL=true

# Strict verification (recommended)
DB_SSL={"rejectUnauthorized":true}

# With custom CA
DB_SSL={"rejectUnauthorized":true,"ca":"-----BEGIN CERTIFICATE-----\\n...\\n-----END CERTIFICATE-----\\n"}
```

Security note: keep `rejectUnauthorized: true` in production. Provide `ca` when using private/self-signed CAs to avoid verification errors.
