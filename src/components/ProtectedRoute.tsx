import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to login if no token is found
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>; // Only render children if token exists
};

export default ProtectedRoute;
