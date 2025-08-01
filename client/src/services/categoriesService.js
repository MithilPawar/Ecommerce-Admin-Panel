import API from "./api";

export const fetchAllCategories = async () => {
  const res = await API.get("/categories");
  return res.data.data;
};

export const createCategory = async (data) => {
  const res = await API.post("/categories", data);
  return res.data.data;
};

export const updateCategory = async (id, data) => {
  const res = await API.put(`/categories/${id}`, data);
  return res.data.data;
};

export const deleteCategory = async (id) => {
  const res = await API.delete(`/categories/${id}`);
  return res.data.data;
};
