import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/admin-common.css";
import "./admin_dashboard.css";

const AdminDashboard = () => {
  const url = import.meta.env.VITE_API_URL;
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalPizzas: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch user profile
        const profileRes = await axios.get(`${url}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserName(profileRes.data.user.name || "Admin");

        // Fetch users count
        const usersRes = await axios.get(`${url}/user/allUsers`);
        
        // Fetch orders
        const ordersRes = await fetch(`${url}/order/get_orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersData = await ordersRes.json();
        
        // Fetch pizzas
        const pizzasRes = await axios.get(`${url}/pizza/getallpizzas`);

        // Calculate stats
        const totalRevenue = ordersData.orders?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0;

        setStats({
          totalUsers: usersRes.data?.length || 0,
          totalOrders: ordersData.orders?.length || 0,
          totalRevenue: totalRevenue / 100,
          totalPizzas: pizzasRes.data?.length || 0
        });

        setRecentOrders(ordersData.orders?.slice(0, 5) || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [url]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      "Order Received": "admin-badge--primary",
      "In the Kitchen": "admin-badge--warning",
      "Sent to Delivery": "admin-badge--primary",
      "Delivered": "admin-badge--success"
    };
    return statusClasses[status] || "admin-badge--primary";
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading__spinner"></div>
          <p>Loading dashboard...</p>
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
              <div className="admin-page__icon">📊</div>
              <div>
                <h1 className="admin-page__title">Dashboard</h1>
                <p className="admin-page__subtitle">Welcome back, {userName}! Here's what's happening today.</p>
              </div>
            </div>
            <div className="dashboard-header__actions">
              <Link to="/admin/pizza_dashboard/add" className="admin-btn admin-btn--primary">
                <span>➕</span> Add Pizza
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="admin-stat-card admin-stat-card--primary">
            <div className="admin-stat-card__icon">👥</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Total Users</p>
              <p className="admin-stat-card__value">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-card--success">
            <div className="admin-stat-card__icon">📦</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Total Orders</p>
              <p className="admin-stat-card__value">{stats.totalOrders.toLocaleString()}</p>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-card--warning">
            <div className="admin-stat-card__icon">💰</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Revenue</p>
              <p className="admin-stat-card__value">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-card--danger">
            <div className="admin-stat-card__icon">🍕</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Total Pizzas</p>
              <p className="admin-stat-card__value">{stats.totalPizzas.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Orders */}
        <div className="dashboard-grid">
          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2 className="dashboard-section__title">Quick Actions</h2>
            <div className="admin-grid admin-grid--2">
              <Link to="/admin/users" className="admin-action-card">
                <div className="admin-action-card__icon">👥</div>
                <h3 className="admin-action-card__title">Users</h3>
                <p className="admin-action-card__desc">Manage registered users and their accounts</p>
                <span className="admin-action-card__link">Manage Users →</span>
              </Link>

              <Link to="/admin/pizza_dashboard" className="admin-action-card">
                <div className="admin-action-card__icon">🍕</div>
                <h3 className="admin-action-card__title">Pizzas</h3>
                <p className="admin-action-card__desc">Add, edit, or remove pizzas from menu</p>
                <span className="admin-action-card__link">Manage Pizzas →</span>
              </Link>

              <Link to="/admin/orders" className="admin-action-card">
                <div className="admin-action-card__icon">📦</div>
                <h3 className="admin-action-card__title">Orders</h3>
                <p className="admin-action-card__desc">Track and manage customer orders</p>
                <span className="admin-action-card__link">View Orders →</span>
              </Link>

              <Link to="/admin/inventory" className="admin-action-card">
                <div className="admin-action-card__icon">📋</div>
                <h3 className="admin-action-card__title">Inventory</h3>
                <p className="admin-action-card__desc">Monitor and update stock levels</p>
                <span className="admin-action-card__link">Manage Inventory →</span>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="dashboard-section">
            <div className="dashboard-section__header">
              <h2 className="dashboard-section__title">Recent Orders</h2>
              <Link to="/admin/orders" className="admin-btn admin-btn--outline admin-btn--sm">
                View All
              </Link>
            </div>
            
            {recentOrders.length > 0 ? (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>#{order._id.slice(-6).toUpperCase()}</td>
                        <td>{order.userId?.name || "Unknown"}</td>
                        <td>₹{(order.totalAmount / 100).toFixed(2)}</td>
                        <td>
                          <span className={`admin-badge ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty">
                <div className="admin-empty__icon">📦</div>
                <h3 className="admin-empty__title">No Recent Orders</h3>
                <p className="admin-empty__desc">Orders will appear here once customers start ordering.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;