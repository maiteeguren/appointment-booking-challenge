import { describe, it } from 'node:test';
import assert from 'node:assert';

import { app } from './app.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Slot, SlotService } from './slot-service.ts';

function createAppWithService(service: SlotService) {
  const appWithService = new OpenAPIHono();
  appWithService
    .use(async (c, next) => {
      c.set('slots', service);
      await next();
    })
    .route('/', app);
  return appWithService;
}

describe('booking API', async () => {
  it('GET /slots query by date returns slots on same day', async () => {
    const app = createAppWithService(
      new SlotService([
        { id: '1', startDate: '2024-08-01T12:00' },
        { id: '2', startDate: '2024-08-01T14:00' },
        { id: '3', startDate: '2024-08-05T12:00' },
      ]),
    );

    const res = await app.request('/slots?date=2024-08-01', { method: 'get' });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    const expectedIds = ['1', '2'];
    assert.equal(body.data.length, expectedIds.length);
    body.data.forEach((s: Slot, idx: number) => {
      assert.equal(s.id, expectedIds[idx]);
    });
  });

  it('GET /slots query by booked status', async () => {
    const app = createAppWithService(
      new SlotService([
        { id: '1', startDate: '2024-08-01T12:00', isBooked: true },
        { id: '2', startDate: '2024-08-01T14:00', isBooked: false },
        { id: '3', startDate: '2024-08-05T12:00', isBooked: true },
      ]),
    );

    const res = await app.request('/slots?isBooked=true', { method: 'get' });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    const expectedIds = ['1', '3'];
    assert.equal(body.data.length, expectedIds.length);
    body.data.forEach((s: Slot, idx: number) => {
      assert.equal(s.id, expectedIds[idx]);
    });
  });

  it('GET /slots query by not booked status', async () => {
    const app = createAppWithService(
      new SlotService([
        { id: '1', startDate: '2024-08-01T12:00', isBooked: true },
        { id: '2', startDate: '2024-08-01T14:00', isBooked: false },
        { id: '3', startDate: '2024-08-05T12:00' },
      ]),
    );

    const res = await app.request('/slots?isBooked=false', { method: 'get' });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    const expectedIds = ['2', '3'];
    assert.equal(body.data.length, expectedIds.length);
    body.data.forEach((s: Slot, idx: number) => {
      assert.equal(s.id, expectedIds[idx]);
    });
  });

  it('GET /slots query by not booked status', async () => {
    const app = createAppWithService(
      new SlotService([
        { id: '1', startDate: '2024-08-01T12:00', isBooked: true },
        { id: '2', startDate: '2024-08-01T14:00', isBooked: false },
        { id: '3', startDate: '2024-08-05T12:00', isBooked: true },
      ]),
    );

    const res = await app.request('/slots?isBooked=false', { method: 'get' });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    const expectedIds = ['2'];
    assert.equal(body.data.length, expectedIds.length);
    body.data.forEach((s: Slot, idx: number) => {
      assert.equal(s.id, expectedIds[idx]);
    });
  });

  it('GET /slots query by bookedCustomerName', async () => {
    const app = createAppWithService(
      new SlotService([
        {
          id: '1',
          startDate: '2024-08-01T12:00',
          isBooked: true,
          bookedCustomerName: 'John Smith',
        },
        { id: '2', startDate: '2024-08-01T14:00', isBooked: false },
        {
          id: '3',
          startDate: '2024-08-05T12:00',
          isBooked: true,
          bookedCustomerName: 'Jane Doe',
        },
      ]),
    );

    const res = await app.request('/slots?bookedCustomerName=Jane Doe', {
      method: 'get',
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    const expectedIds = ['3'];
    assert.equal(body.data.length, expectedIds.length);
    body.data.forEach((s: Slot, idx: number) => {
      assert.equal(s.id, expectedIds[idx]);
    });
  });

  it('GET /slots/:id returns slot if exists', async () => {
    const app = createAppWithService(
      new SlotService([
        {
          id: '1',
          startDate: '2024-08-01T12:00',
        },
        { id: '2', startDate: '2024-08-01T14:00' },
        {
          id: '3',
          startDate: '2024-08-05T12:00',
        },
      ]),
    );

    const res = await app.request('/slots/3', {
      method: 'get',
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    assert.equal(body.data.id, 3);
    assert.equal(body.data.startDate, '2024-08-05T12:00');
  });

  it('GET /slots/:id returns 404 when id doesnt exist', async () => {
    const app = createAppWithService(new SlotService([]));

    const res = await app.request('/slots/5', {
      method: 'get',
    });
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.success, false);
    assert.equal(body.error.code, 404);
  });

  it('POST /slots/:id/book sets isBooked and returns slot', async () => {
    const app = createAppWithService(
      new SlotService([
        {
          id: '1',
          startDate: '2024-08-01T12:00',
        },
        { id: '2', startDate: '2024-08-01T14:00' },
        {
          id: '3',
          startDate: '2024-08-05T12:00',
        },
      ]),
    );

    const res = await app.request('/slots/2/book', {
      method: 'POST',
      body: JSON.stringify({ name: 'Jane Doe' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.id, '2');
    assert.equal(body.data.isBooked, true);

    const res2 = await app.request('/slots/2', {
      method: 'GET',
    });
    const body2 = await res2.json();
    assert.equal(body2.data.isBooked, true);
    assert.equal(body2.data.bookedCustomerName, 'Jane Doe');
  });

  it('POST /slots/:id/cancel-booking sets isBooked false and returns slot', async () => {
    const app = createAppWithService(
      new SlotService([
        {
          id: '2',
          startDate: '2024-08-01T12:00',
          isBooked: true,
          bookedCustomerName: 'John Smith',
        },
      ]),
    );

    const res = await app.request('/slots/2/cancel-booking', {
      method: 'POST',
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.id, '2');
    assert.equal(body.data.isBooked, false);
    assert.equal(body.data.bookedCustomerName, undefined);

    const res2 = await app.request('/slots/2', {
      method: 'GET',
    });
    const body2 = await res2.json();
    assert.equal(body2.data.isBooked, false);
    assert.equal(body2.data.bookedCustomerName, undefined);
  });
});
