import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

// Mock coupons data
const mockCoupons = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrder: 1000,
    maxDiscount: 500,
    usage: 245,
    limit: 1000,
    status: 'active',
    expires: '2024-12-31',
  },
  {
    id: '2',
    code: 'SUMMER14',
    type: 'percentage',
    value: 14,
    minOrder: 5000,
    maxDiscount: 2000,
    usage: 89,
    limit: 500,
    status: 'active',
    expires: '2024-08-31',
  },
  {
    id: '3',
    code: 'FLAT500',
    type: 'flat',
    value: 500,
    minOrder: 3000,
    maxDiscount: null,
    usage: 156,
    limit: 2000,
    status: 'active',
    expires: '2024-06-30',
  },
  {
    id: '4',
    code: 'VIP20',
    type: 'percentage',
    value: 20,
    minOrder: 10000,
    maxDiscount: 1500,
    usage: 45,
    limit: 500,
    status: 'active',
    expires: '2024-12-31',
  },
  {
    id: '5',
    code: 'NEWYEAR25',
    type: 'percentage',
    value: 25,
    minOrder: 2000,
    maxDiscount: 1000,
    usage: 500,
    limit: 500,
    status: 'expired',
    expires: '2024-01-31',
  },
];

export function AdminCoupons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCoupons = mockCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-brand-900 dark:text-white">
            Coupons
          </h1>
          <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
            Manage discount codes and promotions
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Create Coupon
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-4">
        <Input
          placeholder="Search coupons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Coupons Table */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-50 dark:bg-brand-800">
              <tr>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Code
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Type
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Value
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Min Order
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Usage
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Expires
                </th>
                <th className="text-right text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-200 dark:divide-brand-800">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-brand-50 dark:hover:bg-brand-800">
                  <td className="px-5 py-4">
                    <code className="text-sm font-mono font-semibold text-brand-900 dark:text-white bg-brand-100 dark:bg-brand-800 px-2 py-1 rounded">
                      {coupon.code}
                    </code>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400 capitalize">
                    {coupon.type}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-brand-900 dark:text-white">
                    {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    ₹{coupon.minOrder.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-brand-200 dark:bg-brand-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(coupon.usage / coupon.limit) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-brand-600 dark:text-brand-400 whitespace-nowrap">
                        {coupon.usage}/{coupon.limit}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={coupon.status === 'active' ? 'success' : 'error'} size="sm">
                      {coupon.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {new Date(coupon.expires).toLocaleDateString()}
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
      </div>

      {/* Add Coupon Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-brand-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-brand-200 dark:border-brand-800">
              <h2 className="text-xl font-semibold text-brand-900 dark:text-white">
                Create New Coupon
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <Input label="Coupon Code" placeholder="e.g., SUMMER20" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                    Type
                  </label>
                  <select className="w-full px-3 py-2 border border-brand-200 dark:border-brand-700 rounded-lg bg-white dark:bg-brand-800">
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat Amount</option>
                  </select>
                </div>
                <Input label="Value" type="number" placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Minimum Order" type="number" placeholder="0" />
                <Input label="Maximum Discount" type="number" placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Usage Limit" type="number" placeholder="0" />
                <Input label="Expires On" type="date" />
              </div>
            </div>
            <div className="p-6 border-t border-brand-200 dark:border-brand-800 flex gap-3">
              <Button fullWidth>Create Coupon</Button>
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
