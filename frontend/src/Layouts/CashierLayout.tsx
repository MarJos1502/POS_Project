import React from "react";
import CashierSideBar from "../components/cashier/SideBar";

type Props = {
  children: React.ReactNode;
};

const CashierLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="app-container"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      <CashierSideBar />
      <main
        style={{ flexGrow: 1, padding: "20px", backgroundColor: "#f0f2f5" }}
      >
        {children}
      </main>
    </div>
  );
};

export default CashierLayout;
