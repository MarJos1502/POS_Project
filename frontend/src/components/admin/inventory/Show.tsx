import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import "./Show.css";

interface ProductShowProps {
  productName?: string;
  unitCount?: number | string;
  price?: string;
  category?: string;
  imageUrl?: string;
}

const Show: React.FC<ProductShowProps> = ({
  productName,
  unitCount,
  price,
  category,
  imageUrl,
}) => {
  const navigate = useNavigate(); // ✅ use navigate

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="center-wrapper">
      <div className="add-form-container">
        <h2 className="form-title">Product Details</h2>

        <div className="form-group">
          <label className="form-label">Product Image</label>
          {imageUrl ? (
            <img src={imageUrl} alt="Product" className="image" />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="form-label">Unit Count</label>
          <input
            type="number"
            className="form-control"
            value={unitCount}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input type="text" className="form-control" value={price} readOnly />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            readOnly
          />
        </div>

        <div className="button-group">
          <button onClick={goBack} className="btn btn-secondary">
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Show;
