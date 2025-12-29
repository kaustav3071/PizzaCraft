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

// Connect to database (don't exit on failure for serverless)
connectDB().catch(err => console.error('DB Connection Error:', err));

// CORS configuration - allow all origins for Vercel deployment
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

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



