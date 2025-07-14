# Social Media Platform

A full-stack mini social media platform with user authentication, profiles, posts, comments, likes, and follows.

## Project Structure

```
Social-Media-Platform/
├── client/         # React frontend
├── server/         # Express backend
├── database/
│   └── schema.sql  # SQL schema
└── README.md       # Setup instructions
```

## Backend Setup

1. `cd server`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your MySQL credentials and JWT secret.
4. Import `../database/schema.sql` into your MySQL server.
5. `npm run dev` (or `node server.js`)

## Frontend Setup

1. `cd client`
2. `npm install`
3. `npm start`

## Features

- User registration/login (JWT)
- Profile view/edit
- CRUD posts (text/image)
- Comments (CRUD)
- Like/unlike posts/comments
- Follow/unfollow users
- RESTful API
- Responsive UI

## Security

- Passwords hashed with bcrypt
- JWT for authentication
- Input validation
- CORS enabled

## Folder Structure

See project root for details. 