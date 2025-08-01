import API from "./api.js";

export const loginAdmin = async (formData) => {
  try {
    const res = await API.post("/auth/login", formData);
    return res.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Login failed";
  }
};

export const logoutAdmin = async () => {
  try {
    const res = await API.post("/auth/logout");
    return res.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Logout failed";
  }
};
