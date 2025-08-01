import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUserRole, getUserById } from "../services/userService.js";
import { FaArrowLeft, FaUser, FaExclamationTriangle } from "react-icons/fa";
import UserCard from '../features/users/UserCard.jsx';
import RoleSelector from "../features/users/RoleSelector.jsx";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      setError("Failed to load user details. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleRoleUpdate = async (newRole) => {
    try {
      await updateUserRole(user._id, newRole);
      await fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Role update failed", error);
      throw error; // Re-throw to let RoleSelector handle the error state
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {error ? "Error Loading User" : "User Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The requested user could not be found."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            {error && (
              <button
                onClick={fetchUser}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <FaUser />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
                <p className="text-gray-600 text-sm">Manage user information and permissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Information Card */}
          <div className="lg:col-span-2">
            <UserCard user={user} />
          </div>

          {/* Role Management Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                Role Management
              </h3>
              <RoleSelector currentRole={user.role} onUpdate={handleRoleUpdate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
