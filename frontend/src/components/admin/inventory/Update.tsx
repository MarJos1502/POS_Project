import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Show.css";

interface Product {
  productName?: string;
  unitCount?: string | number;
  price?: string;
  category?: string;
  imageUrl?: string;
}

const Update: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product: Product = location.state || {};

  const [productName, setProductName] = useState<string>(
    product.productName || ""
  );
  const [unitCount, setUnitCount] = useState<string | number>(
    product.unitCount || ""
  );
  const [price, setPrice] = useState<string>(product.price || "");
  const [category, setCategory] = useState<string>(product.category || "");
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl || "");

  const handleUpdate = () => {
    const updatedProduct: Product = {
      productName,
      unitCount,
      price,
      category,
      imageUrl,
    };

    console.log("Updated Product:", updatedProduct);
    navigate("/inventory"); // Go back to inventory list
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImageUrl(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="add-form-container">
        <h2 className="form-title">Update Product</h2>

        <div className="form-group">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control-file"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Preview" className="image" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Unit Count</label>
          <input
            type="number"
            className="form-control"
            value={unitCount}
            onChange={(e) => setUnitCount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
