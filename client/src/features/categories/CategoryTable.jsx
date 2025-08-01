import { FiEdit2, FiTrash2 } from "react-icons/fi";

function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="2" className="px-6 py-8 text-center text-gray-400">
                No categories found.
              </td>
            </tr>
          )}

          {categories.map((cat, idx) => (
            <tr
              key={cat._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-indigo-50 transition`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(cat)}
                    aria-label="Edit"
                    title="Edit"
                    className="p-2 rounded hover:bg-indigo-50 transition group"
                  >
                    <FiEdit2 className="text-indigo-600 group-hover:text-indigo-800 text-[1.1rem]" />
                  </button>
                  <button
                    onClick={() => onDelete(cat._id)}
                    aria-label="Delete"
                    title="Delete"
                    className="p-2 rounded hover:bg-red-50 transition group"
                  >
                    <FiTrash2 className="text-red-600 group-hover:text-red-800 text-[1.1rem]" />
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

export default CategoryTable;
