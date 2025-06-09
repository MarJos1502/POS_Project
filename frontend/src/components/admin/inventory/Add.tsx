import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add.css";

export default function App() {
  return (
    <div className="app-container">
      <ProductInventoryForm />
    </div>
  );
}

const ProductInventoryForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [image, setImageUrl] = useState<string>("");

  const navigate = useNavigate(); // ✅ FIXED: Declare navigate correctly

  const handleAdd = () => {
    const productData = { name, quantity, price, brand, image };
    console.log("Product Data:", productData);
    setName("");
    setQuantity("");
    setPrice("");
    setBrand("");
    setImageUrl("");
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
    } else {
      setImageUrl("");
    }
  };

  const goBack = () => {
    navigate(-1); // ✅ Go back one page
  };

  return (
    <div className="add-form-container">
      <h2 className="form-title">Product Inventory Form</h2>

      <div className="form-group">
        <label htmlFor="productImage" className="form-label">
          Product Image
        </label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          className="form-control-file"
          onChange={handleImageChange}
        />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Product Preview" className="image" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="productName" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="unitCount" className="form-label">
          Unit Count
        </label>
        <input
          type="number"
          id="unitCount"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="form-control"
          placeholder="₱0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          id="category"
          className="form-control"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button type="button" onClick={goBack} className="btn btn-secondary">
          Back
        </button>
        <button type="button" onClick={handleAdd} className="btn btn-primary">
          Add Product
        </button>
      </div>
    </div>
  );
};
