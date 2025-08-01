import { FaEdit, FaTrash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 bg-white">
      <table className="min-w-full text-sm border-collapse">
        <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur rounded-t-xl border-b">
          <tr>
            <th className="p-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Image</th>
            <th className="p-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Name</th>
            <th className="p-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Price</th>
            <th className="p-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Stock</th>
            <th className="p-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Category</th>
            <th className="p-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-10 text-gray-400">
                No products found.
              </td>
            </tr>
          )}
          {products.map((product, idx) => (
            <tr
              key={product._id}
              className={`transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 group`}
            >
              <td className="p-3">
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded border border-gray-200 shadow-sm bg-white"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center border border-gray-200 text-xs text-gray-300">
                    No image
                  </div>
                )}
              </td>
              <td className="p-3 max-w-[140px]">
                <span className="block font-medium truncate" title={product.name}>
                  {product.name}
                </span>
              </td>
              <td className="p-3 text-indigo-700 font-semibold whitespace-nowrap">
                ₹{product.price}
              </td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3 max-w-[120px]">
                <span className="block truncate text-gray-700" title={product.category?.name}>
                  {product.category?.name || <span className="text-gray-300">N/A</span>}
                </span>
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center gap-1 justify-center">
                  {/* View Action */}
                  <Link
                    to={`/products/${product._id}`}
                    className="group relative p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    title="View"
                  >
                    <FaRegEye className="text-indigo-600 text-base" />
                    <span className="sr-only">View</span>
                    <div className="pointer-events-none absolute left-1/2 -bottom-8 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition text-xs bg-indigo-700 text-white rounded py-0.5 px-2 whitespace-nowrap shadow z-10">
                      View
                    </div>
                  </Link>
                  {/* Edit Action */}
                  <button
                    className="group relative p-2 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    title="Edit"
                    onClick={() => onEdit(product._id)}
                  >
                    <FaEdit className="text-blue-600 group-hover:text-blue-800 text-base" />
                    <span className="sr-only">Edit</span>
                    <div className="pointer-events-none absolute left-1/2 -bottom-8 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition text-xs bg-blue-700 text-white rounded py-0.5 px-2 whitespace-nowrap shadow z-10">
                      Edit
                    </div>
                  </button>
                  {/* Delete Action */}
                  <button
                    className="group relative p-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                    title="Delete"
                    onClick={() => onDelete(product._id)}
                  >
                    <FaTrash className="text-red-600 group-hover:text-red-800 text-base" />
                    <span className="sr-only">Delete</span>
                    <div className="pointer-events-none absolute left-1/2 -bottom-8 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition text-xs bg-red-700 text-white rounded py-0.5 px-2 whitespace-nowrap shadow z-10">
                      Delete
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
