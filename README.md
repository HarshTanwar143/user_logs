# Reqres User Management Application

This project is a React application that integrates with the Reqres API for user authentication and management. It provides a clean interface for viewing, editing, and deleting user accounts.

## Features

- **Authentication System**: Login with token-based authentication  
- **User Management**: List, edit, and delete users  
- **Search Functionality**: Filter users by name or email  
- **Pagination**: Navigate through multiple pages of users  
- **Responsive Design**: Works on both desktop and mobile devices  
- **Client-side Caching**: Persists edited user data across the application  

## Prerequisites

- Node.js (v14+)
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd user_logs
```

### 2. Install dependencies
```bash
# Install node-modulus
npm i

# Install required dependencies
npm install react react-dom react-router-dom axios

# Install Tailwind CSS and its dependencies
npm install tailwindcss @tailwindcss/vite

# Configure the Vite plugin (vite.config.js)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})

# Import tailwind class in index.css file
@import "tailwindcss";
```

### 3. Start the development server
```bash
npm run dev
```
The application will be available at http://localhost:5173


## Project Structure
![Screenshot (1563)](https://github.com/user-attachments/assets/77443380-823c-45b2-821c-ae82a2689261)



## Usage

1. **Login**: Use the credentials below to log in:  
   - Email: `eve.holt@reqres.in`  
   - Password: `cityslicka`

2. **View Users**: Browse the paginated list of users

3. **Search**: Use the search bar to filter users

4. **Edit User**: Click the "Edit" button on a user card to modify their details

5. **Delete User**: Click the "Delete" button to remove a user

## API Information

This application uses the [Reqres API](https://reqres.in/) which is a hosted REST API that simulates real application scenarios. Key points to note:

- The API is stateless and does not actually save changes persistently  
- User edits and deletions are simulated successfully but don't persist on the server  
- The application implements client-side caching to maintain edited data during the session

## Technical Considerations

### Authentication

- Authentication tokens are stored in `localStorage` for persistence across page refreshes  
- Protected routes redirect to login if no token is present

### State Management

- React Context is used for global state management  
- `UserContext` maintains a cache of edited users to preserve changes

### Error Handling

- API errors are gracefully caught and displayed to the user  
- Form validation ensures data integrity

### Mock API Limitations

- The Reqres API simulates responses but doesn't persist changes  
- Our client-side cache implementation creates the illusion of persistent updates  
- In a production environment, you would connect to a real API that saves changes
