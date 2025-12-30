import PizzaModel from '../models/pizza.model.js';
import { cloudinary } from '../config/cloudinary.js';

// Function to add a new pizza
export const addPizza = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Pizza image is required' });
        }
        
        // Cloudinary returns the URL in req.file.path
        const pizzaImage = req.file.path;
        
        const pizza = new PizzaModel({
            name,
            description,
            price,
            image: pizzaImage, // Save the Cloudinary URL
        });
        await pizza.save();
        res.status(201).json({ message: 'Pizza added successfully', pizza });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all pizzas
export const getAllPizzas = async (req, res) => {
    try {
        const pizzas = await PizzaModel.find();
        res.status(200).json(pizzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to delete a pizza by ID
export const deletePizza = async (req, res) => {
    try {
        const { id } = req.params;
        const pizza = await PizzaModel.findById(id);

        if (!pizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }

        // Delete image from Cloudinary if it's a Cloudinary URL
        if (pizza.image && pizza.image.includes('cloudinary')) {
            // Extract public_id from Cloudinary URL
            const publicId = pizza.image.split('/').slice(-2).join('/').split('.')[0];
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.log('Error deleting image from Cloudinary:', err.message);
            }
        }

        // Delete the pizza from the database
        await PizzaModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Pizza deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Function to update a pizza by ID
export const updatePizza = async (req, res) => {
    try {
        const pizzaId = req.params.id; 
        const { name, description, price } = req.body;
        const newImage = req.file ? req.file.path : null; // Cloudinary URL

        const pizza = await PizzaModel.findById(pizzaId);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }

        // Update the pizza details
        pizza.name = name || pizza.name;
        pizza.description = description || pizza.description;
        pizza.price = price || pizza.price;
        
        if (newImage) {
            // Delete old image from Cloudinary if it exists
            if (pizza.image && pizza.image.includes('cloudinary')) {
                const publicId = pizza.image.split('/').slice(-2).join('/').split('.')[0];
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.log('Error deleting old image:', err.message);
                }
            }
            pizza.image = newImage; // Save the new Cloudinary URL
        }

        await pizza.save();
        res.status(200).json({ message: 'Pizza updated successfully', pizza });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};