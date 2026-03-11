import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CustomerTracking } from "./pages/CustomerTracking";
import { Orders } from "./pages/Orders";
import { Riders } from "./pages/Riders";
import { Settings } from "./pages/Settings";
import { Reports } from "./pages/Reports";
import { CustomerFeedback } from "./pages/CustomerFeedback";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { APIProvider } from "@vis.gl/react-google-maps";

const queryClient = new QueryClient();

// Simple component to protect routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <APIProvider apiKey={API_KEY} libraries={['places']}>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/track/:orderId" element={<CustomerTracking />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/riders" element={<ProtectedRoute><Riders /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><CustomerFeedback /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </APIProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

