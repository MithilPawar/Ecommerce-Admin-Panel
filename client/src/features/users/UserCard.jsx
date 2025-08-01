import { FaUser, FaEnvelope, FaUserTag, FaCircle } from "react-icons/fa";

const UserCard = ({ user }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
            {getInitials(user.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-indigo-100 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <FaUserTag />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role</p>
              <p className="text-sm font-medium text-gray-800 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${user.isDeleted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
              <FaCircle />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
              <p className="text-sm font-medium text-gray-800">
                {user.isDeleted ? "Inactive" : "Active"}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isDeleted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
            {user.isDeleted ? "Inactive" : "Active"}
          </span>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            User ID: <span className="font-mono">{user._id}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
