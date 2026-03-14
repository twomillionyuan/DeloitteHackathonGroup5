import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipesPage from "./pages/RecipesPage";
import StatsPage from "./pages/StatsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import SetupQuizPage from "./pages/SetupQuizPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

// Protects routes — redirects to /login if not logged in
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
  
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/recipes" element={<PrivateRoute><RecipesPage /></PrivateRoute>} />
          <Route path="/recipes/:recipeId" element={<PrivateRoute><RecipeDetailPage /></PrivateRoute>} />
          <Route path="/stats" element={<PrivateRoute><StatsPage /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;