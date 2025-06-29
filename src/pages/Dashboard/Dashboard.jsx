import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDashboardData } from "../../service/dashboardService";
import "./Dashboard.css";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getDashboardData();
        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="error">Failed to Load the Data...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>{data.todaySales}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount}</p>
            </div>
          </div>
        </div>
        <div className="recent-order-card">
          <h3 className="recent-order-title">Recent Orders</h3>
          <div className="order-table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 7)}...</td>
                    <td>{order.customerName}</td>
                    <td>{order.grandTotal.toFixed(2)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.paymentDetails?.status === "COMPLETED"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.paymentDetails?.status || "PENDING"}
                      </span>
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
