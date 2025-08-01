// src/components/Products/ProductFilters.jsx
function ProductFilters({ filters, onChange }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by category"
        className="border px-3 py-2 rounded"
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
      />

      <select
        value={filters.inStock}
        onChange={(e) => onChange({ ...filters, inStock: e.target.value })}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Stock</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
    </div>
  );
}

export default ProductFilters;
