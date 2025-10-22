import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";

// Start a Hono app
type Env = {
  DB: D1Database;
  imagestore: R2Bucket;
};
const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.text('Hello from Worker + D1!'));

app.get('/api/items', async (c) => {
  const { results } = await c.env.DB.prepare('select *  from items').all();
  return c.json(results);
});

app.post('/api/products', async (c) => {
  const body = await c.req.json();
  await c.env.DB
    .prepare('INSERT INTO products (name, price) VALUES (?, ?)')
    .bind(body.name, body.price)
    .run();
  return c.text('Product added!');
});

export default app;
