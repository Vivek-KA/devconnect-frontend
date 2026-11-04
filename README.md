# DevConnect

A full-stack community platform where developers sign up, publish posts, comment, and like. Built to practice real-world full-stack architecture: authentication, relational data, protected routes, and cloud deployment.

**Live demo:** https://devconnect-frontend-one.vercel.app
**Backend repo:** https://github.com/Vivek-KA/devconnect-backend

> The backend runs on a free hosting plan, so the first request after a quiet period can take about a minute while it wakes up.

## Screenshots

(add 2-3 images here)

## Features

- Sign up and log in with JWT authentication
- Create, edit, and delete your own posts
- Comment on posts and delete your own comments
- Like and unlike posts, with a live like count
- Protected routes: logged-out users are redirected to login
- Automatic logout when the token expires

## Tech stack

- **Frontend:** React (Vite), React Router, Axios, Context API
- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
- **Database:** PostgreSQL (Neon)
- **Deployment:** Vercel (frontend), Render with Docker (backend)

## How it works

React (Vercel) calls a Spring Boot REST API (Render), which reads and writes PostgreSQL (Neon). After login, the server returns a signed JWT. An Axios interceptor attaches it to every request, and the backend verifies it on each call.

## Run locally

```bash
git clone https://github.com/Vivek-KA/devconnect-frontend.git
cd devconnect-frontend
npm install
npm run dev
```

The app calls `http://localhost:8080/api` by default. To use a different backend, set `VITE_API_URL`.

## Future improvements

- Comment editing, pagination, and search
- Image upload for posts
- Input validation and automated tests
