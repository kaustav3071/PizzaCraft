import express from 'express';
import { addPizza, getAllPizzas, deletePizza, updatePizza } from '../controllers/pizza.controller.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Use Cloudinary upload middleware
router.post("/add", upload.single("pizzaimage"), addPizza);

router.get("/getallpizzas", getAllPizzas);

router.delete("/deletepizza/:id", deletePizza);

router.put("/updatepizza/:id", upload.single("pizzaimage"), updatePizza);

export default router;