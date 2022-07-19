import {loadStripe} from '@stripe/stripe-js';

if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
    console.warn("env-variable REACT_APP_STRIPE_PUBLISHABLE_KEY is not found! Stripe Payments will not work");
}

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);