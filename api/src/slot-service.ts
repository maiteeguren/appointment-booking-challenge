import { z } from '@hono/zod-openapi';

export const SlotSchema = z.object({
  id: z.string().openapi({
    example: '123',
  }),
  startDate: z.string().datetime().openapi({
    format: 'date-time',
  }),
  isBooked: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .optional()
    .openapi({}),
  bookedCustomerName: z.string().optional().openapi({}),
});

export type Slot = z.infer<typeof SlotSchema>;

export const FilterSchema = z.object({
  date: z
    .string()
    .date()
    .optional()
    .openapi({ param: { name: 'date', in: 'query' }, format: 'date' }),
  isBooked: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .optional()
    .openapi({
      param: { name: 'isBooked', in: 'query' },
    }),
  bookedCustomerName: z
    .string()
    .optional()
    .openapi({
      param: { name: 'bookedCustomerName', in: 'query' },
    }),
});

type Filter = z.infer<typeof FilterSchema>;

export class SlotService {
  _slots: Array<Slot> = null!;

  constructor(seed: Array<Slot>) {
    this._slots = seed;
  }

  querySlots(q: Filter) {
    let results = this._slots;
    if (q.date) {
      const dateTemplate = '0000-00-00';
      results = results.filter(
        (slot) => slot.startDate.substring(0, dateTemplate.length) === q.date,
      );
    }

    if (q.isBooked !== undefined) {
      results = results.filter((slot) => Boolean(slot.isBooked) === q.isBooked);
    }

    if (q.bookedCustomerName) {
      results = results.filter(
        (slot) => slot.bookedCustomerName === q.bookedCustomerName,
      );
    }
    return results;
  }

  getSlot(id: string) {
    return this._slots.find((slot) => slot.id === id);
  }

  bookSlot(id: string, name: string) {
    const slot = this.getSlot(id);

    if (!slot) {
      return undefined;
    }

    slot.isBooked = true;
    slot.bookedCustomerName = name;
    return slot;
  }

  cancelBooking(id: string) {
    const slot = this.getSlot(id);

    if (!slot) {
      return undefined;
    }

    slot.isBooked = false;
    delete slot.bookedCustomerName;
    return slot;
  }
}
