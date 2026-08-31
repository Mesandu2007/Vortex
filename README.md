
# University Voting System

A full-stack university election and voting system built using **Spring Boot, Next.js, MySQL, Spring Security, JWT, and Google OAuth**.

The system allows administrators to create and manage elections and candidates, while students can securely join elections using an access code and cast a single vote.

---

## 🚀 Features

### 👨‍💼 Admin

- Admin login with email and password
- Admin accounts created through a Spring Boot seeder
- Admin dashboard
- Create, view, update, and delete elections
- Manage election status
- Generate and manage election access codes
- Add, update, and delete candidates
- View election participants
- View users who have voted
- View election statistics
- Admin-specific data isolation

### 👨‍🎓 Student

- Google OAuth authentication
- University email restriction using `@iit.ac.lk`
- Student dashboard
- View joined elections
- View active and completed elections
- Join an election using an access code
- View election details
- View candidate information
- View candidate biography and manifesto
- Select a candidate and cast a vote
- Prevent duplicate voting
- View personal voting status

---

# 🔐 Authentication

The application uses **JWT-based authentication** with separate roles for administrators and students.

## Student Authentication

Students authenticate using their university Google account.

```text
Google Login
     ↓
Google ID Token
     ↓
Spring Boot Backend
     ↓
GoogleTokenService
     ↓
Verify Google Account
     ↓
Check University Email
     ↓
Create / Find USER
     ↓
Generate USER JWT
````

Students must use an approved university email address.

## Admin Authentication

Admin accounts are **not publicly registered**.

They are created by the backend using the `AdminSeeder`.

```text
Spring Boot Startup
       ↓
AdminSeeder
       ↓
Check if admin exists
       ↓
Create admin if missing
       ↓
Admin Login
       ↓
Generate ADMIN JWT
```

There is no public admin registration endpoint.

## JWT Roles

The system uses:

```text
USER
ADMIN
```

The frontend stores their tokens separately:

```text
usertoken
admintoken
```

Protected API requests use:

```http
Authorization: Bearer <JWT>
```

---

# 🗳️ Voting Flow

The student voting process is:

```text
Google Login
      ↓
Student Dashboard
      ↓
Join Election
      ↓
Enter Election Access Code
      ↓
Backend Validates Access Code
      ↓
Election Details + Candidates
      ↓
Select Candidate
      ↓
Submit Vote
      ↓
Backend Validates Vote
      ↓
Vote Saved
```

A student can vote **only once per election**.

Duplicate voting is prevented using multiple layers:

```text
Frontend
   +
Backend validation
   +
Database unique constraint
```

The `votes` table uses:

```text
user_id + election_id
```

as a unique combination.

---

# 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       Next.js Frontend      │
│                             │
│   Admin UI + Student UI     │
└──────────────┬──────────────┘
               │
          REST API + JWT
               │
               ▼
┌─────────────────────────────┐
│      Spring Boot Backend    │
│                             │
│ Controllers                 │
│ Services                    │
│ Repositories                │
│ DTOs                        │
│ Security                    │
│ JWT                         │
│ GoogleTokenService          │
│ AdminSeeder                 │
└──────────────┬──────────────┘
               │
              JPA
               │
               ▼
┌─────────────────────────────┐
│        MySQL Database       │
└─────────────────────────────┘
```

---

# 📁 Project Structure

```text
V3/
│
├── Backend/
│   │
│   ├── src/
│   │   │
│   │   ├── main/
│   │   │   │
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── example/
│   │   │   │           └── Backend/
│   │   │   │
│   │   │   │               ├── BackendApplication.java
│   │   │   │               │
│   │   │   │               ├── config/
│   │   │   │               │   └── AdminSeeder.java
│   │   │   │               │
│   │   │   │               ├── controller/
│   │   │   │               │   ├── AuthController.java
│   │   │   │               │   ├── ElectionController.java
│   │   │   │               │   ├── UserController.java
│   │   │   │               │   ├── CandidateController.java
│   │   │   │               │   └── VoteController.java
│   │   │   │               │
│   │   │   │               ├── service/
│   │   │   │               │   ├── AuthService.java
│   │   │   │               │   ├── ElectionService.java
│   │   │   │               │   ├── UserService.java
│   │   │   │               │   ├── CandidateService.java
│   │   │   │               │   ├── VoteService.java
│   │   │   │               │   └── GoogleTokenService.java
│   │   │   │               │
│   │   │   │               ├── repository/
│   │   │   │               │   ├── AdminRepository.java
│   │   │   │               │   ├── UserRepository.java
│   │   │   │               │   ├── ElectionRepository.java
│   │   │   │               │   ├── CandidateRepository.java
│   │   │   │               │   ├── VoteRepository.java
│   │   │   │               │   └── ElectionParticipantRepository.java
│   │   │   │               │
│   │   │   │               ├── model/
│   │   │   │               │   ├── Admin.java
│   │   │   │               │   ├── User.java
│   │   │   │               │   ├── Election.java
│   │   │   │               │   ├── Candidate.java
│   │   │   │               │   ├── Vote.java
│   │   │   │               │   ├── ElectionParticipant.java
│   │   │   │               │   ├── ElectionStatus.java
│   │   │   │               │   └── Role.java
│   │   │   │               │
│   │   │   │               ├── dto/
│   │   │   │               │   ├── AuthDTO.java
│   │   │   │               │   ├── ElectionDTO.java
│   │   │   │               │   ├── UserDashboardDTO.java
│   │   │   │               │   └── VoteDTO.java
│   │   │   │               │
│   │   │   │               └── security/
│   │   │   │                   ├── JwtAuthenticationFilter.java
│   │   │   │                   ├── JwtService.java
│   │   │   │                   └── SecurityConfig.java
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   │
│   ├── app/
│   │   │
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   └── (protected)/
│   │   │       ├── layout.jsx
│   │   │       ├── dashboard/
│   │   │       │   └── page.jsx
│   │   │       └── elections/
│   │   │           ├── page.jsx
│   │   │           └── [id]/
│   │   │               └── page.jsx
│   │   │
│   │   ├── user/
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   │
│   │   │   └── (protected)/
│   │   │       ├── layout.jsx
│   │   │       ├── dashboard/
│   │   │       │   └── page.jsx
│   │   │       └── join-election/
│   │   │           └── page.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── UserNavbar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── admin/
│   │   │   │   ├── authentication.js
│   │   │   │   ├── electioncrud.js
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── user/
│   │   │       ├── googleAuth.js
│   │   │       └── userService.js
│   │   │
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── ...
│
└── .gitignore
```

