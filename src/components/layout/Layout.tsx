import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileDrawer } from './MobileDrawer';
import { BottomTabBar } from './BottomTabBar';
import { CartDrawer } from './CartDrawer';
import { useUIStore } from '../../stores';
import { useEffect } from 'react';

export function Layout() {
  const { darkMode } = useUIStore();

  // Apply dark mode class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MobileDrawer />
      <CartDrawer />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
      <BottomTabBar />
      
      {/* Bottom padding for mobile tab bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
