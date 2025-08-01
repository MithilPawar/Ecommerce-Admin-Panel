import { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllCategories
} from "../services/dashboardService.js";

import ProductTable from "../features/products/ProductTable";
import ProductForm from "../features/products/ProductForm";
import ProductFilters from "../features/products/ProductFilters";
import { FiPlus, FiX } from "react-icons/fi";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [formOpenAnim, setFormOpenAnim] = useState(false);

  const loadProducts = async () => {
    const data = await fetchAllProducts(filters);
    setProducts(data);
  };

  const loadCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  const handleEdit = async (id) => {
    const product = await fetchSingleProduct(id);
    setEditingProduct(product);
    setShowForm(true);
    setTimeout(() => setFormOpenAnim(true), 10);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const handleSubmit = async (formData) => {
    if (editingProduct) {
      await updateProduct(editingProduct._id, formData);
    } else {
      await createProduct(formData);
    }
    closeForm();
    loadProducts();
  };

  const handleOpenForm = () => {
    setEditingProduct(null);
    setShowForm(true);
    setTimeout(() => setFormOpenAnim(true), 10);
  };

  const closeForm = () => {
    setFormOpenAnim(false);
    setTimeout(() => {
      setShowForm(false);
      setEditingProduct(null);
    }, 150); // matches transition duration
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-indigo-800">All Products</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your products with ease</p>
        </div>
        <div className="flex gap-3 items-end">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow transition"
            onClick={handleOpenForm}
          >
            <FiPlus className="text-lg" /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters filters={filters} onChange={setFilters} categories={categories} />

      {/* Responsive Modal-like Form */}
      {showForm && (
        <div className={`fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity ${formOpenAnim ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`relative w-full max-w-xl md:rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-transform duration-150 ${formOpenAnim ? 'scale-100' : 'scale-95'}`}>
            <button
              aria-label="Close form"
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl z-40"
            >
              <FiX />
            </button>
            <div className="px-8 py-8">
              <ProductForm
                onSubmit={handleSubmit}
                initialData={editingProduct}
                categories={categories}
              />
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProductsPage;
