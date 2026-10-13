// Cloudflare Workers entry: runs the Express app from index.js on the Workers runtime.
// httpServerHandler routes incoming requests to the server listening on `port`.
import { httpServerHandler } from "cloudflare:node";
import { port } from "./index.js";

export default httpServerHandler({ port });
