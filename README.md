# Mini ATS

A lightweight Applicant Tracking System to manage candidates, move them through hiring stages, search/filter, and view dashboard metrics.

**Live demo:** https://mini-ats-ochre.vercel.app/


## Features
- **Dashboard:** total candidates, active pipeline, hires, hire rate, offer acceptance, average days to hire, plus breakdowns by stage, role and source
- **Pipeline board:** Applied → Screening → Interview → Offer → Hired / Rejected, with drag and drop or a dropdown on each card
- **Candidates table:** sortable columns, full-text search, stage and role filters
- **Candidate CRUD:** validation, unique email, notes and a stage-change history
- **CSV export**, responsive layout, light/dark mode

## Tech stack
Node.js, Express, MongoDB (Mongoose), vanilla HTML/CSS/JS frontend served by Express.

## Project structure
```
mini-ats/                  (single flat folder)
├── server.js              # Express app, error handling, serves index.html
├── db.js                  # MongoDB connection
├── Candidate.js           # Mongoose schema (stages, history, validation)
├── candidates.js          # REST API routes
├── seed.js                # Sample data
├── index.html             # Frontend (dashboard, board, table)
├── .env.example           # Environment template
├── .gitignore
└── package.json
```

## Run locally
Requirements: Node.js 18+ and MongoDB running locally.

```bash
git clone <your-repo-url> && cd mini-ats
npm install
cp .env.example .env      # default: mongodb://127.0.0.1:27017/mini-ats
npm run seed              # optional sample data
npm start                 # http://localhost:5000
```

`.env`:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mini-ats
```

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/candidates?q=&stage=&role=` | List, search and filter |
| GET | `/api/candidates/:id` | Get one candidate |
| POST | `/api/candidates` | Create |
| PUT | `/api/candidates/:id` | Update (a stage change is added to history) |
| DELETE | `/api/candidates/:id` | Delete |


```
