# Backend system for event management

## Overview

This is a simple RESTful API built with Node.js and Express.js that allows you to manage virtual events, user registration, authentication, event scheduling, and participant registrations.

---

## Setup Instructions

1. Clone the repository or download the project folder:

   git clone https://github.com/Rishik3001/backend-system.git
   cd backend-system

2. Install dependencies:

   npm install

3. Start the server:

   node app.js

   The server will run on: http://localhost:3000

---

## API Endpoints

### Register a User

- Method: POST
- URL: /register
- Body Example:
  {
  "name": "Alice Organizer",
  "email": "alice@example.com",
  "password": "Password123",
  "role": "organizer"
}

### Login
-Method: POST
-URL: /login
-Body Example:
{
  "email": "alice@example.com",
  "password": "Password123"
}

### Get All Events
-Method: GET
-URL: /events
-Headers:
-Authorization: Bearer <token>

### Get Event by ID
-Method: GET
-URL: /events/:id
-Headers:
-Authorization: Bearer <token>

### Create Event (Organizer)
-Method: POST
-URL: /events
-Headers:
-Authorization: Bearer <organizer_token>
-Body Example:
{
  "title": "AI Summit 2025",
  "description": "Latest AI innovations",
  "date": "2025-11-02",
  "time": "09:30"
}

### Update Event (Organizer & Owner)
-Method: PUT
-URL: /events/:id
-Headers:
-Authorization: Bearer <organizer_token>
-Body Example:
{
  "description": "Updated AI Summit details",
  "time": "10:00"
}

### Delete Event (Organizer & Owner)
-Method: DELETE
-URL: /events/:id
-Headers:
-Authorization: Bearer <organizer_token>

### Register for an Event
-Method: POST
-URL: /events/:id/register
-Headers:
-Authorization: Bearer <token>


## How to Test the API

You can test the API using:

### Postman

1. Open Postman and create a new request.
2. Set the method and URL (e.g. POST http://localhost:3000/register).
3. For POST and PUT, use the Body > raw > JSON format.
4. Add the Authorization: Bearer <token> header for protected routes.
5. Click Send to see the response.

### curl (command line)

# Register a new user
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"name":"Alice Organizer","email":"alice@example.com","password":"Password123","role":"organizer"}'

# Login to get token
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email":"alice@example.com","password":"Password123"}'

# Get all events (replace <token> with actual JWT)
curl -H "Authorization: Bearer <token>" http://localhost:3000/events

# Create an event (organizer only)
curl -X POST http://localhost:3000/events \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"title":"AI Summit 2025","description":"Latest AI innovations","date":"2025-11-02","time":"09:30"}'

# Register for event
curl -X POST http://localhost:3000/events/1691834000000/register \
-H "Authorization: Bearer <token>"
