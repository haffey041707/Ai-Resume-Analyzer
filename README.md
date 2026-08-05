# Resumind — AI Resume Analyzer

Resumind is a premium, browser-based resume analysis dashboard that helps job seekers evaluate resume quality, ATS readiness, achievement impact, and alignment with a target job description.

The project combines a polished purple-and-blue glass interface with an interactive scoring engine and payment-gated Stripe subscriptions. Resume analysis runs in the browser; secure checkout and payment verification run through the included Node.js server.

## Features

- Animated overall resume score
- ATS compatibility analysis
- Content quality and impact scoring
- Job-description keyword matching
- Personalized improvement recommendations
- TXT resume upload and drag-and-drop support
- Resume and job-description text analyzer
- Searchable analysis-report history
- Dedicated Overview, Analysis, Keywords, Improvements, Reports, Pro, Settings, Notifications, and Help views
- Local sign-up, sign-in, password reset, and session persistence
- Configurable notification, report-saving, and motion preferences
- Responsive desktop and mobile interface
- Professional and Career Pro subscription plans
- Multi-step Plan → Review → Payment → Confirmation journey
- Stripe-hosted card and billing collection
- Server-side payment verification before Pro activation
- Checkout cancellation and failed-verification states

## How the analysis works

The local scoring engine reviews:

1. Resume structure and common ATS section headings
2. Resume length and content depth
3. Strong action verbs
4. Measurable achievements and numerical results
5. Keywords shared with the supplied job description

The results are combined into an overall score with separate ATS, content, impact, and keyword metrics.

## Run locally

Node.js 18 or newer is required for the payment-enabled version.

1. Clone the repository:

   ```bash
   git clone https://github.com/haffey041707/Ai-Resume-Analyzer.git
   ```

2. Open the project directory:

   ```bash
   cd Ai-Resume-Analyzer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

5. Add Stripe test credentials and recurring Price IDs to `.env`.

6. Start the application:

```bash
npm start
```

7. Open [http://localhost:3000](http://localhost:3000).

The interface can still be previewed by opening `index.html` directly, but checkout requires the Node.js server.

## Configure Stripe payments

1. Create or open a [Stripe account](https://dashboard.stripe.com/).
2. In Stripe test mode, create two products with recurring monthly prices:
   - Professional — `$12 USD/month`
   - Career Pro — `$29 USD/month`
3. Copy each `price_...` identifier into `.env`.
4. Copy your test secret key into `.env`.

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_CAREER_PRO=price_...
APP_URL=http://localhost:3000
PORT=3000
```

Never commit `.env` or expose `STRIPE_SECRET_KEY` in frontend code. The repository ignores `.env` automatically.

### Payment fulfillment flow

1. A signed-in user chooses a paid plan.
2. Resumind shows a separate order-review page.
3. The server creates a Stripe Checkout Session in subscription mode.
4. Stripe securely collects card and billing information on its hosted page.
5. Stripe redirects the customer back with the Checkout Session ID.
6. The Resumind server retrieves that Session directly from Stripe.
7. Pro activates only when the Session is `complete`, its `payment_status` is `paid`, and its email matches the signed-in account.

For reliable production fulfillment across browser closures and delayed payment methods, add a Stripe webhook and persist entitlements in a database.

## Using the analyzer

1. Select **Analyze resume**.
2. Paste your resume text.
3. Optionally paste a target job description for keyword matching.
4. Select **Run AI analysis**.
5. Review the score, keyword map, improvements, and saved report.

Plain-text (`.txt`) files can be analyzed directly. PDF selection is supported in the interface, but text must currently be pasted because PDF extraction requires an additional library or backend service.

## Privacy and storage

Resume reports, preferences, account details, sessions, and the browser's verified entitlement marker are stored using `localStorage`. Resume content is not sent to an external AI API. Stripe receives checkout information when a paid plan is purchased.

> Important: Stripe handles payment data securely, but the included account system still uses browser storage. Before public deployment, move users, password hashes, subscriptions, and entitlements into a secure database. Never use browser-local passwords for a production service.

## Production roadmap

To turn the demo into a production service, the next steps are:

- Add secure server-side authentication and password hashing
- Connect a database for users and report history
- Add server-side PDF and DOCX text extraction
- Integrate an AI model for deeper contextual feedback and rewriting
- Add Stripe webhooks and a customer billing portal
- Add rate limiting, validation, encryption, and account recovery email delivery
- Deploy the frontend and API through a production hosting platform

## Technology

- HTML5
- Modern CSS with glassmorphism and responsive layouts
- Vanilla JavaScript
- Browser FileReader and localStorage APIs
- Node.js and Express
- Stripe Checkout and server-side Session verification

## Responsive design

The interface includes dedicated layouts for wide desktop, compact desktop, tablet, mobile, and extra-small screens. Cards, checkout steps, pricing plans, tables, forms, notifications, and analysis results reflow without overlapping. Mobile controls use touch-friendly sizing, modals remain scrollable on short screens, and wide keyword data receives a contained horizontal scroll area instead of overflowing the page.

## Project structure

```text
Ai-Resume-Analyzer/
├── index.html    # Interface, styles, scoring engine, and app behavior
├── server.js     # Web server and Stripe Checkout API
├── package.json  # Runtime scripts and dependencies
├── .env.example  # Required Stripe configuration template
├── README.md     # Project documentation
└── .gitignore
```

## License

No license has been added yet. Unless a license is provided, all rights remain with the repository owner.
