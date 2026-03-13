# stripe-payment-page

## Program Summary
- Next.js app that shows a Japanese pricing page with three subscription plans.
- Uses a client-side checkout button that calls a `/api/checkout` route to create a Stripe Checkout session for monthly subscriptions.

## How to Use
- Not verified
- Install dependencies: `npm install`
- Set env vars: `STRIPE_SECRET_KEY` and optionally `NEXT_PUBLIC_BASE_URL`
- Run locally: `npm run dev`

## Completion Status
- Partial: core pricing UI and Stripe Checkout session creation are present, but there is no webhook handling or persistence for subscription state.
