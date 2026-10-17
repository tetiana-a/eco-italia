const test = require('node:test');
const assert = require('node:assert');

process.env.ADMIN_PASSWORD = 'test-pass';
process.env.ADMIN_EMAIL = 'admin@test.cz';
delete process.env.RESEND_API_KEY;
const app = require('../server');

test('admin routes are closed and totals are computed on the server', async (t) => {
  const srv = app.listen(0);
  t.after(() => srv.close());
  const base = `http://127.0.0.1:${srv.address().port}/api`;
  const json = { 'Content-Type': 'application/json' };

  assert.strictEqual((await fetch(`${base}/orders`)).status, 401);
  assert.strictEqual((await fetch(`${base}/products/1`, { method: 'DELETE' })).status, 401);
  assert.strictEqual((await fetch(`${base}/auth/login`, { method: 'POST', headers: json, body: JSON.stringify({ email: 'admin@test.cz', password: 'admin123' }) })).status, 401);

  const customer = { name: 'A', email: 'a@b.cz', address: 'Ulice 1', city: 'Brno', zip: '60200' };
  const r = await fetch(`${base}/orders`, { method: 'POST', headers: json, body: JSON.stringify({ customer, items: [{ id: '9', qty: 2, price: 1 }], total: 1 }) });
  assert.strictEqual(r.status, 201);
  assert.strictEqual((await r.json()).total, 700); // 2 × 350 Kč from the catalogue, not the 1 Kč sent by the client

  assert.strictEqual((await fetch(`${base}/orders`, { method: 'POST', headers: json, body: JSON.stringify({ customer, items: [{ id: 'nope', qty: 1 }] }) })).status, 400);

  const login = await fetch(`${base}/auth/login`, { method: 'POST', headers: json, body: JSON.stringify({ email: 'admin@test.cz', password: 'test-pass' }) });
  const { token } = await login.json();
  const list = await fetch(`${base}/orders`, { headers: { Authorization: `Bearer ${token}` } });
  assert.strictEqual(list.status, 200);
  assert.strictEqual((await list.json()).length, 1);
});
