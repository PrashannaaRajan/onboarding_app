# Custom Onboarding Flow

This app allows admins to dynamically configure the user onboarding experience via a drag-and-drop-style section layout, while users proceed through a step-by-step wizard-style flow.

LIVE DEMO => https://d34ki3igfzt3k2.cloudfront.net/
---

## 🔧 Tech Stack

**Frontend:**
- React (with TypeScript)
- React Router
- Material UI (MUI) for UI components
- Axios for API requests
- Vite for fast development

**Backend:**
- Node.js + Express (with TypeScript)
- PostgreSQL (via `pg` package)
- JWT for session tokens
- bcrypt for password hashing

**Deployment**
🔧 Backend
The backend API is deployed using AWS App Runner, connected to a PostgreSQL database hosted on Amazon Lightsail. It runs as a Docker container pulled from a private ECR repository.

🌐 Frontend
The frontend React app is hosted on AWS S3 and distributed globally using CloudFront. HTTPS is enabled via Cloudfront.

---

## 🧠 Key Features

### User Flow
- Multi-page onboarding with sections like:
  - Email + password (Login)
  - About Me
  - Birthdate
  - Address (street, city, state, zip)
- JWT-based session handling using `sessionStorage`
- Automatically continues from where user left off

### Admin Flow
- Admin page (`/admin`) to assign which components appear on which sections (Section 1 or 2)
- Live configuration of component-to-section mapping
- Validation: each section must have at least one component

### Data Table
- `/data` route shows a live readout of all submitted user data
- Automatically updates as new users onboard
