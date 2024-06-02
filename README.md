# Express.js API Server

- live link: https://antopolis-task-server.vercel.app

This is an Express.js server project that handles various API endpoints. It includes functionality for fetching categories, adding new categories, and serves data to a client application. The server also uses `dotenv` for environment variables and `nodemon` for automatic server restarts during development.

## Features

- **GET /category**: Fetch all categories.
- **POST /category**: Add a new category.
- **Environment Variables**: Uses `dotenv` to manage environment variables.
- **Development Server**: Uses `nodemon` for hot reloading during development.

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **dotenv**: Module to load environment variables from a `.env` file.
- **nodemon**: Utility that monitors for changes in the source code and automatically restarts the server.

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- MongoDB (Ensure you have a running MongoDB instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AhsanPhero2022/antopolis-task-server.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/your-database
   PORT=5000
   ```

### Running the Server

1. Start the development server with `nodemon`:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. The server will start on the port specified in your `.env` file. By default, it runs on `http://localhost:5000`.

### API Endpoints

#### Get All Categories

- **Endpoint**: `GET /category`
- **Description**: Fetches all categories from the database.
- **Response**: JSON array of categories.

Example:

```bash
curl http://localhost:5000/category
```
