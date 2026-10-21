import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, User, Menu, X, ChevronRight, 
  Check, Database, Shield, Zap, Layers, Code, ArrowRight,
  Package, CreditCard, Truck, Star, Globe, Lock
} from 'lucide-react';

// ============================================
// House Of Wear - Phase 1 Status Dashboard
// ============================================

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'files' | 'setup'>('overview');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-xs tracking-tighter">H</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  House Of Wear
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Phase 1 Complete</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                <Check className="w-3 h-3" />
                Phase 1 Ready
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-4 opacity-60">Supabase + TypeScript</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Database & Auth<br />
              <span className="font-normal italic">Infrastructure</span>
            </h2>
            <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete PostgreSQL schema with 25 tables, Row Level Security policies, 
              atomic order placement, auto-profile creation, and 40+ seeded products 
              ready for the House Of Wear e-commerce platform.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 sm:mt-16"
          >
            {[
              { label: 'Tables', value: '25', icon: Database },
              { label: 'Products', value: '40+', icon: Package },
              { label: 'RLS Policies', value: '50+', icon: Shield },
              { label: 'Functions', value: '10+', icon: Zap },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`p-4 sm:p-6 rounded-xl border text-center ${
                  darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'
                }`}
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="text-2xl sm:text-3xl font-light">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-wider opacity-50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-0 overflow-x-auto">
            {(['overview', 'database', 'files', 'setup'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-4 text-xs uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? `border-current ${darkMode ? 'text-white' : 'text-black'}`
                    : `border-transparent opacity-50 hover:opacity-100`
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab darkMode={darkMode} />}
            {activeTab === 'database' && <DatabaseTab darkMode={darkMode} />}
            {activeTab === 'files' && <FilesTab darkMode={darkMode} />}
            {activeTab === 'setup' && <SetupTab darkMode={darkMode} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className={`border-t py-8 ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40">
            House Of Wear — Phase 1 of 10 — Say "next" to continue
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// Tab Components
// ============================================

function OverviewTab({ darkMode }: { darkMode: boolean }) {
  const features = [
    { icon: Database, title: 'Complete Schema', desc: '25 tables with proper indexes, constraints, and foreign keys' },
    { icon: Shield, title: 'Row Level Security', desc: '50+ policies ensuring data isolation between users' },
    { icon: Zap, title: 'Atomic Functions', desc: 'place_order() validates stock, decrements, creates order in one transaction' },
    { icon: Layers, title: 'Auto Triggers', desc: 'Profile creation, timestamps, search vectors, discount calculation' },
    { icon: Package, title: '40+ Products', desc: 'Seeded across Men, Women, Kids, Shoes with variants and images' },
    { icon: CreditCard, title: 'Commerce Ready', desc: 'Coupons, loyalty points, gift cards, returns, reviews' },
    { icon: Truck, title: 'Delivery System', desc: 'Pincode serviceability, COD availability, ETA calculation' },
    { icon: Lock, title: 'Auth Configured', desc: 'Email OTP, Phone OTP, Google OAuth with middleware' },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${
            darkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-gray-50 border-gray-100 hover:border-gray-200'
          }`}
        >
          <feature.icon className={`w-5 h-5 mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
          <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DatabaseTab({ darkMode }: { darkMode: boolean }) {
  const tables = [
    { name: 'profiles', desc: 'User profiles extending auth.users', rows: '—' },
    { name: 'addresses', desc: 'Shipping addresses', rows: '—' },
    { name: 'sections', desc: 'Men / Women / Kids / Shoes', rows: '4' },
    { name: 'categories', desc: 'Nested product categories', rows: '26+' },
    { name: 'collections', desc: 'Curated product groups', rows: '6' },
    { name: 'products', desc: 'Product catalog with full-text search', rows: '40' },
    { name: 'product_variants', desc: 'Size × color with per-variant stock', rows: '60+' },
    { name: 'product_images', desc: 'Product media gallery', rows: '50+' },
    { name: 'collection_products', desc: 'Collection ↔ Product mapping', rows: '—' },
    { name: 'inventory_movements', desc: 'Stock change audit trail', rows: '—' },
    { name: 'wishlists', desc: 'User saved items', rows: '—' },
    { name: 'carts', desc: 'Shopping cart (user + guest)', rows: '—' },
    { name: 'cart_items', desc: 'Cart line items', rows: '—' },
    { name: 'coupons', desc: 'Discount codes with rules', rows: '5' },
    { name: 'orders', desc: 'Order management', rows: '—' },
    { name: 'order_items', desc: 'Order line items (price snapshot)', rows: '—' },
    { name: 'returns', desc: 'Return/exchange flow', rows: '—' },
    { name: 'reviews', desc: 'Product reviews with photos', rows: '—' },
    { name: 'back_in_stock_requests', desc: 'Restock notifications', rows: '—' },
    { name: 'pincodes', desc: 'Delivery serviceability', rows: '20' },
    { name: 'loyalty_transactions', desc: 'Points earn/redeem ledger', rows: '—' },
    { name: 'gift_cards', desc: 'Gift card management', rows: '—' },
    { name: 'store_locations', desc: 'Physical store info', rows: '3' },
    { name: 'newsletter_subscribers', desc: 'Email marketing list', rows: '—' },
    { name: 'banners', desc: 'CMS homepage banners', rows: '6' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Database Tables
      </h3>
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        25 tables with full-text search, JSONB snapshots, and proper indexing
      </p>
      <div className={`rounded-xl border overflow-hidden ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
                <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider opacity-60">Table</th>
                <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider opacity-60">Purpose</th>
                <th className="text-right px-4 py-3 font-medium text-xs uppercase tracking-wider opacity-60">Seed Rows</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, i) => (
                <tr key={table.name} className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <td className="px-4 py-2.5">
                    <code className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {table.name}
                    </code>
                  </td>
                  <td className={`px-4 py-2.5 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{table.desc}</td>
                  <td className="px-4 py-2.5 text-right text-xs opacity-60">{table.rows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilesTab({ darkMode }: { darkMode: boolean }) {
  const files = [
    { path: '.env.example', type: 'config', desc: 'Environment variables template' },
    { path: 'supabase/migrations/001_initial_schema.sql', type: 'sql', desc: 'All tables, indexes, constraints' },
    { path: 'supabase/migrations/002_rls_policies.sql', type: 'sql', desc: 'Row Level Security policies' },
    { path: 'supabase/migrations/003_functions_triggers.sql', type: 'sql', desc: 'Functions, triggers, views' },
    { path: 'supabase/migrations/004_seed_data.sql', type: 'sql', desc: '40+ products, variants, images' },
    { path: 'src/types/database.ts', type: 'ts', desc: 'TypeScript types for all tables' },
    { path: 'src/lib/supabase/client.ts', type: 'ts', desc: 'Supabase browser client' },
    { path: 'src/lib/supabase/auth.ts', type: 'ts', desc: 'Auth helpers (OTP, Google)' },
    { path: 'src/lib/supabase/auth-middleware.ts', type: 'ts', desc: 'Auth state & route guards' },
    { path: 'src/lib/supabase/storage.ts', type: 'ts', desc: 'File upload helpers' },
    { path: 'src/vite-env.d.ts', type: 'ts', desc: 'Vite environment types' },
    { path: 'PHASE_1_README.md', type: 'md', desc: 'Setup instructions & testing checklist' },
  ];

  const typeColors: Record<string, string> = {
    sql: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    ts: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    config: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    md: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Files Created
      </h3>
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        12 files across configuration, migrations, and client-side code
      </p>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.path}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              darkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-100 hover:border-gray-200'
            } transition-colors`}
          >
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium ${typeColors[file.type]}`}>
              {file.type}
            </span>
            <div className="flex-1 min-w-0">
              <code className="text-xs truncate block">{file.path}</code>
              <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{file.desc}</p>
            </div>
            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupTab({ darkMode }: { darkMode: boolean }) {
  const steps = [
    { num: '01', title: 'Create Supabase Project', desc: 'Go to supabase.com → New Project → Note URL and anon key' },
    { num: '02', title: 'Configure Environment', desc: 'Copy .env.example to .env.local and fill in your credentials' },
    { num: '03', title: 'Run Migrations', desc: 'Execute SQL files in order in Supabase SQL Editor' },
    { num: '04', title: 'Enable Auth Providers', desc: 'Configure Email OTP, Phone OTP, and Google OAuth' },
    { num: '05', title: 'Create Storage Bucket', desc: 'Create "product-images" bucket (public) in Supabase Storage' },
    { num: '06', title: 'Create Admin User', desc: 'Sign up then UPDATE profiles SET role = \'admin\' WHERE email = \'...\';' },
    { num: '07', title: 'Start Development', desc: 'Run npm run dev and proceed to Phase 2' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Setup Instructions
      </h3>
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        Follow these steps to get your Supabase backend running
      </p>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
              darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}>
              {step.num}
            </div>
            <div className="flex-1 pt-1">
              <h4 className="font-medium text-sm">{step.title}</h4>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Key Commands */}
      <div className={`mt-8 p-4 rounded-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
        <h4 className="text-xs uppercase tracking-wider font-medium mb-3 opacity-60">Quick Commands</h4>
        <div className="space-y-2 font-mono text-xs">
          <div className={`p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <span className="opacity-50">$</span> cp .env.example .env.local
          </div>
          <div className={`p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <span className="opacity-50">$</span> npm run dev
          </div>
          <div className={`p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <span className="opacity-50">$</span> npm run typecheck
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
