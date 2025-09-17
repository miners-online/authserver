import 'dotenv/config';
import { auth } from './lib/auth.js';
import { Hono } from 'hono'

const app = new Hono()

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app
