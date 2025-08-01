import { useAuth } from "../../context/AuthContext";
import { logoutAdmin } from "../../services/authService";

const Navbar = () => {
  const { adminUser, logout } = useAuth();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    try {
      await logoutAdmin(); 
      logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-md px-6 flex items-center justify-between z-20">
      <h1 className="text-xl font-bold text-blue-700">Admin Panel</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Hi, {adminUser?.name || "Admin"}
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
