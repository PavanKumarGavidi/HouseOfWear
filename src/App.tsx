import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initGA } from './utils/analytics';
import { router } from './router';
import { useEffect } from 'react';

// Initialize analytics in production
if (import.meta.env.PROD && import.meta.env.VITE_GA_MEASUREMENT_ID) {
  initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);
}

function App() {
  useEffect(() => {
    console.log('🏠 House of Wear - Premium Fashion E-commerce');
    console.log('📦 Phase 10: Optimization & Production Ready');
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
