import React, { useState } from "react";

// Main App component
const Transaction = () => {
  // State for customer details
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // State for product selection
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(""); // Assuming a product can be selected after category
  const [quantity, setQuantity] = useState(1);

  // State for products added to the cart (dummy data for now)
  const [cartItems, setCartItems] = useState([
    // Example item: { id: 1, name: 'Sample Product A', stock: 100, unitPrice: 15.00, qty: 2, subtotal: 30.00 }
  ]);

  // State for discount and grand total
  const [discount, setDiscount] = useState("");
  const [grandTotal, setGrandTotal] = useState(0.0); // Will be calculated

  // State for payment details
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amountTendered, setAmountTendered] = useState("");

  // Dummy product categories and products for demonstration
  const productCategories = ["Electronics", "Books", "Clothing"];
  const productsByCategory = {
    Electronics: [
      { id: "elec-1", name: "Laptop Pro", stock: 50, unitPrice: 1200.0 },
      { id: "elec-2", name: "Wireless Mouse", stock: 200, unitPrice: 25.0 },
    ],
    Books: [
      { id: "book-1", name: "React for Dummies", stock: 150, unitPrice: 30.0 },
      { id: "book-2", name: "Advanced CSS", stock: 80, unitPrice: 45.0 },
    ],
    Clothing: [
      { id: "cloth-1", name: "T-Shirt", stock: 300, unitPrice: 20.0 },
      { id: "cloth-2", name: "Jeans", stock: 120, unitPrice: 60.0 },
    ],
  };

  // Function to add a product to the cart
  const handleAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      const productDetails = productsByCategory[selectedCategory].find(
        (p) => p.id === selectedProduct
      );
      if (productDetails) {
        const existingItemIndex = cartItems.findIndex(
          (item) => item.id === productDetails.id
        );
        let updatedCartItems;
        if (existingItemIndex > -1) {
          // If item already in cart, update quantity and subtotal
          updatedCartItems = cartItems.map((item, index) =>
            index === existingItemIndex
              ? {
                  ...item,
                  qty: item.qty + quantity,
                  subtotal: (item.qty + quantity) * item.unitPrice,
                }
              : item
          );
        } else {
          // Add new item to cart
          updatedCartItems = [
            ...cartItems,
            {
              id: productDetails.id,
              name: productDetails.name,
              stock: productDetails.stock,
              unitPrice: productDetails.unitPrice,
              qty: quantity,
              subtotal: quantity * productDetails.unitPrice,
            },
          ];
        }
        setCartItems(updatedCartItems);
        // Recalculate grand total
        calculateGrandTotal(updatedCartItems);
        // Reset product selection for next item
        setSelectedProduct("");
        setQuantity(1);
      }
    }
  };

  // Function to update quantity of an item in the cart
  const handleUpdateCartQuantity = (id, newQty) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newSubtotal = newQty * item.unitPrice;
        return { ...item, qty: newQty, subtotal: newSubtotal };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    calculateGrandTotal(updatedCartItems);
  };

  // Function to remove an item from the cart
  const handleRemoveCartItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    calculateGrandTotal(updatedCartItems);
  };

  // Function to calculate grand total (with dummy discount logic)
  const calculateGrandTotal = (items) => {
    const totalBeforeDiscount = items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    let finalTotal = totalBeforeDiscount;
    if (discount) {
      const discountValue = parseFloat(discount);
      if (!isNaN(discountValue)) {
        if (discount.includes("%")) {
          finalTotal = totalBeforeDiscount * (1 - discountValue / 100);
        } else {
          finalTotal = totalBeforeDiscount - discountValue;
        }
      }
    }
    setGrandTotal(Math.max(0, finalTotal).toFixed(2)); // Ensure total doesn't go below zero
  };

  // Recalculate total whenever cart items or discount changes
  React.useEffect(() => {
    calculateGrandTotal(cartItems);
  }, [cartItems, discount]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Header Section */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Create New Invoice
        </h1>

        {/* Customer Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Optional (required for credit sales)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Optional (required for credit sales)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Optional (required for credit sales)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Product Category
            </label>
            <select
              id="productCategory"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProduct(""); // Reset product when category changes
              }}
            >
              <option value="">Select...</option>
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {selectedCategory && (
            <div>
              <label
                htmlFor="productSelect"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Product
              </label>
              <select
                id="productSelect"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select...</option>
                {productsByCategory[selectedCategory]?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Unit Price: ${product.unitPrice.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedProduct && (
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
          )}
          <div className="md:col-span-2 flex justify-start">
            {" "}
            {/* Adjusted for better alignment */}
            <button
              onClick={handleAddToCart}
              className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 flex items-center"
              disabled={!selectedProduct || quantity <= 0}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Table Section */}
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-blue-100 text-left text-sm font-semibold text-gray-700">
                <th className="py-3 px-4 rounded-tl-md">PRODUCT NAME</th>
                <th className="py-3 px-4">STOCK QTY</th>
                <th className="py-3 px-4">UNIT PRICE</th>
                <th className="py-3 px-4">QTY</th>
                <th className="py-3 px-4 rounded-tr-md">SUBTOTAL</th>
                <th className="py-3 px-4 rounded-tr-md">Actions</th>{" "}
                {/* Added for remove button */}
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No products added yet.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="py-3 px-4 text-gray-800">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.stock}</td>
                    <td className="py-3 px-4 text-gray-600">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          handleUpdateCartQuantity(
                            item.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      ${item.subtotal.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRemoveCartItem(item.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Grand Total and Discount Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div className="w-full md:w-1/2">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200">
              Apply Discount
            </button>
            <input
              type="text"
              className="mt-3 block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Discount e.g. 10 or 5%"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-end mt-6 md:mt-0">
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">
                Grand Total:
              </p>
              <p className="text-2xl font-bold text-blue-700">${grandTotal}</p>
            </div>
          </div>
        </div>

        {/* Payment Method and Generate Invoice Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="amountTendered"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount Tendered
            </label>
            <input
              type="number"
              id="amountTendered"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter amount paid"
              value={amountTendered}
              onChange={(e) => setAmountTendered(e.target.value)}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-md shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200">
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
