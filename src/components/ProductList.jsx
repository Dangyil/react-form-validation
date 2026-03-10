import { Trash2, Edit, Package } from 'lucide-react';

export default function ProductList({ products, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No products yet</p>
        <p className="text-gray-500 text-sm mt-1">Create your first product to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.description || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.userId?.username || 'Unknown'}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' :
                    product.status === 'inactive' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product._id} className="p-4 space-y-3 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{product.name}</p>
                {product.description && (
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                )}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                product.status === 'active' ? 'bg-green-100 text-green-700' :
                product.status === 'inactive' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {product.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Qty</p>
                <p className="font-semibold text-gray-900">{product.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Price</p>
                <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600">Total</p>
                <p className="font-semibold text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 py-2 px-3 bg-primary-100 text-primary-700 rounded text-sm font-medium hover:bg-primary-200 transition flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="flex-1 py-2 px-3 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
