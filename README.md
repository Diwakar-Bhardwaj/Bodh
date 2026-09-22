# Bodh

Bodh is a spiritual wellness web app built with Next.js. It combines scripture study, daily reflection, guided AI conversations, Naam Jaap practice, and account-based progress tracking in one calm, focused experience.

## What it includes

- Email/password authentication with Google
- OTP-based password reset and email delivery through Nodemailer
- Scripture library with search, saved verses, chapter progress, and quizzes
- AI Guide chat for spiritual questions, verse explanations, and reflection
- Naam Jaap tracker for mantra practice and streaks
- Profile, language, privacy, feedback, contact, and subscription settings
- Razorpay subscription checkout and webhook handling
- Admin workspace for users, library content, subscriptions, ratings, feedback, and contact requests
- Cloudinary profile image uploads
- MySQL persistence for users, library activity, feedback, ratings, and subscriptions

## Tech stack

- Next.js 15 App Router and React 19
- NextAuth for authentication
- MySQL with `mysql2`
- Tailwind CSS 4 and Framer Motion
- Google Gemini API for AI Guide responses
- Razorpay for payments
- Cloudinary for image storage

## Project structure

```text
src/
  app/          Pages, layouts, route handlers, and admin screens
  components/   Shared navigation, cards, forms, and feature components
  lib/          Database, auth, email, payment, storage, and translation helpers
  middleware.js Route protection and session handling
public/
  images/       Scripture and application imagery
```

## Prerequisites

- Node.js 20 or newer
- MySQL 8 or a compatible MySQL database
- npm
- Credentials for the integrations you plan to enable

## Local setup

1. Install dependencies:

	```bash
	npm install
	```

2. Create `.env.local` in the project root. Use the variables below and replace each placeholder with a real value.

	```env
	# MySQL
	DB_HOST=localhost
	DB_PORT=3306
	DB_USER=your_db_user
	DB_PASSWORD=your_db_password
	DB_NAME=your_db_name

	# NextAuth and OAuth
	NEXTAUTH_SECRET=your_nextauth_secret
	NEXTAUTH_URL=http://localhost:3000
	GOOGLE_CLIENT_ID=your_google_client_id
	GOOGLE_CLIENT_SECRET=your_google_client_secret
	APPLE_ID=your_apple_client_id
	APPLE_SECRET=your_apple_client_secret

	# Email and password reset
	EMAIL_USER=your_email_address@gmail.com
	EMAIL_PASS=your_email_password_or_app_password

	# AI Guide
	GEMINI_API_KEY=your_gemini_api_key
	GEMINI_MODEL=gemini-3.6-flash

	# Profile image uploads
	CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
	CLOUDINARY_API_KEY=your_cloudinary_api_key
	CLOUDINARY_API_SECRET=your_cloudinary_api_secret

	# Razorpay subscriptions
	RAZORPAY_KEY_ID=your_razorpay_key_id
	RAZORPAY_KEY_SECRET=your_razorpay_key_secret
	RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
	```

	OAuth, Cloudinary, Razorpay, email, and Gemini variables are only needed for the features that use them. Keep all secrets server-side and do not commit `.env.local`.

3. Start the development server:

	```bash
	npm run dev
	```

4. Open [http://localhost:3000](http://localhost:3000).

### Create the local database

The repository includes [database/local-setup.sql](database/local-setup.sql) with the complete local schema and starter data. First switch `.env.local` to your local MySQL settings:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_NAME=believa
```

Then run the SQL file from a MySQL client:

```bash
mysql -u root -p < database/local-setup.sql
mysql -u root -p believa < database/quiz-seed.sql
```

The scripts create the `believa` database if needed and can be run more than once. They create users, scripture content, chapters, quizzes, saved chapters, progress, Naam Jaap stats, chat usage, contact and feedback records, ratings, subscription plans, subscriptions, and payment logs. The quiz seed adds extra Bhagavad Gita and Ramayan questions without duplicating existing rows. They do not create a login account; register through `/register` after starting the app.

## Routes

| Area | Routes |
| --- | --- |
| Authentication | `/login`, `/register`, `/forgot-password`, `/new-password` |
| User experience | `/`, `/library`, `/aiguide`, `/naam-jaap`, `/profile` |
| Library | `/library/:id`, `/library/saved`, `/library/quiz/:id` |
| Subscriptions | `/subscription-plan` |
| Administration | `/admin` and the admin management pages |
| API | `/api/auth`, `/api/library`, `/api/chat`, `/api/quiz`, `/api/subscribe`, `/api/upload`, and related routes |

User and admin pages require an appropriate authenticated session. The home screen also supports guest mode where enabled by the application.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Report that automated tests are not configured yet |

## Production deployment

Deploy the app to a platform that supports Next.js server workloads:

1. Configure every required environment variable in the hosting provider.
2. Configure OAuth callback URLs and Razorpay webhook URLs for the production domain.
3. Run `npm run build` during deployment.
4. Start the application with `npm run start`.

## Current status

Bodh is a private application. The `npm run test` script is currently a placeholder, so use `npm run lint` and a production build as the available automated checks.
