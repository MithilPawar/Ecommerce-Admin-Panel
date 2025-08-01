// UsersPage.jsx
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService.js"
import UserTable from "../features/users/UserTable.jsx";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-800">Users</h2>
      <UserTable users={users} loading={loading} />
    </div>
  );
};

export default UsersPage;