import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeAction$, Form } from '@builder.io/qwik-city';
import { stripe } from '~/lib/stripe';

export const useCreateSessionAction = routeAction$(async (values, event) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          product_data: {
            name: 'Laptop',
            description: 'Gaming laptop',
          },
          currency: 'usd',
          unit_amount: 200_00,
        },
      },
      {
        quantity: 2,
        price_data: {
          product_data: {
            name: 'TV',
            description: 'Smart TV',
          },
          currency: 'usd',
          unit_amount: 100_00,
        },
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/',
    cancel_url: 'http://localhost:5173/',
  });

  if (!session.url) {
    throw new Error('Missing session url');
  }

  throw event.redirect(303, session.url);
});

export default component$(() => {
  const createSessionAction = useCreateSessionAction();
  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
      <Form action={createSessionAction}>
        <button type="submit">Buy now</button>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
