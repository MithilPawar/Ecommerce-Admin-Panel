import { useState } from "react";

function ProductForm({ onSubmit, initialData = {}, categories = [] }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category:
      initialData?.category && typeof initialData.category === "object"
        ? initialData.category._id
        : "",
    stock: initialData?.stock || "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    images.forEach((file) => data.append("images", file));
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 w-full"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="block mt-2"
      />
      {images.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {Array.from(images).map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-16 h-16 object-cover rounded border"
            />
          ))}
        </div>
      )}

      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded px-4 py-2 transition"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default ProductForm;
