import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/admin/Inventory.css";
const data = [
  {
    id: 1,
    name: "Item One",
    brand: "Category A",
    status: "In Stock",
    quantity: 120,
    price: 25.99,
  },
  {
    id: 2,
    name: "Item Two",
    brand: "Category B",
    status: "Low Stock",
    quantity: 20,
    price: 10.0,
  },
  {
    id: 3,
    name: "Item Three",
    brand: "Category C",
    status: "Out of Stock",
    quantity: 0,
    price: 15.5,
  },
  {
    id: 4,
    name: "Item Four",
    brand: "Category A",
    status: "In Stock",
    quantity: 75,
    price: 18.75,
  },
  {
    id: 5,
    name: "Item Five",
    brand: "Category B",
    status: "In Stock",
    quantity: 200,
    price: 30.0,
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const Add = () => {
    navigate("/inventory/add");
  };

  return (
    <div className="inventory-table-container">
      <h2>Inventory List</h2>

      <div className="table-controls">
        <div className="left-controls">
          Show{" "}
          <select>
            <option>10</option>
          </select>{" "}
          entries
        </div>

        <div className="center-controls">
          Search:{" "}
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="right-controls">
          <button className="add-button" onClick={Add}>
            Add Inventory
          </button>
        </div>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>
                <span
                  className={`status ${
                    item.status === "In Stock"
                      ? "in-stock"
                      : item.status === "Low Stock"
                      ? "low-stock"
                      : "out-of-stock"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>{item.quantity}</td>
              <td>₱{item.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn show"
                  onClick={() => navigate(`/inventory/show/${item.id}`)}
                >
                  Show
                </button>

                <button
                  className="btn update"
                  onClick={() =>
                    navigate(`/inventory/update/${item.id}`, { state: item })
                  }
                >
                  Update
                </button>
                <button
                  className="btn delete"
                  onClick={() =>
                    navigate(`/inventory/delete/${item.id}`, { state: item })
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        Showing {filteredData.length} of {data.length} entries
      </div>
    </div>
  );
};

export default Inventory;
