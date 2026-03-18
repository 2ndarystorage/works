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

## Program Summary
- Next.js 14 app that renders a Japanese pricing page with three plans and a Stripe Checkout subscription flow.
- Includes success and cancel pages plus a Stripe webhook endpoint with placeholder handlers (no persistence or business logic implemented).

## How to Use
- Not verified
- Install dependencies: `npm install`
- Set env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and optionally `NEXT_PUBLIC_BASE_URL`
- Run locally: `npm run dev`
- Stripe will redirect to `/success` or `/cancel` after checkout

## Completion Status
- Partial: checkout and basic webhook parsing exist, but webhook handlers are TODO-only and there is no storage or subscription state management.

## Program Summary
- Next.js 14 app that renders a Japanese pricing page with three plans and triggers Stripe Checkout subscription sessions via `/api/checkout`.
- Includes success/cancel pages and a Stripe webhook endpoint that validates events and logs them, but business logic is stubbed.

## How to Use
- Not verified
- Install dependencies: `npm install`
- Set env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and optionally `NEXT_PUBLIC_BASE_URL`
- Run locally: `npm run dev`

## Completion Status
- Partial: core pricing UI and Stripe Checkout flow work, but webhook handlers only log events and there is no persistence or subscription state management.
