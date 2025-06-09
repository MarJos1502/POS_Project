import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/admin/SideBar";
import Dashboard from "./components/admin/Dashboard";
import Inventory from "./components/admin/Inventory";
import Category from "./components/admin/Category";
{
  /* Product Action */
}
import InventoryAdd from "./components/admin/inventory/Add";
import InventoryShow from "./components/admin/inventory/Show";
import InventoryUpdate from "./components/admin/inventory/Update";
import InventoryDelete from "./components/admin/inventory/Delete";
{
  /* Category Action */
}
import CategoryAdd from "./components/admin/category/add";
import CategoryShow from "./components/admin/inventory/Show";
import CategoryUpdate from "./components/admin/inventory/Update";
import CategoryDelete from "./components/admin/inventory/Delete";

import Cashier from "./components/admin/Transaction";
import UserManagement from "./components/admin/User";
import Report from "./components/admin/Report";
import "./App.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <SideBar />
      <div className="content">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with navbar/sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/cashier"
          element={
            <Layout>
              <Cashier />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <Inventory />
            </Layout>
          }
        />
        <Route
          path="/category"
          element={
            <Layout>
              <Category />
            </Layout>
          }
        />
        <Route
          path="/user"
          element={
            <Layout>
              <UserManagement />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Report />
            </Layout>
          }
        />

        {/* Product Action */}
        <Route path="/inventory/add" element={<InventoryAdd />} />
        <Route path="/inventory/show/:id" element={<InventoryShow />} />
        <Route path="/inventory/update/:id" element={<InventoryUpdate />} />
        <Route path="/inventory/delete/:id" element={<InventoryDelete />} />
        {/* Category */}
        <Route path="/category/add" element={<CategoryAdd />} />
        <Route path="/category/show/:id" element={<CategoryShow />} />
        <Route path="/category/update/:id" element={<CategoryUpdate />} />
        <Route path="/category/delete/:id" element={<CategoryDelete />} />
      </Routes>
    </Router>
  );
}

export default App;
