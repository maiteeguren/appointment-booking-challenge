import { ZodType } from 'zod';
import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { FilterSchema, SlotSchema } from './slot-service.ts';

const SuccessSchema = <Data extends ZodType>(dataSchema: Data) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
  });

const ErrorSchema = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.number().openapi({ example: 400 }),
    message: z.string().openapi({ example: 'An error happened' }),
    errors: z
      .array(
        z.object({
          location: z.string(),
          message: z.string(),
        }),
      )
      .optional(),
  }),
});

const getSlotsRoute = createRoute({
  method: 'get',
  path: '/slots',
  request: {
    query: FilterSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SuccessSchema(z.array(SlotSchema)),
        },
      },
      description: 'Retrieves the slots',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad request',
    },
  },
});

export const slotsRoutes = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const status = 400;
      return c.json(
        {
          success: false,
          error: {
            code: status,
            errors: result.error.issues.map((issue) => ({
              location: issue.path.join('.'),
              message: issue.message,
            })),
          },
        },
        status,
      );
    }
  },
});

slotsRoutes.openapi(getSlotsRoute, (c) => {
  const q = c.req.valid('query');
  const service = c.get('slots');

  return c.json(
    {
      success: true,
      data: service.querySlots(q),
    },
    200,
  );
});

const getSlotByIdRoute = createRoute({
  method: 'get',
  path: '/slots/{id}',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: 'id',
          in: 'path',
        },
        example: '123',
      }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SuccessSchema(SlotSchema),
        },
      },
      description: 'Retrieves the slots',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad request',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not found',
    },
  },
});

slotsRoutes.openapi(getSlotByIdRoute, (c) => {
  const { id } = c.req.valid('param');
  const service = c.get('slots');

  const slot = service.getSlot(id);
  if (slot) {
    return c.json(
      {
        success: true,
        data: slot,
      },
      200,
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: 404,
        message: 'Not found',
      },
    },
    404,
  );
});

const bookSlotRoute = createRoute({
  method: 'post',
  path: '/slots/{id}/book',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: 'id',
          in: 'path',
        },
        example: '123',
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().openapi({ example: 'John Smith' }),
          }),
        },
      },
      description: 'Retrieves the slots',
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SuccessSchema(SlotSchema),
        },
      },
      description: 'Retrieves the slots',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad request',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not found',
    },
  },
});

slotsRoutes.openapi(bookSlotRoute, (c) => {
  const { id } = c.req.valid('param');
  const body = c.req.valid('json');
  const service = c.get('slots');

  const slot = service.bookSlot(id, body.name);
  if (slot) {
    return c.json(
      {
        success: true,
        data: slot,
      },
      200,
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: 404,
        message: 'Not found',
      },
    },
    404,
  );
});

const cancelBookingSlotRoute = createRoute({
  method: 'post',
  path: '/slots/{id}/cancel-booking',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: 'id',
          in: 'path',
        },
        example: '123',
      }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SuccessSchema(SlotSchema),
        },
      },
      description: 'Retrieves the slots',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad request',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not found',
    },
  },
});

slotsRoutes.openapi(cancelBookingSlotRoute, (c) => {
  const { id } = c.req.valid('param');
  const service = c.get('slots');

  const slot = service.cancelBooking(id);
  if (slot) {
    return c.json(
      {
        success: true,
        data: slot,
      },
      200,
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: 404,
        message: 'Not found',
      },
    },
    404,
  );
});
