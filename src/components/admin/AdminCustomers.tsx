import { useState } from 'react';
import { Search, Mail, Eye } from 'lucide-react';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

// Mock customers data
const mockCustomers = [
  {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    orders: 12,
    spent: 45990,
    joined: '2023-06-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 43211',
    orders: 8,
    spent: 28490,
    joined: '2023-08-22',
    status: 'active',
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 98765 43212',
    orders: 15,
    spent: 67890,
    joined: '2023-03-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'Anita Singh',
    email: 'anita@example.com',
    phone: '+91 98765 43213',
    orders: 3,
    spent: 8990,
    joined: '2024-01-05',
    status: 'active',
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    email: 'vikram@example.com',
    phone: '+91 98765 43214',
    orders: 20,
    spent: 89990,
    joined: '2022-11-20',
    status: 'active',
  },
];

export function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-brand-900 dark:text-white">
          Customers
        </h1>
        <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
          Manage your customer base
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-4">
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-50 dark:bg-brand-800">
              <tr>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Phone
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Orders
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Total Spent
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Joined
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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-brand-50 dark:hover:bg-brand-800">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-200 dark:bg-brand-700 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {customer.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-900 dark:text-white">
                          {customer.name}
                        </p>
                        <p className="text-xs text-brand-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {customer.phone}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-brand-900 dark:text-white">
                    {customer.orders}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-brand-900 dark:text-white">
                    ₹{customer.spent.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {new Date(customer.joined).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="success" size="sm">
                      {customer.status}
                    </Badge>
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
            Showing {filteredCustomers.length} of {mockCustomers.length} customers
          </p>
        </div>
      </div>
    </div>
  );
}
