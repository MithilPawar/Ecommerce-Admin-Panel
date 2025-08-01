import { useEffect, useState } from "react";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoriesService.js";
import CategoryForm from "../features/categories/CategoryForm";
import CategoryTable from "../features/categories/CategoryTable";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  const handleSubmit = async (formData) => {
    if (editingCategory) {
      await updateCategory(editingCategory._id, formData);
    } else {
      await createCategory(formData);
    }
    setShowForm(false);
    setEditingCategory(null);
    loadCategories();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your categories</p>
        </div>
        <button className="btn btn-blue" onClick={() => setShowForm(true)}>
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow relative">
          <CategoryForm
            onSubmit={handleSubmit}
            initialData={editingCategory}
            onCancel={handleCancel}
          />
        </div>
      )}

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CategoriesPage;
