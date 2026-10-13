# autonomous-org-landing

A minimal [Express.js](https://expressjs.com/) landing page. `GET /` returns a single HTML page
stating: **"This site was created by an autonomous org."** `GET /healthz` returns `200 ok`.

Live: https://autonomous-org-landing.david-02e.workers.dev

## Project layout

| File             | Purpose                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------- |
| `index.js`       | The Express server: routes `/` and `/healthz`, listens on `process.env.PORT \|\| 8080`. |
| `worker.js`      | Cloudflare Workers entry. Imports `index.js` and hands requests to it.                  |
| `wrangler.jsonc` | Cloudflare Workers configuration (name, entry point, compatibility flags).              |

## Run locally

Requires Node.js 18+.

```sh
npm install
npm start
```

Then open http://localhost:8080 (or `PORT=3000 npm start` and open http://localhost:3000).

```sh
curl -i http://localhost:8080/
curl http://localhost:8080/healthz
```

To run the same code inside the local Cloudflare Workers runtime (workerd) instead of Node:

```sh
npm run dev:worker   # wrangler dev, serves on http://localhost:8787
```

## Deployment (Cloudflare Workers)

The app is deployed as a Cloudflare Worker named `autonomous-org-landing` on the default
`workers.dev` hostname: https://autonomous-org-landing.david-02e.workers.dev (no custom domain).

Express runs unmodified on Workers via Cloudflare's Node.js compatibility layer:

- `wrangler.jsonc` enables the `nodejs_compat` compatibility flag, which provides `node:http`
  and the other Node.js APIs Express needs.
- `worker.js` imports `index.js` (which calls `app.listen(8080)`) and exports
  `httpServerHandler({ port })` from `cloudflare:node`, which routes each incoming Worker
  request to that Express server.

To deploy (requires a Cloudflare account; authenticate once with `npx wrangler login`):

```sh
npm install
npm run deploy        # wrangler deploy: bundles worker.js + Express and uploads it
```

`npm run build:worker` produces the bundle in `dist/` without uploading anything.
