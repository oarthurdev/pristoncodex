
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.permissionLevel !== "admin") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Acesso Negado</h1>
          <p className="text-gray-400 mb-6">Você não tem permissão para acessar esta página.</p>
          <p className="text-gray-500">Apenas administradores podem acessar o painel administrativo.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
