# React + Vite
```md
# FullStack E-commerce Application

This is a FullStack E-commerce application built using **React**, **Redux**, **Node.js**, **Express**, and **MongoDB**. The project includes a fully functional frontend and backend, with features like product browsing, cart management, user authentication, and more.

---

## Project Architecture

### Folder Structure

#### Backend

Backend/
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Backend dependencies and scripts
├── public/                  # Static assets
├── src/
│   ├── app.js               # Express app configuration
│   ├── aws.config.js        # AWS S3 configuration
│   ├── index.js             # Entry point for the backend
│   ├── addDataToDatabase/   # Scripts to populate database
│   │   ├── additionOfCategories.js
│   │   ├── additionOfProducts.js
│   ├── assets/              # Static assets for backend
│   ├── controllers/         # API controllers
│   │   ├── cart.controller.js
│   │   ├── product.controller.js
│   │   ├── user.controller.js
│   ├── db/                  # Database connection logic
│   ├── imageData/           # Image-related data
│   ├── middlewares/         # Middleware for authentication, error handling, etc.
│   ├── models/              # Mongoose models
│   │   ├── User.model.js
│   │   ├── Product.model.js
│   │   ├── Cart.model.js
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions


#### Frontend

Frontend/
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Frontend dependencies and scripts
├── README.md                # Project documentation
├── vite.config.js           # Vite configuration
├── public/                  # Static assets
│   ├── Landing Page - Picture.jpeg
│   ├── vite.svg
├── src/
│   ├── App.css              # Global styles
│   ├── App.jsx              # Main React component
│   ├── cartSlice.js         # Redux slice for cart management
│   ├── filterSlice.js       # Redux slice for filters
│   ├── index.css            # Global CSS
│   ├── main.jsx             # Entry point for React
│   ├── components/          # React components
│   │   ├── LandingHomePage/
│   │   │   ├── HeaderBar.jsx
│   │   │   ├── CategoriesHeader.jsx
│   │   │   ├── MainLandingPage.jsx
│   │   ├── ProductPages/
│   │   │   ├── MainProductPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   ├── Cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── cartOperations.js
│   │   ├── RegisterLoginPage/
│   │   │   ├── RegisterLoginPage.jsx
│   ├── assets/              # Static assets for frontend
│   ├── demotext.txt         # Demo text for testing


---

## Features

### Frontend
- **React** for building the user interface.
- **Redux** for state management (e.g., cart, filters).
- **React Router** for navigation.
- **Bootstrap** for responsive design.
- **Axios** for API calls.

### Backend
- **Node.js** and **Express** for server-side logic.
- **MongoDB** for database management.
- **Mongoose** for schema modeling.
- **JWT** for user authentication.
- **AWS S3** for image storage.

---

## Installation and Execution

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- AWS account (for S3 bucket configuration)

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```env
   PORT=8000
   MONGO_URI=<your_mongo_connection_string>
   ACCESS_TOKEN_SECRET=<your_access_token_secret>
   ACCESS_TOKEN_EXPIRY=1h
   AWS_ACCESS_KEY_ID=<your_aws_access_key>
   AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
   AWS_BUCKET_NAME=<your_s3_bucket_name>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend` directory with the following variables:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the frontend.
2. Use the application to browse products, add items to the cart, and manage your orders.
3. The backend API is available at `http://localhost:8000/api/v1`.

---

## API Endpoints

### User
- `POST /api/v1/user/register` - Register a new user.
- `POST /api/v1/user/login` - Log in a user.

### Products
- `GET /api/v1/products` - Fetch all products.
- `GET /api/v1/products/:id` - Fetch a single product by ID.

### Cart
- `POST /api/v1/cart/addToCart` - Add an item to the cart.
- `POST /api/v1/cart/removeFromCart` - Remove an item from the cart.
- `POST /api/v1/cart/updateQuantity` - Update the quantity of an item in the cart.
- `GET /api/v1/cart/viewCart` - View the user's cart.

---

## Technologies Used

### Frontend
- React
- Redux
- React Router
- Axios
- Bootstrap

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- AWS S3

---

## Future Enhancements
- Add payment gateway integration (e.g., Stripe).
- Implement product reviews and ratings.
- Add order history and tracking.
- Improve UI/UX with animations and transitions.

---

This README.md provides a comprehensive overview of the project, including its architecture, setup instructions, and usage details.
