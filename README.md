# StyleHub — MERN E-commerce Platform

StyleHub is a full-stack, containerized e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a modern, responsive user interface and role-based functionality for customers, sellers, and is designed to scale with future admin capabilities. The application is fully Dockerized for efficient deployment.

---

## Features

### User Roles and Capabilities

| Role     | Features                                                                 |
|----------|--------------------------------------------------------------------------|
| Customer | - User registration and login<br> - Browse products<br> - Add to cart and checkout<br> - Track and view order history |
| Seller   | - Seller registration and login<br> - Add, edit, and delete products<br> - View received orders<br> - Manage products via dashboard |
| Admin*   | - User and product management<br> - Monitor orders<br> - Analytics and reporting (*planned for future) |

---

## Technology Stack

| Layer     | Technologies                                                             |
|-----------|--------------------------------------------------------------------------|
| Frontend  | React.js, Material UI (MUI), React Router DOM, Axios                     |
| Backend   | Node.js, Express.js, MongoDB, Mongoose, JWT, CORS, dotenv, cookie-parser |
| DevOps    | Docker, Docker Compose, Render.com, GitHub                               |

---

## Folder Structure

```bash
MERN-Ecommerce-Site/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx/
├── docker-compose.yml
└── README.md


---

## Environment Variables

To run the backend server, create a `.env` file inside the `backend/` directory and define the following environment variables:


- `PORT`: The port on which the backend server will run (default: 5001)
- `MONGODB_URI`: Your MongoDB database connection string
- `JWT_SECRET`: A secret key used for signing JWT tokens

Ensure this file is **not** committed to version control for security purposes.



---

## Running Locally with Docker

### Prerequisites
- Docker installed
- Docker Compose installed

### Start the application
```bash
docker-compose up --build


---

## Deployment

### Backend Deployment (Render)

1. Log in to your [Render](https://render.com/) account.
2. Create a new Web Service and connect your backend GitHub repository.
3. Select "Docker" as the environment.
4. Add the required environment variables in the Render dashboard:
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
5. Deploy the service and wait for the build to complete.

### Frontend Deployment (Render)

1. Create another Web Service for the frontend and connect the frontend repository.
2. Use the Dockerfile provided in the `frontend/` directory.
3. Ensure the frontend is set up to serve using Nginx.
4. Update the API base URL in `frontend/src/api/axiosInstance.js` to point to the deployed backend URL:

```js
// axiosInstance.js
const instance = axios.create({
  baseURL: 'https://your-backend-service.onrender.com',
  withCredentials: true,
});




