
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { UserPlus, Mail, Lock, User, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: (data: { username: string; email: string; password: string }) =>
      apiRequest("POST", "/api/auth/register", data),
    onSuccess: () => {
      toast({ title: "Conta criada com sucesso!" });
      setLocation("/login");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "Verifique se as senhas são iguais",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Senha muito fraca",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PT</span>
                </div>
                <span className="text-xl font-bold text-white">Priston Wiki</span>
              </div>
            </Link>
            
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="bg-slate-800 border-gray-700">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Criar Conta
              </CardTitle>
              <p className="text-gray-400">
                Junte-se à comunidade Priston Tale
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Nome de Usuário
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Seu nome de usuário"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>

              <Separator className="my-6 border-gray-600" />

              <div className="text-center">
                <p className="text-gray-400">
                  Já tem uma conta?{" "}
                  <Link href="/login">
                    <span className="text-violet-400 hover:text-violet-300 font-medium cursor-pointer">
                      Fazer Login
                    </span>
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600">
                <p className="text-xs text-gray-400 text-center">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <span className="text-violet-400 hover:text-violet-300 cursor-pointer">
                    Termos de Uso
                  </span>{" "}
                  e{" "}
                  <span className="text-violet-400 hover:text-violet-300 cursor-pointer">
                    Política de Privacidade
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-white text-sm">Acesso Completo</h3>
                <p className="text-gray-400 text-xs">Todos os guias e tutoriais</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-semibold text-white text-sm">Comunidade</h3>
                <p className="text-gray-400 text-xs">Participe das discussões</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-white text-sm">Atualizações</h3>
                <p className="text-gray-400 text-xs">Novidades em primeira mão</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
