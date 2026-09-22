# Believa

Believa is a modern Next.js application built to deliver a spiritual wellness experience with authenticated user journeys, interactive library content, AI-assisted guidance, and subscription management.

## Features

- Email/password authentication plus Google 
- User profile management, account edits, and password reset with OTP verification
- Interactive scripture library with search, saved content, and chapter progress tracking
- AI Guide chat experience for spiritual insights and verse explanations
- Naam Jaap tracker for meditation and mantra practice
- Subscription flow powered by Razorpay
- Admin dashboard for users, subscriptions, ratings, feedback, and contact management
- Cloudinary image uploads for profile pictures
- MySQL database-backed persistence

## Folder structure highlights

- `src/app/`: Next.js app routes, pages, and protected user/admin flows
- `src/app/api/`: server API routes for authentication, profile, library, chat, subscriptions, uploads, and admin operations
- `src/components/`: reusable UI components, navigation, profile cards, library cards, and admin controls
- `src/lib/`: adapters for database, cloudinary, Razorpay, authentication helpers, and translations

## Getting started

### Requirements

- Node.js 20+ (recommended)
- MySQL database
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root and provide the values required by the app.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_ID=your_apple_client_id
APPLE_SECRET=your_apple_client_secret

EMAIL_USER=your_email_address@gmail.com
EMAIL_PASS=your_email_password_or_app_password

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
NEXTAUTH_SECRET=your_nextauth_secret
```

> Optionally set `NEXTAUTH_URL` for production deployments.

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — build the production application
- `npm run start` — start the built production server
- `npm run lint` — run ESLint
- `npm run test` — placeholder command; no tests configured

## Deployment

This project is built with Next.js and can deploy to any platform that supports Next.js apps.

Recommended deployment steps:

1. Build the app: `npm run build`
2. Configure environment variables in your hosting provider
3. Start the app: `npm run start`

## Important environment integrations

- **MySQL**: persisted user accounts, library progress, feedback, ratings, and subscriptions
- **NextAuth**: authentication with credentials, Google, and Apple providers
- **Cloudinary**: profile image uploads
- **Razorpay**: payment and subscription creation
- **Nodemailer (Gmail)**: OTP and password reset email delivery
- **Sarvam AI**: AI chat assistance in the guide experience

## Notes

- The admin interface is available under `/admin` once an admin user signs in.
- User features are under `/library`, `/aiguide`, `/naam-jaap`, and `/profile`.
- Authentication pages are at `/login`, `/register`, `/forgot-password`, and `/new-password`.

## License

This repository is currently configured as a private Next.js application.
