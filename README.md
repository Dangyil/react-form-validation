# React Form Validation - Full Stack Application

A full-stack web application built with React, Express, and MongoDB for form validation and CRUD operations.

## 🚀 Deployment Status

This project is currently **deployed and running in production**. 

## 📋 Tech Stack

**Frontend:**
- React 18+ with Vite
- ESLint for code quality
- Responsive design

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- Security: Helmet, CORS, Rate Limiting
- Password hashing with bcrypt

**Database:**
- MongoDB Atlas (Cloud)

## ✨ Features
- User management (CRUD operations)
- Form validation
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Security headers with Helmet
- Password encryption with bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB account (Atlas)

## 📁 Project Structure

```
react-form-validation/
├── src/                    # Frontend source
│   ├── App.jsx
│   ├── main.jsx
│   ├── api/               # API configuration
│   └── assets/
├── backend/
│   ├── index.js           # Express server
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── models/            # MongoDB schemas
│   └── package.json
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Security Features

- **Helmet.js** - Sets secure HTTP headers
- **CORS** - Whitelist approved origins
- **Rate Limiting** - Prevents abuse (100 req/15min)
- **Password Encryption** - Bcrypt hashing
- **Environment Variables** - Credentials never hardcoded
- **MongoDB IP Whitelist** - Restricted database access
- **Input Validation** - Sanitization on routes

## 🚀 Deployment

This project is deployed and accessible in production. The application includes:
- Automated CORS configuration for deployed domain
- Environment-specific settings
- Security headers and rate limiting enabled
- MongoDB Atlas for persistent database storage

## 📄 License

ISC

## 👤 Author

David Dangyil

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
