# Raw API

The Raw API provides programmatic access to [is-a.dev](https://is-a.dev) subdomain registration data.

## Base URL

```
https://raw.is-a.dev
```

## Endpoints

### Get all domains

Returns a JSON dump of every registered `is-a.dev` subdomain.

```
GET /v2.json
```

**Example request**

```bash
curl https://raw.is-a.dev/v2.json
```

**Example response**

```json
[
  {
    "domain": "example-1.is-a.dev",
    "owner": {
      "username": "example-user-1"
    },
    "record": {
      "CNAME": "cname-1.example.com"
    }
  },
  {
    "domain": "example-2.is-a.dev",
    "owner": {
      "username": "example-user-2"
    },
    "record": {
      "A": ["192.0.2.1"]
    }
  }
]
```

---

### Get a specific domain

Returns registration data for a single `is-a.dev` subdomain.

```
GET /v2/domains/<domain>.json
```

**Path parameters**

| Parameter | Type   | Description                                              |
|-----------|--------|------------------------------------------------------------|
| `domain`  | string | The subdomain name, without the `.is-a.dev` suffix.       |

**Example request**

```bash
curl https://raw.is-a.dev/v2/domains/example.json
```

**Example response**

```json
{
  "domain": "example.is-a.dev",
  "owner": {
    "username": "example-user"
  },
  "record": {
    "CNAME": "cname-1.example.com"
  }
}
```

## Notes

- All data responses are returned as `application/json`. 404 responses may be returned `text/html` due to the usage of GitHub Pages.
- The `<domain>` path segment should match the subdomain's registration filename (without the `.is-a.dev` suffix), e.g. `example` for `example.is-a.dev`.
