import { AuthProvider } from './context/AuthContext';  // Correct path
import ProtectedRoute from '../components/ProtectedRoute'; // Protected route component
import { useRouter } from 'next/router';
import '../styles/globals.css';

const noAuthRequired = ['/', '/login', '/register']; // Routes that do not require authentication

export default function App({ Component, pageProps }: any) {
  const router = useRouter();

  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
