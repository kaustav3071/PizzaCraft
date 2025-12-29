import React, { useEffect, useState } from "react";
import "../../../styles/admin-common.css";
import "./user_dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const url = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/user/allUsers`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await axios.delete(`${url}/user/delete/${id}`);

      if (response.status === 200) {
        toast.success("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "An error occurred while deleting the user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    return role === "admin" ? "admin-badge--primary" : "admin-badge--success";
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading__spinner"></div>
          <p>Loading users...</p>
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
              <div className="admin-page__icon">👥</div>
              <div>
                <h1 className="admin-page__title">User Management</h1>
                <p className="admin-page__subtitle">Manage all registered users and their accounts</p>
              </div>
            </div>
            <div className="user-header__actions">
              <div className="user-search">
                <span className="user-search__icon">🔍</span>
                <input
                  type="text"
                  className="admin-form__input user-search__input"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card admin-stat-card--primary">
            <div className="admin-stat-card__icon">👥</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Total Users</p>
              <p className="admin-stat-card__value">{users.length}</p>
            </div>
          </div>
          <div className="admin-stat-card admin-stat-card--success">
            <div className="admin-stat-card__icon">👤</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Regular Users</p>
              <p className="admin-stat-card__value">{users.filter(u => u.role === 'user').length}</p>
            </div>
          </div>
          <div className="admin-stat-card admin-stat-card--warning">
            <div className="admin-stat-card__icon">🛡️</div>
            <div className="admin-stat-card__content">
              <p className="admin-stat-card__label">Admins</p>
              <p className="admin-stat-card__value">{users.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {filteredUsers.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="user-email">{user.email}</span>
                    </td>
                    <td>
                      <span className={`admin-badge ${getRoleBadge(user.role)}`}>
                        {user.role === "admin" ? "🛡️ Admin" : "👤 User"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          className="admin-btn admin-btn--primary admin-btn--sm"
                          onClick={() => navigate(`/admin/user/user/${user._id}`)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="admin-btn admin-btn--danger admin-btn--sm"
                          onClick={() => deleteUser(user._id)}
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
              <div className="admin-empty__icon">👥</div>
              <h3 className="admin-empty__title">No Users Found</h3>
              <p className="admin-empty__desc">
                {searchTerm ? "No users match your search criteria." : "No users registered yet."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
