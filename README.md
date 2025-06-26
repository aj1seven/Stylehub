# StyleHub — MERN E-commerce Platform

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue) 
![Docker](https://img.shields.io/badge/Docker-Containerized-green) 
![E-commerce](https://img.shields.io/badge/E--commerce-Platform-orange)

StyleHub is a full-stack, containerized e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a modern, responsive user interface and role-based functionality for customers, sellers, and is designed to scale with future admin capabilities.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

### User Roles and Capabilities

#### Customer
- User registration and login
- Browse products with filters and search
- Add to cart and checkout functionality
- Track and view order history
- Product reviews and ratings

#### Seller
- Seller registration and login
- Add, edit, and delete products
- View received orders
- Manage products via dashboard
- Sales analytics

#### Admin (Planned for Future)
- User and product management
- Monitor all orders
- Analytics and reporting
- Platform configuration

## Technology Stack

### Frontend
- React.js with Hooks
- Material UI (MUI) for styling
- React Router DOM for navigation
- Axios for API calls
- Redux for state management (optional)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- CORS for cross-origin requests
- dotenv for environment variables
- cookie-parser for handling cookies

### DevOps
- Docker for containerization
- Docker Compose for orchestration
- Nginx for frontend serving
- Render.com for deployment
- GitHub for version control

## Installation

### Prerequisites
- Docker (v20.10+ recommended)
- Docker Compose (v2.0+ recommended)
- Node.js (v16+ recommended) - for local development without Docker

##Runnig with Docker

```bash
# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (in another terminal)
cd frontend
npm install
npm start
```
##Configuration

Environment Variables
Create a .env file in the backend/ directory with the following variables:

```bash
PORT=5001
MONGODB_URI=mongodb://localhost:27017/stylehub
JWT_SECRET=your_strong_jwt_secret_here
COOKIE_SECURE=false # Set to true in production
```

##Deployment

###Backend Deployment(Render)

1.Log in to your Render account
2.Create a new Web Service and connect your backend GitHub repository
3.Select "Docker" as the environment
4.Add the required environment variables:
     • PORT
     • MONGODB_URL
     • JWT_SECRET
     • NODE_ENV=production
5.Deploy the Service

###Frontend Deployment(Render)

1.Create another Web Service for the frontend
2.Connect the frontend GitHub repository
3.Use the Dockerfile provided in the frontend/ directory
4.Configure Nginx settings as needed
5.Update the API base URL in frontend/src/api/axiosInstance.js:

```bash 
const instance = axios.create({
  baseURL: 'https://your-backend-service.onrender.com',
  withCredentials: true,
});
```

##Folder Structure

```bash
MERN-Ecommerce-Site/
├── backend/
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Authentication and other middlewares
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── index.js           # Main server file
│   ├── Dockerfile         # Backend Docker configuration
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store (if used)
│   │   ├── styles/        # Global styles
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   ├── Dockerfile         # Frontend Docker configuration
│   ├── .dockerignore      # Docker ignore file
│   └── nginx/             # Nginx configuration
├── docker-compose.yml     # Docker compose configuration
└── README.md             # Project documentation
```

##License

This project is licensed under the MIT License - see the LICENSE file for details.
      