---

# 🛠️ Technologies Used

## Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* MySQL
* JWT
* BCrypt
* Google OAuth
* REST API

## Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS
* Axios
* Google OAuth

---

# 🔌 Main API Endpoints

## Authentication

```text
POST /api/auth/login/google
POST /api/auth/login/admin
```

## User

```text
GET  /api/user/profile
GET  /api/user/dashboard
POST /api/elections/join
```

## Admin

```text
GET    /api/elections
POST   /api/elections
GET    /api/elections/{id}
PUT    /api/elections/{id}
DELETE /api/elections/{id}
```

## Voting

```text
POST /api/votes/election/{electionId}
```

---

# 🗄️ Database Relationships

```text
Admin
  │
  └── Election
          │
          ├── Candidate
          │
          ├── ElectionParticipant
          │        │
          │        └── User
          │
          └── Vote
                   │
                   ├── User
                   └── Candidate
```

### Election Participation

```text
User
  ↓
ElectionParticipant
  ↓
User has joined an election
```

### Voting

```text
User
  ↓
Vote
  ├── Election
  └── Candidate
```

---

# ⚙️ Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd V3
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Configure your MySQL database and application settings in:

```text
src/main/resources/application.properties
```

The local configuration may contain sensitive information such as:

* Database credentials
* JWT secret
* Google credentials
* Admin seeder credentials

Do not commit these values to GitHub.

Run the backend on Windows:

```powershell
mvnw.cmd spring-boot:run
```

Or on Linux/macOS:

```bash
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

---

# 👨‍💼 Admin Seeder

The backend includes an `AdminSeeder` that creates the initial admin account automatically if the account does not already exist.

```text
Application starts
       ↓
AdminSeeder runs
       ↓
Check admin email
       ↓
Admin exists?
   ├── Yes → Do nothing
   └── No  → Create admin
```

The password is encoded using BCrypt before being stored.

There is no public admin registration endpoint.

---

# 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

# 🔒 Security

The application includes:

* JWT authentication
* Role-based authorization
* Google OAuth authentication
* BCrypt password hashing
* Admin-specific data isolation
* University email restrictions
* One-vote-per-user-per-election enforcement
* Database-level unique vote constraint
* Separate admin and user token storage
* Protected REST API endpoints

---

# 🧪 API Testing

The REST API can be tested using Postman.

Typical testing workflow:

```text
Admin Login
     ↓
Create Election
     ↓
Add Candidates
     ↓
Share Access Code
     ↓
Student Google Login
     ↓
Enter Access Code
     ↓
Join Election
     ↓
View Candidates
     ↓
Select Candidate
     ↓
Cast Vote
```

---

# 🔄 Application Flow

```text
                    UNIVERSITY VOTING SYSTEM


                         ┌───────────┐
                         │   Admin   │
                         └─────┬─────┘
                               │
                          Admin Login
                               │
                               ▼
                       ┌───────────────┐
                       │ Admin Dashboard│
                       └───────┬───────┘
                               │
                       Create Election
                               │
                         Add Candidates
                               │
                       Share Access Code
                               │
                               ▼
                      ──────────────────
                               │
                               ▼
                        ┌────────────┐
                        │  Student   │
                        └─────┬──────┘
                              │
                         Google Login
                              │
                              ▼
                      Student Dashboard
                              │
                        Join Election
                              │
                       Enter Access Code
                              │
                              ▼
                    Election + Candidates
                              │
                      Select Candidate
                              │
                              ▼
                         Cast Vote
                              │
                              ▼
                       Vote Validation
                              │
                              ▼
                         Vote Saved
```

---

# 🎯 Project Goals

The goal of this project is to provide a secure and easy-to-use digital voting platform for university elections.

The project demonstrates:

* Full-stack development
* REST API development
* Authentication and authorization
* JWT security
* Google OAuth
* Role-based access control
* CRUD operations
* Database relationships
* Election management
* Access-code-based election joining
* Voting validation
* One-vote-per-user-per-election enforcement
* Frontend and backend integration

---

# 📌 Future Improvements

Possible future improvements include:

* Admin management interface
* Election result visualization
* Email notifications
* Election audit logs
* Refresh token authentication
* Deployment with Docker
* Cloud-hosted MySQL database
* Automated testing and CI/CD

---

## 📄 License

This project was developed as an  software engineering project

```
```
