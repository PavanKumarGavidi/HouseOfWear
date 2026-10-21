import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, Award, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useWishlistStore } from '../../stores';

export function AccountDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const wishlistCount = useWishlistStore((state) => state.items.length);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your personal information',
      href: '/account/profile',
    },
    {
      icon: Package,
      title: 'Orders',
      description: 'View your order history',
      href: '/account/orders',
    },
    {
      icon: MapPin,
      title: 'Addresses',
      description: 'Manage your delivery addresses',
      href: '/account/addresses',
    },
    {
      icon: Heart,
      title: 'Wishlist',
      description: `${wishlistCount} items saved`,
      href: '/wishlist',
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    {
      icon: Award,
      title: 'Loyalty Points',
      description: `${user.loyalty_points.toLocaleString()} points available`,
      href: '/account/points',
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Account preferences',
      href: '/account/settings',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
            My Account
          </h1>
          <p className="text-sm text-brand-600 dark:text-brand-400">
            Welcome back, {user.full_name || 'User'}
          </p>
        </div>
        <Button onClick={handleLogout} variant="ghost" leftIcon={<LogOut className="w-4 h-4" />}>
          Logout
        </Button>
      </div>

      {/* User Info Card */}
      <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-800 flex items-center justify-center">
            <User className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{user.full_name}</h2>
            <p className="text-sm text-brand-600 dark:text-brand-400">{user.email}</p>
            {user.phone && (
              <p className="text-sm text-brand-600 dark:text-brand-400">{user.phone}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-brand-900 dark:text-white">
              {user.loyalty_points.toLocaleString()}
            </p>
            <p className="text-xs text-brand-600 dark:text-brand-400">Loyalty Points</p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="group border border-brand-200 dark:border-brand-700 rounded-lg p-5 hover:border-brand-400 dark:hover:border-brand-500 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-900 group-hover:bg-brand-100 dark:group-hover:bg-brand-800 transition-colors">
                <item.icon className="w-5 h-5 text-brand-700 dark:text-brand-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-brand-900 dark:bg-white text-white dark:text-brand-900 text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-brand-600 dark:text-brand-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
