import { useState } from 'react';
import { Search, Filter, Eye, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Arjun Sharma',
    email: 'arjun@example.com',
    items: 3,
    total: 4999,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-15',
  },
  {
    id: 'ORD-2024-002',
    customer: 'Priya Patel',
    email: 'priya@example.com',
    items: 2,
    total: 3499,
    status: 'processing',
    payment: 'paid',
    date: '2024-01-14',
  },
  {
    id: 'ORD-2024-003',
    customer: 'Rahul Kumar',
    email: 'rahul@example.com',
    items: 5,
    total: 7999,
    status: 'shipped',
    payment: 'paid',
    date: '2024-01-14',
  },
  {
    id: 'ORD-2024-004',
    customer: 'Anita Singh',
    email: 'anita@example.com',
    items: 1,
    total: 2499,
    status: 'pending',
    payment: 'pending',
    date: '2024-01-13',
  },
  {
    id: 'ORD-2024-005',
    customer: 'Vikram Reddy',
    email: 'vikram@example.com',
    items: 4,
    total: 5999,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-13',
  },
  {
    id: 'ORD-2024-006',
    customer: 'Sneha Gupta',
    email: 'sneha@example.com',
    items: 2,
    total: 3999,
    status: 'cancelled',
    payment: 'refunded',
    date: '2024-01-12',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const paymentColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-brand-900 dark:text-white">
          Orders
        </h1>
        <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-brand-200 dark:border-brand-700 rounded-lg bg-white dark:bg-brand-800 text-brand-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-50 dark:bg-brand-800">
              <tr>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Payment
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Date
                </th>
                <th className="text-right text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-200 dark:divide-brand-800">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-50 dark:hover:bg-brand-800">
                  <td className="px-5 py-4 text-sm font-medium text-brand-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-brand-900 dark:text-white">
                        {order.customer}
                      </p>
                      <p className="text-xs text-brand-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {order.items}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-brand-900 dark:text-white">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[order.status as keyof typeof statusColors]
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        paymentColors[order.payment as keyof typeof paymentColors]
                      }`}
                    >
                      {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors">
                      <Eye className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-brand-200 dark:border-brand-800">
          <p className="text-sm text-brand-600 dark:text-brand-400">
            Showing {filteredOrders.length} of {mockOrders.length} orders
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
    </div>
  );
}
