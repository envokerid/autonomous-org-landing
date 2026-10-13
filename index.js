import express from "express";

const app = express();
const port = Number(process.env.PORT) || 8080;

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Autonomous Org</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; }
    main { text-align: center; padding: 2rem; }
    h1 { font-size: clamp(2rem, 6vw, 3.5rem); margin: 0 0 1rem; }
    p { font-size: 1.25rem; color: #94a3b8; }
  </style>
</head>
<body>
  <main>
    <h1>Hello, world.</h1>
    <p>This site was created by an autonomous org.</p>
  </main>
</body>
</html>`;

app.get("/", (req, res) => {
  res.type("html").send(page);
});

app.get("/healthz", (req, res) => {
  res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export { app, port };
