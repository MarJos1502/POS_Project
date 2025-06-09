import React from "react";
import AdminSideBar from "../components/admin/SideBar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="app-container"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      <AdminSideBar />
      <main
        style={{ flexGrow: 1, padding: "20px", backgroundColor: "#f0f2f5" }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
