import React, { useEffect, useState } from 'react';
import '../../styles/admin-common.css';
import './order_manage.css';
import { toast } from 'react-toastify';

const OrderManage = () => {
    const url =  import.meta.env.VITE_API_URL;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authorization token is missing. Please log in again.');
                return;
            }

            const response = await fetch(`${url}/order/get_orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    toast.error('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userRole');
                    window.location.href = '/login';
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data.orders);
        } catch (err) {
            console.error('Error fetching orders:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const updateOrderStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authorization token is missing. Please log in again.');
                return;
            }

            const response = await fetch(`${url}/order/update_order/` + orderId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update order status');
            }

            toast.success('Order status updated successfully.');
            fetchOrders();
        } catch (err) {
            console.error('Error updating order status:', err.message);
            toast.error(err.message);
        }
    };

    const deleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authorization token is missing. Please log in again.');
                return;
            }

            const response = await fetch(`${url}/order/cancel_order/` + orderId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete order');
            }

            toast.success('Order deleted successfully.');
            fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err.message);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        const statusMap = {
            "Order Received": { class: "admin-badge--primary", icon: "📥" },
            "In the Kitchen": { class: "admin-badge--warning", icon: "👨‍🍳" },
            "Sent to Delivery": { class: "admin-badge--primary", icon: "🚚" },
            "Delivered": { class: "admin-badge--success", icon: "✅" }
        };
        return statusMap[status] || statusMap["Order Received"];
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-loading">
                    <div className="admin-loading__spinner"></div>
                    <p>Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page">
                <div className="admin-empty">
                    <div className="admin-empty__icon">❌</div>
                    <h3 className="admin-empty__title">Error Loading Orders</h3>
                    <p className="admin-empty__desc">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-page__container">
                {/* Header */}
                <div className="admin-page__header">
                    <div className="admin-page__header-content">
                        <div className="admin-page__title-section">
                            <div className="admin-page__icon">📦</div>
                            <div>
                                <h1 className="admin-page__title">Order Management</h1>
                                <p className="admin-page__subtitle">Track and manage all customer orders</p>
                            </div>
                        </div>
                        <div className="order-stats">
                            <span className="order-stat">
                                <strong>{orders.length}</strong> Total Orders
                            </span>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                {orders.length > 0 ? (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                                        </td>
                                        <td>
                                            <div className="customer-info">
                                                <span className="customer-name">{order.userId?.name || 'Unknown'}</span>
                                                <span className="customer-email">{order.userId?.email || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="order-items">
                                                {order.pizzaId && (
                                                    <span className="order-item-main">🍕 {order.pizzaId.name}</span>
                                                )}
                                                <div className="order-item-details">
                                                    <span>Base: {order.base || 'N/A'}</span>
                                                    <span>Sauce: {order.sauce || 'N/A'}</span>
                                                    <span>Cheese: {order.cheese || 'N/A'}</span>
                                                    {order.veggies?.length > 0 && (
                                                        <span>Veggies: {order.veggies.join(', ')}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="order-amount">₹{(order.totalAmount / 100).toFixed(2)}</span>
                                        </td>
                                        <td>
                                            <select
                                                className="admin-form__select admin-select order-status-select"
                                                value={order.status || 'Order Received'}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            >
                                                <option value="Order Received">📥 Order Received</option>
                                                <option value="In the Kitchen">👨‍🍳 In the Kitchen</option>
                                                <option value="Sent to Delivery">🚚 Sent to Delivery</option>
                                                <option value="Delivered">✅ Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="admin-table__actions">
                                                <button 
                                                    className="admin-btn admin-btn--danger admin-btn--sm"
                                                    onClick={() => deleteOrder(order._id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="admin-card">
                        <div className="admin-empty">
                            <div className="admin-empty__icon">📦</div>
                            <h3 className="admin-empty__title">No Orders Yet</h3>
                            <p className="admin-empty__desc">Orders will appear here once customers start placing them.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManage;