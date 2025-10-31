import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { NotificationProvider, useNotification } from "../../components/Notification";

const OrderManager = () => {
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("open");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/order/get?status=${statusFilter}`);
      setOrders(res.data.orders);
    } catch (err) {
      showNotification({
        text: "🚫 We're having some issues now, please contact the restaurant",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (order_id, newStatus) => {
    try {
      await apiClient.put("/order/put", {
        order_id,
        status: newStatus,
      });
      showNotification({ text: "✅ Order updated successfully", error: false });
      fetchOrders();
    } catch (err) {
      showNotification({ text: "🚫 Failed to update order", error: true });
    }
  };

  const handleDeleteOrder = async (order_id) => {
    try {
      await apiClient.delete("/order/del", { data: { order_id } });
      showNotification({ text: "✅ Order deleted", error: false });
      fetchOrders();
    } catch (err) {
      showNotification({ text: "🚫 Failed to delete order", error: true });
    }
  };

  const renderOrders = () => {
    if (loading) return <p className="text-gray-500">Loading orders...</p>;
    if (!orders.length) return <p className="text-gray-500">No orders found.</p>;

    return orders.map((order) => (
      <div
        key={order.order_id}
        className="border border-gray-200 rounded-lg shadow-sm p-4 mb-4 bg-white"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Order #{order.order_id.slice(0, 8)}</h3>
            <p className="text-sm text-gray-500">Table: {order.table_number}</p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
            <p className="text-sm text-gray-500">Time: {new Date(order.timestamp).toLocaleTimeString()}</p>
          </div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleUpdateStatus(order.order_id, "completed")}
            >
              Complete
            </button>
            <button
              className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              onClick={() => handleUpdateStatus(order.order_id, "in_progress")}
            >
              In Progress
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => handleDeleteOrder(order.order_id)}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-4">
  <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Items</h4>
  <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 bg-white shadow-sm">
    {order.items.map((item) => (
      <div
        key={item.item_id}
        className="flex justify-between items-center px-4 py-2 text-sm"
      >
        <span className="text-gray-900 font-medium">{item.name}</span>
        <span className="text-gray-500">x{item.quantity}</span>
      </div>
    ))}
  </div>
</div>

      </div>
    ));
  };
const [groupByItem, setGroupByItem] = useState(false);

const groupedItems = () => {
  const itemMap = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const key = item.name;
      if (!itemMap[key]) {
        itemMap[key] = {
          name: item.name,
          totalQuantity: 0,
          orders: [],
        };
      }
      itemMap[key].totalQuantity += item.quantity;
      itemMap[key].orders.push({
        orderId: order.order_id,
        quantity: item.quantity,
        table: order.table_number,
      });
    });
  });

  return Object.values(itemMap);
};

const renderGroupedItems = () => {
  const grouped = groupedItems();

  if (loading) return <p className="text-gray-500">Loading items...</p>;
  if (!grouped.length) return <p className="text-gray-500">No items found.</p>;

  return grouped.map((item) => (
    <div key={item.name} className="border border-gray-200 rounded-lg shadow-sm p-4 mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">Total: {item.totalQuantity}</p>
      <ul className="text-sm text-gray-700 space-y-1">
        {item.orders.map((entry, index) => (
          <li key={index} className="flex justify-between border-t pt-1">
            <span>Order #{entry.orderId.slice(0, 8)}</span>
            <span>Table {entry.table} — x{entry.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  ));
};
  return (
  <div className="p-6 text-black">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <label className="mr-2 font-medium">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded shadow-sm focus:ring-black"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={groupByItem}
            onChange={(e) => setGroupByItem(e.target.checked)}
            className="form-checkbox text-black"
          />
          <span className="text-sm text-gray-700">Group items by name</span>
        </label>
      </div>

      {groupByItem ? renderGroupedItems() : renderOrders()}
    </div>
  </div>
);

};

export default OrderManager

