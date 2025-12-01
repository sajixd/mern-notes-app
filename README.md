# 📝 MERN Notes App

A beautiful, fully responsive notes application with secure authentication and modern UI. Built with the MERN stack.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user signup and login
- 👤 **Personal Notes** - Each user has their own private notes
- 🎨 **Beautiful UI** - Modern design with smooth animations
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast & Smooth** - Built with Vite and optimized performance
- 💾 **Full CRUD** - Create, read, update, and delete notes
- 🎪 **Particle Effects** - Dynamic background particles

## 🚀 Tech Stack

### Frontend
- React with Vite
- Framer Motion for animations
- Axios for API calls
- JWT decode for authentication

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Setup Instructions

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd mern-notes-app
```

**2. Backend Setup**
```bash
# Install backend dependencies
npm install

# Create environment file
cd server
touch .env
```

Add to `server/.env`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

**3. Frontend Setup**
```bash
cd ../client
npm install

# Create environment file
touch .env
```

Add to `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

**4. Run the Application**
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:5173`

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Notes (Protected)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🚀 Deployment

### Backend Deployment (Render/Railway/Vercel)
1. Create new project
2. Set environment variables: `MONGODB_URI`, `JWT_SECRET`
3. Deploy from root directory

### Frontend Deployment (Vercel/Netlify)
1. Create new project from `client` folder
2. Set environment variable: `VITE_API_URL=https://your-backend-url.com`
3. Deploy

> **Note**: When deploying, make sure to update the `allowedOrigins` in `server/server.js` to include your deployed frontend URL.

## 📖 Usage

1. **Sign Up** - Create a new account
2. **Log In** - Access your personal notes
3. **Add Notes** - Click the + button to create a note
4. **Edit Notes** - Click on any note to update it
5. **Delete Notes** - Remove notes you no longer need
6. **Theme Toggle** - Switch between dark and light mode

## 👨‍💻 Author

**Sajid Ahmed**

---

Made with ❤️ using the MERN Stack
