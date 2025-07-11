# Custom Onboarding Flow

This app allows admins to dynamically configure the user onboarding experience via a section layout, while users proceed through a step-by-step wizard-style flow.

LIVE DEMO => https://1.d1in00zmbxid69.amplifyapp.com/
---

## 🔧 Tech Stack

**Frontend:**
- React (with TypeScript)
- React Router
- Material UI (MUI) for UI components
- Axios for API requests
- Vite for fast development
- React thunk for state management

**Backend:**
- Node.js + Express (with TypeScript)
- PostgreSQL for database
- Sequelize ORM
- JWT for session tokens
- bcrypt for password hashing

**Deployment**
🔧 Backend
The backend API is deployed using AWS App Runner, connected to a PostgreSQL database hosted on Amazon Lightsail. It runs as a Docker container pulled from a private ECR repository.

🌐 Frontend
The frontend React app is hosted on AWS S3 and hosted via AWS Amplify. HTTPS is enabled.

---

<img width="791" height="441" alt="image" src="https://github.com/user-attachments/assets/9ce89f02-275a-4cca-8089-3a58e2109bce" />


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
- change the number sections needed
- Live configuration of component-to-section mapping
- Validation: each section must have at least one component

### Data Table
- `/data` route shows a live readout of all submitted user data
- Automatically updates as new users onboard
