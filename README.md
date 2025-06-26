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

### Running with Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/StyleHub.git

# Navigate to project directory
cd StyleHub

# Build and start containers
docker-compose up --build

# The application will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
