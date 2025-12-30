# PizzaCraft 🍕

PizzaCraft is a full-stack web application for managing a pizza ordering system. It includes features for customers to explore the menu, customize pizzas, and place orders, as well as admin functionalities for managing inventory, orders, and users.

---

## ✨ Features

### 👤 Customer Features:
- 🍽️ **Explore Menu**: Browse a variety of pizzas with customization options.
- 🎨 **Customize Pizzas**: Choose base, sauce, cheese, and veggies for your pizza.
- 🛒 **Cart Management**: Add, update, or remove pizzas from the cart.
- 💳 **Order Placement**: Place orders with Razorpay payment integration.
- 🔐 **User Authentication**: Register, log in, and manage your profile.
- 📦 **Order Tracking**: Track the status of your order (Order Received, In the Kitchen, Sent to Delivery).

### 🔧 Admin Features:
- 📊 **Inventory Management**: Add, update, and manage inventory items (bases, sauces, cheeses, veggies, meat).
- 📋 **Order Management**: View, update, and change order statuses.
- 👥 **User Management**: Manage user accounts and roles.
- ⚠️ **Low Stock Alerts**: Receive email notifications when any inventory item goes below a threshold value.
- 🔔 **Status Notifications**: Update pizza order statuses and sync them with customer dashboards.

---

## 🛠️ Tech Stack

### 🎨 Frontend:
- ⚛️ **React**: For building the user interface.
- ⚡ **Vite**: For fast development and build processes.
- 🧭 **React Router**: For navigation and routing.
- 🌐 **Axios**: For making HTTP requests.
- 🔔 **React Toastify**: For notifications.

### ⚙️ Backend:
- 💚 **Node.js**: For server-side logic.
- 🚀 **Express.js**: For building RESTful APIs.
- 🍃 **MongoDB**: For database management.
- 📦 **Mongoose**: For MongoDB object modeling.
- 💰 **Razorpay**: For payment integration.
- 📧 **Nodemailer**: For sending email notifications.
- ☁️ **Cloudinary**: For image storage and management.

---

## 🚀 Deployment

Deployed on **Vercel**.

🌐 **Visit the live website**: [https://thepizzacraft.vercel.app](https://thepizzacraft.vercel.app)

---

## 📥 Installation

### 📋 Prerequisites:
- ✅ Node.js and npm installed.
- ✅ MongoDB Atlas account.
- ✅ Cloudinary account (free tier available).
- ✅ Razorpay account for test mode.
- ✅ Email account (e.g., Gmail) for notifications.

---

## ⚙️ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 🔑 Create a .env file in the backend directory with the following variables:

```env
PORT=4000
MONGO_CONNECTION_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
BACKEND_URL=http://localhost:4000
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

```bash
# Start backend server
npm start
```

## 🎨 Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 🔑 Create a .env file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000
```

```bash
# Start the frontend development server
npm run dev
```

- 🌐 Open http://localhost:5173 in your browser to access the application.

## 📁 Project Structure
```bash
PizzaCraft/
├── backend/
│   ├── controllers/
|   ├── db/
|   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
|   ├── uploads/
|   ├── App.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
├── images/
└── README.md 
```
## 📖 Usage

- 👤 **Customer**: Register, verify email, login, explore menu, customize pizza, pay with Razorpay, track order status.

- 🔧 **Admin**: Login, manage inventory, monitor stock levels, update order statuses, receive low stock notifications.

## 🤝 Contributing
Contributions are welcome! 🎉
Feel free to fork the repository and create a pull request.

## 📄 License
This project is licensed under the MIT License.


## 👨‍💻 Author
Built with ❤️ by **Kaustav Das**