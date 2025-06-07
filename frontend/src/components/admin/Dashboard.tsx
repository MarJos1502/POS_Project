import "../../components/admin/Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [120, 190, 300, 500, 200, 300, 450],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  const inventoryData = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        label: "Inventory Status",
        data: [150, 30, 10],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="dashboard-container">
      <div>
        <div className="summary-cards">
          <div className="card blue">
            <h2>₱ 2,354,330.00</h2>
            <p>Sales Orders</p>
            <span className="more">More info →</span>
          </div>
          <div className="card green">
            <h2>₱ 2,592,370.88</h2>
            <p>Purchase Orders</p>
            <span className="more">More info →</span>
          </div>
          <div className="card orange">
            <h2>200</h2>
            <p>Products</p>
            <span className="more">More info →</span>
          </div>
          <div className="card teal">
            <h2>20</h2>
            <p>Customers</p>
            <span className="more">More info →</span>
          </div>
        </div>
        <div className="chart-grid">
          {/* Sales Line Chart */}
          <div>
            <h2> Sales Overview</h2>
            <Line data={salesData} />
          </div>

          {/* Inventory Bar Chart */}
          <div>
            <h2>Inventory Summary</h2>
            <Bar data={inventoryData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
