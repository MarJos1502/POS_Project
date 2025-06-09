import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add.css"; // For styling

const Add: React.FC = () => {
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New Brand:", brand); // Replace with API call if needed

    // Redirect after adding
    navigate("/brand"); // or wherever your brand list is
  };

  return (
    <div className="add-brand-form">
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand Name</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            placeholder="Enter brand name"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Add
          </button>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/brand")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
