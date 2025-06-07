import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import dashbord from "../../assets/icons/dashboard.png";
import cashier from "../../assets/icons/cashier.png";
import inventory from "../../assets/icons/inventory.png";
import user from "../../assets/icons/usermanagement.png";
import report from "../../assets/icons/report.png";
import "../../components/admin/SideBar.css";

function SideBar() {
  return (
    <header className="header">
      <nav className="side-nav open">
        <Link to="/" className="profile">
          <img src={logo} alt="Profile Logo" className="logo" />
          <h2>StepShoes</h2>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard">
              <img src={dashbord} alt="Home Icon" className="nav-icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/cashier">
              <img src={cashier} alt="Home Icon" className="nav-icon" />
              Transaction
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <img src={inventory} alt="About Icon" className="nav-icon" />
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/user">
              <img src={user} alt="Skill Icon" className="nav-icon" />
              User Management
            </Link>
          </li>
          <li>
            <Link to="/report">
              <img src={report} alt="Skill Icon" className="nav-icon" />
              Report
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default SideBar;
