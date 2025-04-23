import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login"; // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data); // Set the orders data
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Section: User Details */}
                <div>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {order.orderStatus}
                  </p>
                  <p className="text-gray-600">
                    <strong>Delievery Address:</strong> {order.userAddress}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone Number:</strong> {order.phoneNumber}
                  </p>
                </div>

                {/* Right Section: Payment Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Payment Details
                  </h2>
                  <p className="text-gray-600 ml-3">
                    <strong>Total Amount:</strong> ₹{order.amount.toFixed(2)}
                  </p>
                  <div className="ml-3 flex space-x-6">
                    <strong>Items:</strong>
                    <ul className="list-disc ml-6 text-gray-600 ">
                      {order.orderedItems.map((item, index) => (
                        <li key={index}>
                          {item.foodName} - {item.quantity} x ₹
                          {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;