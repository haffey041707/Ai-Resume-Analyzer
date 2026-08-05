require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const port = Number(process.env.PORT) || 3000;
const appUrl = (process.env.APP_URL || `http://localhost:${port}`).replace(/\/$/, '');

const plans = {
  Professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  'Career Pro': process.env.STRIPE_PRICE_CAREER_PRO
};

function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('replace_me')) {
    const error = new Error('Stripe is not configured. Add STRIPE_SECRET_KEY and Stripe Price IDs to .env.');
    error.status = 503;
    throw error;
  }
  return require('stripe')(process.env.STRIPE_SECRET_KEY);
}

app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('replace_me')) });
});

app.post('/api/create-checkout-session', async (request, response) => {
  try {
    const { plan, email } = request.body || {};
    const price = plans[plan];

    if (!price || !String(price).startsWith('price_')) {
      return response.status(400).json({ error: 'This paid plan is not configured.' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return response.status(400).json({ error: 'A valid signed-in email address is required.' });
    }

    const session = await stripeClient().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      metadata: { plan, resumind_email: email },
      subscription_data: { metadata: { plan, resumind_email: email } },
      success_url: `${appUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}#pro`,
      cancel_url: `${appUrl}/?checkout=cancelled#pro`
    });

    response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout creation failed:', error.message);
    response.status(error.status || 500).json({ error: error.message || 'Unable to start secure checkout.' });
  }
});

app.get('/api/verify-checkout', async (request, response) => {
  try {
    const sessionId = String(request.query.session_id || '');
    if (!sessionId.startsWith('cs_')) return response.status(400).json({ error: 'Invalid checkout session.' });

    const session = await stripeClient().checkout.sessions.retrieve(sessionId);
    const paid = session.status === 'complete' && session.payment_status === 'paid';

    if (!paid) return response.status(402).json({ paid: false, error: 'Payment has not been confirmed.' });

    response.json({
      paid: true,
      plan: session.metadata.plan,
      email: session.customer_details?.email || session.customer_email,
      customer: session.customer,
      subscription: session.subscription
    });
  } catch (error) {
    console.error('Checkout verification failed:', error.message);
    response.status(error.status || 500).json({ paid: false, error: 'Unable to verify payment.' });
  }
});

app.get('*', (_request, response) => response.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => {
  console.log(`Resumind is running at ${appUrl}`);
  if (!process.env.STRIPE_SECRET_KEY) console.log('Stripe checkout is disabled until .env is configured.');
});
