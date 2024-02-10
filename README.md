# Todo App

## Description

This repository contains two main directories:

1. **`backend`**: The backend directory houses the Node.js and Express.js server.
2. **`frontend`**: Inside the frontend directory, you'll find the Next.js 14 frontend code.

## Installation

1. **Clone the Repository**: Begin by cloning this repository to your local machine.
2. **Install Dependencies**:
   - Navigate to the `backend` directory and install the required dependencies for the backend.
   - Similarly, go to the `frontend` directory and install the necessary dependencies for the frontend.
3. **Start Servers**:
   - Run the backend server.
   - Launch the frontend server.

## Usage

- Access the frontend at http://localhost:3000.
- Utilize the API endpoints provided by the backend for managing your tasks.

## Backend Details

The backend is a crucial part of our application, responsible for handling data and authentication. Here are the specifics:

1. **Database Interaction**:

   - We use a **PostgreSQL database** to store task-related information.
   - **TypeORM** simplifies our interaction with the database, providing an elegant and efficient way to manage models and queries.

2. **Authentication and Security**:

   - **Passport.js** is our go-to library for authentication. It allows users to sign up, log in, and log out securely.
   - We implement **JWT (JSON Web Tokens)** for secure communication between the frontend and backend.
   - Authorization checks ensure that only authorized users can access certain routes.

3. **Endpoints**:
   - Our backend exposes various endpoints for creating, updating, and deleting tasks.
   - Authentication endpoints handle user registration, login, and logout.

## Frontend Details

The frontend is built using **Next.js 14**, offering a seamless user experience. Here's what you need to know:

1. **Styling with Tailwind CSS**:

   - We've used **Tailwind CSS** to style our user interface. Tailwind's utility classes make it easy to create responsive and visually appealing designs.

2. **Authentication and Authorization**:
   - Users can sign up, log in, and log out securely.
   - JWT tokens ensure that only authenticated users can access protected routes.
   - Authorization checks are in place to restrict access based on user roles.

## Technologies Used

- **Node.js**
- **Express.js**
- **Next.js 14**

## Contributors

- Mustafa-Zahedi

## License

This project is licensed under the **MIT License**. You can find more details in the LICENSE.md file.

Feel free to explore the code and start managing your tasks! 🚀📝
