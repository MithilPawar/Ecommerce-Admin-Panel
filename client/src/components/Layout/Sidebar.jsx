import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaThList, FaBars } from "react-icons/fa";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: <FaTachometerAlt className="text-lg" /> },
  { label: "Products", to: "/products", icon: <FaBoxOpen className="text-lg" /> },
  { label: "Orders", to: "/orders", icon: <FaShoppingCart className="text-lg" /> },
  { label: "Categories", to: "/categories", icon: <FaThList className="text-lg" /> },
  { label: "Users", to: "/users", icon: <FaThList className="text-lg" /> },
];

const Sidebar = ({ isCollapsed: externalCollapse = false, setIsCollapsed: setExternalCollapsed }) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Prioritize external collapse control if provided by Layout
  const collapsed = setExternalCollapsed ? externalCollapse : internalCollapsed;
  const toggleCollapse = () => {
    setExternalCollapsed
      ? setExternalCollapsed((prev) => !prev)
      : setInternalCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`h-full bg-gradient-to-b from-white via-[#f8fafc] to-[#f0f4fa] shadow-lg border-r transition-all duration-300
        ${collapsed ? "w-20" : "w-64"} overflow-hidden flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="mt-4 px-2">
        <button
          onClick={toggleCollapse}
          className="flex items-center gap-3 px-4 py-2 rounded-xl font-medium bg-white shadow hover:bg-indigo-50 transition w-full"
        >
          <FaBars className="text-lg" />
          {!collapsed && <span className="truncate">Menu</span>}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500 shadow-sm"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`
            }
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className={`mt-auto px-4 pb-4 pt-2 text-xs text-gray-400 text-center ${collapsed ? "hidden" : ""}`}>
        &copy; {new Date().getFullYear()} YourCompany
      </div>
    </aside>
  );
};

export default Sidebar;
