import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Tag, 
  Settings, LogOut, Menu, X, ChevronRight, TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { twMerge } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Tag, label: 'Coupons', href: '/admin/coupons' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Admin guard - redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-brand-950">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between h-14 px-4 bg-white dark:bg-brand-900 border-b border-brand-200 dark:border-brand-800 sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-950 dark:bg-white rounded-sm flex items-center justify-center">
            <span className="text-white dark:text-brand-950 font-bold text-[8px]">H</span>
          </div>
          <span className="text-sm font-semibold">Admin Panel</span>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={twMerge(
            'fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-brand-900 border-r border-brand-200 dark:border-brand-800 flex flex-col z-40 transition-transform lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-brand-200 dark:border-brand-800">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-950 dark:bg-white rounded-sm flex items-center justify-center">
                <span className="text-white dark:text-brand-950 font-bold text-xs">H</span>
              </div>
              <div>
                <p className="text-sm font-semibold">House Of Wear</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-500">Admin Panel</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-brand-100 dark:hover:bg-brand-800 rounded"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/admin' && location.pathname.startsWith(item.href));
                const Icon = item.icon;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={twMerge(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium'
                          : 'text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-800'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="border-t border-brand-200 dark:border-brand-800 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-brand-200 dark:bg-brand-700 flex items-center justify-center">
                <span className="text-xs font-medium">{user.full_name?.[0] || 'A'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.full_name || 'Admin'}</p>
                <p className="text-xs text-brand-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); window.location.href = '/'; }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
