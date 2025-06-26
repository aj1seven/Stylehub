# StyleHub - MERN E-commerce Platform

StyleHub is a fully-featured e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). It provides a clean, responsive user interface, role-based features for customers and sellers, and is containerized with Docker for easy deployment.

## Features

### Customer
- Register/Login authentication
- Browse featured and latest products
- Add products to cart and checkout
- Order tracking and history

### Seller
- Seller authentication and dashboard
- Add, update, and delete products
- View orders received

### Admin (optional for future scaling)
- User and product management
- Order oversight and analytics (future-ready)

---

## Technologies Used

### Frontend
- React.js
- MUI (Material UI) for design
- React Router DOM
- Axios for API requests

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT-based authentication
- CORS, dotenv, and cookie-parser

### DevOps & Deployment
- Docker & Docker Compose
- Render.com for deployment
- GitHub for source control

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
