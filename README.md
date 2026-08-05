# Resumind — AI Resume Analyzer

Resumind is a premium, browser-based resume analysis dashboard that helps job seekers evaluate resume quality, ATS readiness, achievement impact, and alignment with a target job description.

The project combines a polished purple-and-blue glass interface with an interactive scoring engine. It runs locally in the browser and requires no installation or backend.

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
- Pro plan selection demonstration

## How the analysis works

The local scoring engine reviews:

1. Resume structure and common ATS section headings
2. Resume length and content depth
3. Strong action verbs
4. Measurable achievements and numerical results
5. Keywords shared with the supplied job description

The results are combined into an overall score with separate ATS, content, impact, and keyword metrics.

## Run locally

No package manager or build process is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/haffey041707/Ai-Resume-Analyzer.git
   ```

2. Open the project directory:

   ```bash
   cd Ai-Resume-Analyzer
   ```

3. Open `index.html` in a modern browser.

On macOS, you can run:

```bash
open index.html
```

## Using the analyzer

1. Select **Analyze resume**.
2. Paste your resume text.
3. Optionally paste a target job description for keyword matching.
4. Select **Run AI analysis**.
5. Review the score, keyword map, improvements, and saved report.

Plain-text (`.txt`) files can be analyzed directly. PDF selection is supported in the interface, but text must currently be pasted because PDF extraction requires an additional library or backend service.

## Privacy and storage

This version is local-first. Resume reports, preferences, account details, and sessions are stored in the browser using `localStorage`. Resume content is not sent to an external API.

> Important: The included authentication and Pro-plan flows are product demonstrations. Browser storage is not appropriate for production passwords or payment data.

## Production roadmap

To turn the demo into a production service, the next steps are:

- Add secure server-side authentication and password hashing
- Connect a database for users and report history
- Add server-side PDF and DOCX text extraction
- Integrate an AI model for deeper contextual feedback and rewriting
- Add secure billing through a payment provider such as Stripe
- Add rate limiting, validation, encryption, and account recovery email delivery
- Deploy the frontend and API through a production hosting platform

## Technology

- HTML5
- Modern CSS with glassmorphism and responsive layouts
- Vanilla JavaScript
- Browser FileReader and localStorage APIs
- No framework or build dependencies

## Project structure

```text
Ai-Resume-Analyzer/
├── index.html    # Interface, styles, scoring engine, and app behavior
├── README.md     # Project documentation
└── .gitignore
```

## License

No license has been added yet. Unless a license is provided, all rights remain with the repository owner.
