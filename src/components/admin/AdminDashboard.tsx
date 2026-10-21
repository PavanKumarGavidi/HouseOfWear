import { 
  DollarSign, ShoppingBag, Users, Package, 
  TrendingUp, TrendingDown, ArrowUpRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock analytics data
const stats = [
  {
    label: 'Total Revenue',
    value: '₹12,45,890',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    label: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-blue-500',
  },
  {
    label: 'Total Customers',
    value: '856',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    label: 'Total Products',
    value: '245',
    change: '+3.1%',
    trend: 'up',
    icon: Package,
    color: 'bg-orange-500',
  },
];

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Arjun Sharma',
    email: 'arjun@example.com',
    total: 4999,
    status: 'delivered',
    date: '2024-01-15',
  },
  {
    id: 'ORD-2024-002',
    customer: 'Priya Patel',
    email: 'priya@example.com',
    total: 3499,
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: 'ORD-2024-003',
    customer: 'Rahul Kumar',
    email: 'rahul@example.com',
    total: 7999,
    status: 'shipped',
    date: '2024-01-14',
  },
  {
    id: 'ORD-2024-004',
    customer: 'Anita Singh',
    email: 'anita@example.com',
    total: 2499,
    status: 'pending',
    date: '2024-01-13',
  },
  {
    id: 'ORD-2024-005',
    customer: 'Vikram Reddy',
    email: 'vikram@example.com',
    total: 5999,
    status: 'delivered',
    date: '2024-01-13',
  },
];

const topProducts = [
  { name: 'Classic Oxford Shirt', sales: 145, revenue: 362055 },
  { name: 'Slim Fit Chinos', sales: 132, revenue: 263868 },
  { name: 'Minimal Leather Sneakers', sales: 98, revenue: 489902 },
  { name: 'Midi Wrap Dress', sales: 87, revenue: 304413 },
  { name: 'Bomber Jacket', sales: 76, revenue: 379924 },
];

export function AdminDashboard() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-brand-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-brand-600 dark:text-brand-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-brand-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-brand-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-900 dark:text-white">
              Revenue Overview
            </h2>
            <select className="text-sm border border-brand-200 dark:border-brand-700 rounded px-3 py-1.5 bg-white dark:bg-brand-800">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 78, 52, 89, 67, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-brand-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-900 dark:text-white">
              Top Products
            </h2>
            <Link
              to="/admin/products"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-brand-100 dark:bg-brand-800 flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-xs text-brand-500">{product.sales} sales</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-brand-900 dark:text-white">
                  ₹{product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-brand-900 rounded-lg border border-brand-200 dark:border-brand-800">
        <div className="flex items-center justify-between p-5 border-b border-brand-200 dark:border-brand-800">
          <h2 className="text-lg font-semibold text-brand-900 dark:text-white">
            Recent Orders
          </h2>
          <Link
            to="/admin/orders"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
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
                  Total
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider px-5 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-200 dark:divide-brand-800">
              {recentOrders.map((order) => (
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
                  <td className="px-5 py-4 text-sm font-semibold text-brand-900 dark:text-white">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : order.status === 'shipped'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
