import { AuthProvider } from '../pages/context/AuthContext';  // Correct path to AuthContext
import ProtectedRoute from '../components/ProtectedRoute'; // Ensure ProtectedRoute path is correct
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { AppProps } from 'next/app';

const noAuthRequired = ['/', '/login', '/register']; // List of routes that do not require authentication

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        // For pages that do not require authentication
        <Component {...pageProps} />
      ) : (
        // For protected pages that require authentication
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp;
