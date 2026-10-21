import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Classic Oxford Shirt',
    category: 'Men > Shirts',
    price: 2499,
    stock: 45,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Slim Fit Chinos',
    category: 'Men > Trousers',
    price: 1999,
    stock: 32,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Minimal Leather Sneakers',
    category: 'Shoes > Men',
    price: 4999,
    stock: 18,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Midi Wrap Dress',
    category: 'Women > Dresses',
    price: 3499,
    stock: 0,
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    name: 'Bomber Jacket',
    category: 'Men > Jackets',
    price: 4999,
    stock: 12,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
  },
  {
    id: '6',
    name: 'Essential Crew Neck Tee',
    category: 'Men > T-Shirts',
    price: 999,
    stock: 67,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
  },
];

export function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-brand-900 dark:text-white">
            Products
          </h1>
          <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filters
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-50 dark:bg-brand-800">
              <tr>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-200 dark:divide-brand-800">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-brand-50 dark:hover:bg-brand-800">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="text-sm font-medium text-brand-900 dark:text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {product.category}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-brand-900 dark:text-white">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {product.stock}
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={product.status === 'active' ? 'success' : 'error'}
                      size="sm"
                    >
                      {product.status === 'active' ? 'Active' : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      </button>
                      <button className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-brand-200 dark:border-brand-800">
          <p className="text-sm text-brand-600 dark:text-brand-400">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Product Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-brand-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-brand-200 dark:border-brand-800">
              <h2 className="text-xl font-semibold text-brand-900 dark:text-white">
                Add New Product
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <Input label="Product Name" placeholder="Enter product name" />
              <Input label="Category" placeholder="Select category" />
              <Input label="Price" type="number" placeholder="0.00" />
              <Input label="Stock" type="number" placeholder="0" />
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-brand-200 dark:border-brand-700 rounded-lg bg-white dark:bg-brand-800 text-brand-900 dark:text-white"
                  rows={4}
                  placeholder="Enter product description"
                />
              </div>
            </div>
            <div className="p-6 border-t border-brand-200 dark:border-brand-800 flex gap-3">
              <Button fullWidth>Save Product</Button>
              <Button variant="outline" fullWidth onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
