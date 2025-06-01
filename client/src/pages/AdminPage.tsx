import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminPanel from "@/components/admin/AdminPanel";
import { 
  BarChart3, 
  FileText, 
  Download, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Activity,
  Calendar
} from "lucide-react";
import { formatRelativeTime } from "@/lib/supabase";

export default function AdminPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/statistics"],
  });

  const { data: recentPosts } = useQuery({
    queryKey: ["/api/posts", { limit: 5 }],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: downloads } = useQuery({
    queryKey: ["/api/downloads"],
  });

  // Mock analytics data (would come from a real analytics service)
  const analyticsData = {
    dailyViews: [
      { date: "2024-01-01", views: 1240 },
      { date: "2024-01-02", views: 1380 },
      { date: "2024-01-03", views: 1120 },
      { date: "2024-01-04", views: 1450 },
      { date: "2024-01-05", views: 1680 },
      { date: "2024-01-06", views: 1520 },
      { date: "2024-01-07", views: 1750 },
    ],
    topPages: [
      { path: "/post/guia-iniciante-fighter", views: 2340, title: "Guia Iniciante Fighter" },
      { path: "/downloads", views: 1890, title: "Downloads" },
      { path: "/post/configurando-servidor", views: 1560, title: "Configurando Servidor" },
      { path: "/categoria/desenvolvimento", views: 1240, title: "Desenvolvimento" },
      { path: "/post/pvp-estrategias", views: 980, title: "Estratégias PvP" },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Admin Header */}
      <section className="relative bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Painel Administrativo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Gerencie conteúdo, usuários e monitore as estatísticas do site
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-gray-700">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total de Posts</p>
                      {statsLoading ? (
                        <Skeleton className="h-8 w-16 mt-1" />
                      ) : (
                        <p className="text-3xl font-bold text-violet-400">{stats?.totalPosts || 0}</p>
                      )}
                    </div>
                    <FileText className="w-8 h-8 text-violet-400" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">+12% este mês</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Downloads</p>
                      {statsLoading ? (
                        <Skeleton className="h-8 w-16 mt-1" />
                      ) : (
                        <p className="text-3xl font-bold text-green-400">{stats?.totalDownloads || 0}</p>
                      )}
                    </div>
                    <Download className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">+8% este mês</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Usuários</p>
                      {statsLoading ? (
                        <Skeleton className="h-8 w-16 mt-1" />
                      ) : (
                        <p className="text-3xl font-bold text-blue-400">{stats?.totalUsers || 0}</p>
                      )}
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">+25% este mês</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Visualizações</p>
                      <p className="text-3xl font-bold text-amber-400">
                        {recentPosts?.reduce((sum: number, post: any) => sum + post.views, 0) || 0}
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">+18% este mês</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Posts Recentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts?.slice(0, 5).map((post: any) => (
                      <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-white truncate">{post.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatRelativeTime(post.createdAt)}
                            </span>
                          </div>
                        </div>
                        <Badge className={`${post.published ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Categorias por Conteúdo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories?.map((category: any) => {
                      const postCount = recentPosts?.filter((post: any) => post.categoryId === category.id).length || 0;
                      return (
                        <div key={category.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-${category.color}-600 rounded-lg flex items-center justify-center text-white text-sm`}>
                              {category.name.charAt(0)}
                            </div>
                            <span className="font-medium text-white">{category.name}</span>
                          </div>
                          <Badge className="bg-gray-700 text-gray-300">
                            {postCount} posts
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gerenciar Conteúdo</h2>
              <AdminPanel />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Posts por Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Publicados</span>
                      <Badge className="bg-green-600 text-white">
                        {recentPosts?.filter((post: any) => post.published).length || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Rascunhos</span>
                      <Badge className="bg-gray-600 text-white">
                        {recentPosts?.filter((post: any) => !post.published).length || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Em Destaque</span>
                      <Badge className="bg-violet-600 text-white">
                        {recentPosts?.filter((post: any) => post.featured).length || 0}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Posts por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tutoriais</span>
                      <Badge className="bg-green-600 text-white">
                        {recentPosts?.filter((post: any) => post.type === 'tutorial').length || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Artigos</span>
                      <Badge className="bg-blue-600 text-white">
                        {recentPosts?.filter((post: any) => post.type === 'artigo').length || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Vídeos</span>
                      <Badge className="bg-purple-600 text-white">
                        {recentPosts?.filter((post: any) => post.type === 'video').length || 0}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                    Criar Novo Post
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Adicionar Download
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Nova Categoria
                  </Button>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Gerenciar Menus
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Downloads Management Tab */}
          <TabsContent value="downloads" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gerenciar Downloads</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Adicionar Download
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloads?.slice(0, 6).map((download: any) => (
                <Card key={download.id} className="bg-slate-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-white mb-2">{download.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{download.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{download.fileSize}</span>
                      <Badge className="bg-green-600 text-white">
                        {download.downloadCount} downloads
                      </Badge>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Editar
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1">
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gerenciar Usuários</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Convidar Usuário
              </Button>
            </div>

            <Card className="bg-slate-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Gerenciamento de Usuários</h3>
                <p className="text-gray-400 mb-6">
                  Funcionalidade completa de gerenciamento de usuários será implementada em breve.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">Admin</div>
                    <div className="text-gray-400 text-sm">1 usuário</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">Editor</div>
                    <div className="text-gray-400 text-sm">0 usuários</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">Usuário</div>
                    <div className="text-gray-400 text-sm">0 usuários</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                Exportar Relatório
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Páginas Mais Visitadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{page.title}</h4>
                          <p className="text-gray-400 text-sm">{page.path}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-violet-400">{page.views.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">visualizações</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Métricas Semanais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400">Visualizações Totais</span>
                      <span className="font-bold text-violet-400">
                        {analyticsData.dailyViews.reduce((sum, day) => sum + day.views, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400">Média Diária</span>
                      <span className="font-bold text-green-400">
                        {Math.round(analyticsData.dailyViews.reduce((sum, day) => sum + day.views, 0) / analyticsData.dailyViews.length).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400">Melhor Dia</span>
                      <span className="font-bold text-amber-400">
                        {Math.max(...analyticsData.dailyViews.map(d => d.views)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400">Taxa de Crescimento</span>
                      <span className="font-bold text-blue-400">+15.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
