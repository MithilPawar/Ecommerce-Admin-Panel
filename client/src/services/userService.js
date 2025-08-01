import API from "./api";

export const getAllUsers = async () => {
  const res = await API.get("/auth/admin/users/getUsers");
  return res.data.data;
};

export const updateUserRole = async (id, data) => {
  return await API.patch(`/auth/admin/users/${id}`, data);
};

export const assignUserRole = async (id, role) => {
  const res =  await API.put(`/auth/admin/users/${id}/role`, { role });
  return res.data.data;
};

export const getUserById = async (id) => {
  const res = await API.get(`auth/users/${id}`);
  return res.data.data;
  
};
