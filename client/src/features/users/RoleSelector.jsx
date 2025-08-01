import { useState } from "react";
import { FaUserShield, FaExclamationCircle } from "react-icons/fa";

const RoleSelector = ({ currentRole, onUpdate }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = async () => {
    if (selectedRole === currentRole) return;
    
    setUpdating(true);
    setError(null);
    
    try {
      await onUpdate(selectedRole);
    } catch (error) {
      setError("Failed to update role. Please try again.");
      setSelectedRole(currentRole); // Reset to original role
    }
    
    setUpdating(false);
  };

  const isChanged = selectedRole !== currentRole;

  const roleOptions = [
    { value: "user", label: "User", description: "Standard user permissions" },
    { value: "admin", label: "Administrator", description: "Full system access" }
  ];

  return (
    <div className="space-y-4">
      {/* Role Selection */}
      <div>
        <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Role
        </label>
        <select
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          disabled={updating}
        >
          {roleOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          {roleOptions.find(opt => opt.value === selectedRole)?.description}
        </p>
      </div>

      {/* Status Indicators */}
      {isChanged && (
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Role change pending - click update to apply
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
          <FaExclamationCircle />
          {error}
        </div>
      )}

      {/* Update Button */}
      <button
        onClick={handleChange}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
          updating
            ? "bg-gray-400 text-white cursor-not-allowed"
            : isChanged
            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        disabled={updating || !isChanged}
        aria-label={`Update role to ${selectedRole}`}
      >
        <FaUserShield />
        {updating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Updating Role...
          </div>
        ) : (
          "Update Role"
        )}
      </button>

      {/* Current Role Display */}
      <div className="text-center pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Current role: <span className="font-medium capitalize text-indigo-600">{currentRole}</span>
        </p>
      </div>
    </div>
  );
};

export default RoleSelector;
