import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors'
import { nanoid } from 'nanoid';
import fs from 'node:fs';

import { slotsRoutes } from './slots-routes.ts';
import { SlotService } from './slot-service.ts';

declare module 'hono' {
  interface ContextVariableMap {
    slots: SlotService;
  }
}

const addMinutes = (d: Date, minutes: number) => {
  const newDate = new Date();
  newDate.setTime(d.getTime() + minutes * 60 * 1000);
  return newDate;
};

export const createRandomSlots = () => {
  const startDay = new Date('2024-08-01');
  const endDay = new Date('2024-08-30');

  // 8 am to 7 pm = 11h, 30 minute slots
  const slotsPerDay = 22;
  const slots = [];

  const p = 0.9;

  const today = new Date(startDay);
  while (today.getDate() < endDay.getDate()) {
    const dayOfTheWeek = today.getDay();
    const isWeekend = dayOfTheWeek == 0 || dayOfTheWeek == 6;
    if (isWeekend) {
      today.setDate(today.getDate() + 1);
      continue;
    }

    const startTime = new Date(today);
    startTime.setHours(8);

    for (let i = 0; i < slotsPerDay; ++i) {
      if (Math.random() < p) {
        const slotTime = addMinutes(startTime, i * 30);
        slots.push({
          id: nanoid(),
          startDate: slotTime.toISOString(),
        });
      }
    }

    today.setDate(today.getDate() + 1);
  }

  return slots;
};

const seedSlots = () => {
  const file = process.env['SLOT_SEED_FILE'];
  if (!file) {
    console.log('SLOT_SEED_FILE was not set, using random seed.');
    return createRandomSlots();
  }

  return JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
};

const slots = seedSlots();

export const app = new OpenAPIHono();

app.use(async (c, next) => {
  if (!c.get('slots')) {
    c.set('slots', new SlotService(slots));
  }
  await next();
}, cors());

app.doc('/api-spec.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
});
app.get('/swagger', swaggerUI({ url: '/api-spec.json' }));

app.route('/', slotsRoutes);
