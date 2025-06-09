import React from "react";
import "../../components/admin/User.css";

const users = [
  {
    id: 1,
    name: "Marc Joseph Bolvider",
    role: "Admin",
    email: "marc@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Cashier",
    email: "jane@example.com",
    status: "Inactive",
  },
];

const UserManagement: React.FC = () => {
  return (
    <div className="user-table-container">
      <div className="table-controls">
        <div className="left-controls">
          <h2>Users</h2>
        </div>
        <div className="right-controls">
          <button className="add-button">Add User</button>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`status ${
                    user.status === "Active" ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <button className="btn show">Show</button>
                <button className="btn update">Edit</button>
                <button className="btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">Total Users: {users.length}</div>
    </div>
  );
};

export default UserManagement;
