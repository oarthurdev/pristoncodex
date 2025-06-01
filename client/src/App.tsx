import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import HomePage from "@/pages/HomePage";
import PostPage from "@/pages/PostPage";
import CategoryPage from "@/pages/CategoryPage";
import DownloadsPage from "@/pages/DownloadsPage";
import VideosPage from "@/pages/VideosPage";
import SearchPage from "@/pages/SearchPage";
import ComunidadePage from "@/pages/ComunidadePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AdminPage from "@/pages/AdminPage";
import ForumPage from "@/pages/ForumPage";
import ContribuirPage from "@/pages/ContribuirPage";
import ReportarBugPage from "@/pages/ReportarBugPage";
import FAQPage from "@/pages/FAQPage";
import ContatoPage from "@/pages/ContatoPage";
import PoliticaPrivacidadePage from "@/pages/PoliticaPrivacidadePage";
import TermosUsoPage from "@/pages/TermosUsoPage";
import NotFoundPage from "@/pages/not-found";
import { AuthProvider } from "@/hooks/useAuth";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/post/:slug" component={PostPage} />
      <Route path="/categoria/:slug" component={CategoryPage} />
      <Route path="/downloads" component={DownloadsPage} />
      <Route path="/videos" component={VideosPage} />
      <Route path="/comunidade" component={ComunidadePage} />
      <Route path="/buscar" component={SearchPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/admin">
        <ProtectedRoute adminOnly={true}>
          <AdminPage />
        </ProtectedRoute>
      </Route>
      <Route path="/forum" component={ForumPage} />
      <Route path="/contribuir" component={ContribuirPage} />
      <Route path="/reportar-bug" component={ReportarBugPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/contato" component={ContatoPage} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidadePage} />
      <Route path="/termos-uso" component={TermosUsoPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;