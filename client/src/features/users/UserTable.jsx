import { Link } from "react-router-dom";
import { FaUserEdit, FaTrash } from "react-icons/fa";

const UserTable = ({ users, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4">
    <table className="min-w-full text-sm text-left border-separate border-spacing-0">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-5 font-bold text-gray-700 tracking-wide uppercase text-xs">Name</th>
          <th className="p-5 font-bold text-gray-700 tracking-wide uppercase text-xs">Email</th>
          <th className="p-5 font-bold text-gray-700 tracking-wide uppercase text-xs">Role</th>
          <th className="p-5 font-bold text-gray-700 tracking-wide uppercase text-xs">Status</th>
          <th className="p-5 font-bold text-gray-700 uppercase text-xs text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center text-gray-400 py-8">
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user, idx) => (
            <tr
              key={user._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-indigo-50/70 transition`}
            >
              <td className="p-5">{user.name}</td>
              <td className="p-5">{user.email}</td>
              <td className="p-5 capitalize text-indigo-600 font-medium">{user.role}</td>
              <td className="p-5">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    user.isDeleted
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.isDeleted ? "Inactive" : "Active"}
                </span>
              </td>
              <td className="p-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    to={`/users/${user._id}`}
                    className="inline-flex items-center justify-center rounded-md p-2 transition hover:bg-indigo-100 text-indigo-600 hover:text-indigo-800"
                    aria-label={`Edit ${user.name}`}
                    title="Edit"
                  >
                    <FaUserEdit />
                  </Link>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="inline-flex items-center justify-center rounded-md p-2 transition hover:bg-red-100 text-red-500 hover:text-red-700"
                    aria-label={`Delete ${user.name}`}
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default UserTable;
