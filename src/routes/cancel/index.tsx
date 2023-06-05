import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = (requestEvent) => {
  requestEvent.json(303, {
    message: 'Hello from Qwik!',
  });
};
