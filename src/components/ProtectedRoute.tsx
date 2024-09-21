import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../pages/context/AuthContext'; // Assuming AuthContext exists

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Check authentication status after initial load
    if (!isAuthenticated) {
      // Store the current page the user tried to access
      const redirectUrl = router.asPath !== '/login' ? `?redirect=${router.asPath}` : '';
      router.push(`/login${redirectUrl}`); // Redirect to login page if not authenticated
    } else {
      setLoading(false); // Once authenticated, stop the loading state
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p> {/* Optional: Add a spinner here */}
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
