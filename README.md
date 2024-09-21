
# EKSIPNOS EDU - Educational Consultancy Service

## Project Overview

EKSIPNOS EDU is a web-based application designed to streamline educational consultancy services. The platform offers a user-friendly interface where students and parents can inquire about educational programs, institutions, and career guidance. The admin side allows the consultancy to manage enquiries, track user interactions, and view key metrics via the admin dashboard.

## Features

- **User-Facing Features:**
  - Browse information on educational services and programs.
  - Submit enquiries regarding institutions and courses.
  - Receive prompt responses to your queries.

- **Admin Features:**
  - Manage enquiries submitted by users.
  - View dashboard metrics like total enquiries, user activity, and system health.
  - Real-time data on user interactions and enquiries.

## Tech Stack

This project was built using the following technologies:

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering.
  - [TypeScript](https://www.typescriptlang.org/) - JavaScript with type definitions for improved code quality and scalability.

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment for building scalable server-side applications.
  - [Express.js](https://expressjs.com/) - Web framework for Node.js for handling routes and APIs.

- **Database:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing enquiries and dashboard data.

## Project Setup

### Prerequisites

Ensure you have the following tools installed:

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ujwal-Gaonkar/EKSIPNOS_EDU.git
   ```

2. **Navigate to the project folder and install dependencies for both frontend and backend:**

   ```bash
   cd EKSIPNOS_EDU

   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` folder with the following content:

   ```env
   MONGO_URI=<your_mongo_db_uri>
   PORT=5000
   ```

4. **Start the project:**

   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend Next.js app
   cd ../client
   npm run dev
   ```

5. **Open the application:**

   The application should now be running at [http://localhost:3000](http://localhost:3000).

## API Endpoints

- **GET /api/enquiries** - Fetch all enquiries.
- **POST /api/enquiries** - Submit a new enquiry.
- **GET /api/admin/dashboard** - Fetch data for the admin dashboard.

## Contributing

Feel free to submit issues or pull requests to improve the platform. All contributions are welcome!

## Social Media

- **GitHub:** [Ujwal-Gaonkar](https://github.com/Ujwal-Gaonkar)
- **LinkedIn:** [Ujwal-Gaonkar](https://www.linkedin.com/in/ujwal-gaonkar-6746aa1a7/)
- **Twitter:** [Ujwal_Gaonkar](https://x.com/UjwalGaonkar2)
```

This version combines all sections seamlessly into one document. Let me know if you need any further changes!
