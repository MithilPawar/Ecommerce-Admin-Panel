import { useState } from "react";

const OrderFilters = ({ onFilterChange }) => {
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {};
    if (status) filters.status = status;
    if (payment) filters.payment = payment;
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col sm:flex-row gap-4 items-stretch sm:items-end
        w-full p-0 bg-transparent
      "
    >
      {/* Order Status Dropdown */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Order Status</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-indigo-500 outline-none transition"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Payment Status Dropdown */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Payment Status</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-indigo-500 outline-none transition"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex">
        <button
          type="submit"
          className="
            bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md text-sm
            transition h-full
          "
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default OrderFilters;
