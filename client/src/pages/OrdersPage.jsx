import { useEffect, useState } from "react";
import { getAllOrders, filterOrders } from "../services/dashboardService.js";
import OrderFilters from "../features/orders/OrderFilters.jsx";
import OrderTable from "../features/orders/OrderTable.jsx";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filters) => {
    setLoading(true);
    try {
      const data = await filterOrders(filters);
      setOrders(data);
    } catch (error) {
      console.error("Filtering failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-bold text-indigo-800">Orders</h2>
        <p className="text-sm text-gray-500">
          Manage and track all customer orders
        </p>
      </div>

      {/* Filters (always above table, not boxed in) */}
      <OrderFilters onFilterChange={handleFilter} />

      {/* Table with loading/empty state and native surface */}
      <section>
        <div className="py-2">
          <h3 className="text-lg font-semibold mb-2">All Orders</h3>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white">
          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading orders...</div>
          ) : (
            <OrderTable orders={orders} />
          )}
        </div>
      </section>
    </div>
  );
}

export default Orders;
