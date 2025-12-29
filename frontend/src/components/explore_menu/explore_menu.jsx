import React, { useState, useEffect } from "react";
import "./explore_menu.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ExploreMenu = () => {
    const url = import.meta.env.VITE_API_URL;
    const [getAll, setGetAll] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [itemCounts, setItemCounts] = useState({});
    const [inventory, setInventory] = useState(null);
    const [cart, setCart] = useState([]);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000,
    });

    const fetchAllPizzas = async () => {
        try {
            const response = await axios.get(`${url}/pizza/getallpizzas`);
            if (response.status === 200) {
                setGetAll(response.data);
            }
        } catch (error) {
            toast.error("Failed to load pizzas");
        }
    };

    const fetchInventory = async () => {
        try {
            const response = await api.get("/inventory");
            setInventory(response.data);
        } catch (error) {
            console.error("Failed to load inventory");
        }
    };

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const response = await api.get("/user/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userCart = response.data.user.cartData || [];
            setCart(userCart);
            const counts = {};
            userCart.forEach(item => {
                counts[item.pizzaId] = item.quantity;
            });
            setItemCounts(counts);
        } catch (error) {
            console.error("Failed to fetch cart");
        }
    };

    const updateCartInBackend = async (updatedCart) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to add items to cart");
                return;
            }
            const response = await api.put("/user/update_cart", { cartData: updatedCart }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(response.data.cartData);
        } catch (error) {
            toast.error("Failed to update cart");
        }
    };

    const handleAddItem = (pizzaId) => {
        const pizza = getAll.find(p => p._id === pizzaId);
        if (!pizza || !inventory) return;

        const defaultBase = "Regular";
        const defaultSauce = "Tomato";
        const defaultCheese = Object.keys(inventory.cheeses).find(c => c.toLowerCase() === "mozzarella") || "Mozzarella";

        const quantity = (itemCounts[pizzaId] || 0) + 1;

        const updatedCartItem = {
            pizzaId: pizza._id,
            pizzaName: pizza.name,
            pizzaImage: pizza.image,
            originalPrice: pizza.price,
            price: pizza.price,
            quantity,
            base: defaultBase,
            sauce: defaultSauce,
            cheese: defaultCheese,
            veggies: [],
            basePrice: inventory.bases[defaultBase]?.price || 0,
            saucePrice: inventory.sauces[defaultSauce]?.price || 0,
            cheesePrice: inventory.cheeses[defaultCheese]?.price || 0,
            veggiesPrice: 0,
        };

        const newCart = [...cart.filter(item => item.pizzaId !== pizzaId), updatedCartItem];
        setItemCounts(prev => ({ ...prev, [pizzaId]: quantity }));
        updateCartInBackend(newCart);
    };

    const handleRemoveItem = (pizzaId) => {
        const currentQty = itemCounts[pizzaId] || 0;
        const quantity = Math.max(currentQty - 1, 0);

        if (quantity === 0) {
            const newCart = cart.filter(item => item.pizzaId !== pizzaId);
            setItemCounts(prev => {
                const updated = { ...prev };
                delete updated[pizzaId];
                return updated;
            });
            updateCartInBackend(newCart);
            return;
        }

        const item = cart.find(p => p.pizzaId === pizzaId);
        if (!item) return;

        const updatedCartItem = { ...item, quantity };
        const newCart = [...cart.filter(p => p.pizzaId !== pizzaId), updatedCartItem];
        setItemCounts(prev => ({ ...prev, [pizzaId]: quantity }));
        updateCartInBackend(newCart);
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchAllPizzas(), fetchInventory(), fetchCart()]);
            setLoading(false);
        };
        loadData();
    }, []);

    const totalCartItems = Object.values(itemCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="menu-page">
            {/* Hero Header */}
            <div className="menu-hero">
                <div className="menu-hero-content">
                    <span className="menu-badge">🍕 Fresh & Delicious</span>
                    <h1>Our Menu</h1>
                    <p>Handcrafted pizzas made with love, fresh ingredients, and authentic recipes from Italy.</p>
                    <div className="menu-hero-actions">
                        <Link to="/cart" className="menu-btn menu-btn--primary">
                            🛒 View Cart {totalCartItems > 0 && <span className="cart-count">({totalCartItems})</span>}
                        </Link>
                        <Link to="/add-inventory" className="menu-btn menu-btn--ghost">
                            Customize Pizza
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menu Content */}
            <div className="menu-content">
                {loading ? (
                    <div className="menu-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading delicious pizzas...</p>
                    </div>
                ) : getAll.length > 0 ? (
                    <div className="menu-grid">
                        {getAll.map((pizza) => (
                            <div className="pizza-card" key={pizza._id}>
                                <div className="pizza-card-image">
                                    <img src={`${url}/images/${pizza.image}`} alt={pizza.name} />
                                    <div className="pizza-card-overlay">
                                        <span className="pizza-tag">🔥 Popular</span>
                                    </div>
                                </div>
                                <div className="pizza-card-content">
                                    <h3 className="pizza-name">{pizza.name}</h3>
                                    <p className="pizza-description">{pizza.description}</p>
                                    <div className="pizza-card-footer">
                                        <div className="pizza-price">
                                            <span className="price-label">Price</span>
                                            <span className="price-value">₹{pizza.price}</span>
                                        </div>
                                        {!itemCounts[pizza._id] ? (
                                            <button className="add-btn" onClick={() => handleAddItem(pizza._id)}>
                                                + Add
                                            </button>
                                        ) : (
                                            <div className="quantity-control">
                                                <button className="qty-btn qty-btn--minus" onClick={() => handleRemoveItem(pizza._id)}>−</button>
                                                <span className="qty-value">{itemCounts[pizza._id]}</span>
                                                <button className="qty-btn qty-btn--plus" onClick={() => handleAddItem(pizza._id)}>+</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="menu-empty">
                        <span className="empty-icon">🍕</span>
                        <h3>No pizzas available</h3>
                        <p>Check back later for our delicious offerings!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreMenu;
