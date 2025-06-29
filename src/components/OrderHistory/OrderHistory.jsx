import { useEffect, useState } from "react";
import { latestOrders } from "../../service/orderService";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  });

  const formatItems = (items) => {
    return items.map((item) => `${item.name} × ${item.quantity}`).join(",");
  };

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
    return <div className="text-center py-4">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center-py-4">No Orders Found</div>;
  }

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchKeyword(text);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      order.mobileNumber.includes(searchKeyword)
  );

  return (
    <div>
      <div className="order-history-container">
        <div className="d-flex justify-content-between">
          <h2 className="mb-2 text-light">Recent Orders</h2>
          <div className="search-box">
            <div className="input-group mb-3">
              <input
                type="text"
                name="keyword"
                id="keyword"
                placeholder="Search Name or Mobile Number"
                className="form-control"
                onChange={handleInputChange}
                value={searchKeyword}
              />
              <span className="input-group-text bg-warning">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>
                    {order.customerName}

                    <br />
                    <small className="text-muted">{order.mobileNumber}</small>
                  </td>
                  <td>{formatItems(order.items)}</td>
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
  );
};

export default OrderHistory;
