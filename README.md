# Quick Ryde

A full-stack application that replicates the core functionalities of the Uber platform, including user authentication, ride booking, real-time location tracking, and more.

## Features

- User authentication (Sign up, Login, Logout)
- Book a ride with pickup and drop-off locations
- Real-time location tracking using maps
- Driver and rider modes
- Payment integration
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Updates**: Socket.IO
- **Maps Integration**: Google Maps API

## Installation and Setup

1. Clone the repository:
2. Install dependencies for both frontend and backend
   cd frontend
   npm install
   cd ../backend
   npm install
3. Set up environment variables:
   Create a .env file in the backend directory.
   Add the following variables:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
4. Start the development servers:
   Backend:
   cd backend
   npm run dev
   Frontend:
   cd frontend
   npm start
5. Open the application in your browser:
   http://localhost:3000
   uberClone/
   ├── frontend/ # React application
   ├── backend/ # Node.js API(For Further backend documentation)
   └── README.md # Project documentation
