import { config } from 'dotenv';
config();
import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
import PizzaRouter from './routes/pizza.route.js';
import UserRouter from './routes/user.route.js';
import InventoryRouter from './routes/inventories.route.js';
import OrderRouter from './routes/order.route.js';
import contactRouter from './routes/contact.routes.js';
import RazorpayRouter from './routes/razorpay.route.js';

app.use(cookieParser());
connectDB();

// CORS configuration - add your Vercel frontend URL
const allowedOrigins = [
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // For development, you can temporarily allow all origins
    console.log('Blocked origin:', origin);
    return callback(null, true); // Allow all for now
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(json());
app.use(urlencoded({ extended: true }));


app.use('/pizza', PizzaRouter)
app.use('/images', express.static('uploads'));

app.use('/user', UserRouter)

app.use('/inventory', InventoryRouter)

app.use('/order', OrderRouter)


app.use('/', contactRouter)


app.use('/payment', RazorpayRouter)


app.get('/', (req, res) => {
  res.send('PizzaCraft Backend is Running!');
});

export default app;



