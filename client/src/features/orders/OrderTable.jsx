import { FiCheckCircle, FiXCircle, FiAlertCircle, FiTruck, FiBox } from "react-icons/fi";

const statusIcon = (status) => {
  switch (status) {
    case "paid":
      return <FiCheckCircle className="inline mr-1 text-green-600" />;
    case "failed":
      return <FiXCircle className="inline mr-1 text-red-600" />;
    default:
      return <FiAlertCircle className="inline mr-1 text-yellow-600" />;
  }
};

const orderIcon = (status) => {
  switch (status) {
    case "processing":
      return <FiBox className="inline mr-1 text-indigo-600" />;
    case "shipped":
      return <FiTruck className="inline mr-1 text-blue-600" />;
    case "delivered":
      return <FiCheckCircle className="inline mr-1 text-green-600" />;
    default:
      return <FiXCircle className="inline mr-1 text-red-600" />;
  }
};

const OrderTable = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400 text-sm">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-left border-separate border-spacing-0">
        <thead className="sticky top-0 bg-white/90 backdrop-blur z-10 shadow-sm">
          <tr>
            <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Order ID</th>
            <th className="p-4 font-semibold text-gray-600 uppercase text-xs">User</th>
            <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Amount</th>
            <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Payment</th>
            <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Status</th>
            <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={order._id}
              className={`transition ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-indigo-50`}
            >
              <td className="p-4 font-medium text-blue-700">{order._id.slice(-6)}</td>
              <td className="p-4 max-w-[150px] truncate" title={order.user?.name || "Unknown"}>
                {order.user?.name || "Unknown"}
              </td>
              <td className="p-4 text-indigo-700 font-semibold">₹{order.totalAmount}</td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {statusIcon(order.paymentStatus)}
                  {order.paymentStatus}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    order.orderStatus === "processing"
                      ? "bg-indigo-100 text-indigo-700"
                      : order.orderStatus === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.orderStatus === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {orderIcon(order.orderStatus)}
                  {order.orderStatus}
                </span>
              </td>
              <td className="p-4">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
