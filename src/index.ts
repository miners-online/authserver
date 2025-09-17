import { Hono } from 'hono'
import { D1Database } from '@cloudflare/workers-types'
import { auth, initAuth } from './lib/auth';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  initAuth(c.env);
  return c.text('Hello Hono!')
})

export default app
