import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from 'hono/cors';

// Start a Hono app
type Env = {
  DB: D1Database;
  imagestore: R2Bucket;
};
const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.get('/', (c) => c.text('Hello from Worker + D1!'));

app.get('/api/items', async (c) => {
  const { results } = await c.env.DB.prepare('select *  from items').all();
  return c.json({"data":results});
});

app.post('/api/item', async (c) => {
  const body = await c.req.json();
  await c.env.DB
    .prepare('INSERT INTO products (name, price) VALUES (?, ?)')
    .bind(body.name, body.price)
    .run();
  return c.text('Product added!');
});

app.get('/api/categories', async (c) => {
  const { results } = await c.env.DB.prepare('select *  from categories').all();
  return c.json(results);
});

app.get('/api/storeInfo', async (c) => {
  const { results } = await c.env.DB.prepare('select * from storeInfo').all();
  return c.json(results);
});

export default app;
