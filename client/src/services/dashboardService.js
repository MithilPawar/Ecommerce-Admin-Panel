import API from "./api";

export const fetchDashboardStats = async () => {
  const res = await API.get("/dashboard/stats");
  return res.data.data;
};

export const getAllOrders = async () => {
  const res = await API.get("/orders");
  return res.data.data;
};

export const filterOrders = async (Queryparams) => {
  const res = await API.get("/orders/filter", { params: Queryparams });
  return res.data.data;
};

export const createProduct = async (formData) => {
  const res = await API.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateProduct = async (id, formData) => {
  const res = await API.put(`/product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const fetchAllProducts = async (filters = {}) => {
  const query = new URLSearchParams();

  if (filters.category) query.append("category", filters.category);
  if (filters.inStock) query.append("inStock", filters.inStock);
  if (filters.minPrice) query.append("minPrice", filters.minPrice);
  if (filters.maxPrice) query.append("maxPrice", filters.maxPrice);
  if (filters.sortBy) query.append("sortBy", filters.sortBy);

  const res = await API.get(`/product?${query.toString()}`);
  return res.data.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/product/${id}`);
  return res.data.data;
};

export const fetchSingleProduct = async (id) => {
  const res = await API.get(`/product/${id}`);
  return res.data.data;
};

export const fetchAllCategories = async () => {
  const res = await API.get("/categories");
  return res.data.data;
};
