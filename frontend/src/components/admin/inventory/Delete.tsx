import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Delete.css";

const Delete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state || {};

  const handleDelete = () => {
    console.log("Deleting:", product);
    navigate("/inventory");
  };

  return (
    <div className="delete-page-wrapper">
      <div className="delete-form-container">
        <h2 className="delete-title">Delete Product</h2>
        <p className="delete-message">
          Are you sure you want to delete <strong>{product.productName}</strong>
          ?
        </p>
        <div className="button-group">
          <button className="btn btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
