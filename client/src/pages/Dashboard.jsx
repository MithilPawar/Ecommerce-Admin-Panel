import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  getAllOrders,
} from "../services/dashboardService";
import {
  FiUsers,
  FiShoppingBag,
  FiBox,
  FiCreditCard,
  FiSearch,
} from "react-icons/fi";

// Loading skeleton for cards and table
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}></div>
);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getStats = async () => {
      setLoadingStats(true);
      try {
        const res = await fetchDashboardStats();
        setStats(res);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
      setLoadingStats(false);
    };

    const getOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await getAllOrders();
        setOrders(res);
      } catch (error) {
        console.error("Failed to fetch recent orders:", error);
      }
      setLoadingOrders(false);
    };

    getStats();
    getOrders();
  }, []);

  // Filter orders by search
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      (order.user?.name || "Unknown").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Sticky Page Header */}
      <div className="bg-white dark:bg-gray-900 py-6 px-4 rounded-xl shadow mb-6">
        <h2 className="text-3xl font-semibold text-indigo-900 dark:text-white flex items-center gap-2">
          Welcome, Admin 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
          Here’s an overview of your eCommerce performance today.
        </p>
      </div>

      {/* Metrics Cards with Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingStats ? (
          <>
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </>
        ) : (
          <>
            <DashboardCard
              title="Total Orders"
              value={stats?.totalOrders || 0}
              icon={<FiShoppingBag />}
            />
            <DashboardCard
              title="Total Revenue"
              value={`₹${stats?.totalRevenue || 0}`}
              icon={<FiCreditCard />}
            />
            <DashboardCard
              title="Total Products"
              value={stats?.totalProducts || 0}
              icon={<FiBox />}
            />
            <DashboardCard
              title="Total Users"
              value={stats?.totalUsers || 0}
              icon={<FiUsers />}
            />
          </>
        )}
      </div>

      {/* Recent Orders Table with Search */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <div className="relative">
            <input
              className="border border-gray-300 dark:border-gray-700 px-3 pl-8 py-1 rounded text-sm focus:ring-2 focus:ring-indigo-200 outline-none bg-gray-50 dark:bg-gray-800"
              type="text"
              placeholder="Search by ID/User..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {loadingOrders ? (
          <Skeleton className="h-44 w-full rounded " />
        ) : filteredOrders.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            <span>No recent orders found.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase tracking-wide text-xs">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.slice(0, 5).map((order, index) => (
                  <tr
                    key={order._id}
                    className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                  >
                    <td className="p-3 text-blue-600 dark:text-indigo-300 font-medium">
                      {order._id.slice(-6)}
                    </td>
                    <td className="p-3">{order.user?.name || "Unknown"}</td>
                    <td className="p-3">₹{order.totalAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === "processing"
                            ? "bg-indigo-100 text-indigo-700"
                            : order.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-3">
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
        )}
      </div>
    </div>
  );
}

// Reusable Dashboard Card Component
const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800 text-center transition hover:scale-105 duration-200">
    <div className="flex justify-center items-center mb-2 text-3xl text-indigo-500">{icon}</div>
    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">{title}</h3>
    <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">{value}</p>
  </div>
);

export default Dashboard;
