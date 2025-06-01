
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/content/PostCard";
import { Users, MessageSquare, Trophy, Star, TrendingUp, Calendar, User, Heart } from "lucide-react";
import { useState } from "react";

export default function ComunidadePage() {
  const [activeTab, setActiveTab] = useState("posts");

  const { data: allPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/statistics"],
  });

  // Separar posts por tipo de conteúdo da comunidade
  const discussionPosts = allPosts?.filter((post: any) => 
    post.type === "discussao" || post.content?.includes("discussão") || post.content?.includes("dúvida")
  ) || [];

  const featuredPosts = allPosts?.filter((post: any) => post.featured) || [];
  const recentPosts = allPosts?.slice(0, 10) || [];
  const popularPosts = [...(allPosts || [])].sort((a: any, b: any) => b.views - a.views).slice(0, 10);

  // Mock data para membros da comunidade (em uma implementação real, viria da API)
  const communityMembers = [
    {
      id: 1,
      name: "João Silva",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Desenvolvedor Sênior",
      posts: 45,
      reputation: 1200,
      joined: "2023-01-15"
    },
    {
      id: 2,
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: "Moderadora",
      posts: 78,
      reputation: 2100,
      joined: "2022-11-20"
    },
    {
      id: 3,
      name: "Pedro Costa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "Especialista em PT",
      posts: 123,
      reputation: 3500,
      joined: "2022-08-10"
    }
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Community Header */}
      <section className="relative bg-gradient-to-r from-violet-600/20 to-blue-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comunidade Priston Tale
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Conecte-se com outros desenvolvedores e jogadores. Compartilhe conhecimento, 
              tire dúvidas e contribua para a comunidade.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1.2k</div>
              <div className="text-gray-400 text-sm">Membros Ativos</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{allPosts?.length || 0}</div>
              <div className="text-gray-400 text-sm">Discussões</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-violet-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {allPosts?.reduce((acc: number, post: any) => acc + (post.views || 0), 0).toLocaleString() || 0}
              </div>
              <div className="text-gray-400 text-sm">Visualizações</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{categories?.length || 0}</div>
              <div className="text-gray-400 text-sm">Categorias</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-6">
                <TabsTrigger value="posts">Recentes</TabsTrigger>
                <TabsTrigger value="popular">Populares</TabsTrigger>
                <TabsTrigger value="featured">Destaque</TabsTrigger>
                <TabsTrigger value="discussoes">Discussões</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Posts Recentes</h2>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Novo Post
                  </Button>
                </div>
                
                {postsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i} className="bg-slate-800 border-gray-700">
                        <CardContent className="p-4">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-full mb-3" />
                          <div className="flex justify-between">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentPosts.map((post: any) => (
                      <PostCard key={post.id} post={post} compact />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular" className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Posts Mais Populares</h2>
                <div className="space-y-4">
                  {popularPosts.map((post: any, index: number) => (
                    <Card key={post.id} className="bg-slate-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-600'
                            }`}>
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <PostCard post={post} compact />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Posts em Destaque</h2>
                <div className="space-y-4">
                  {featuredPosts.map((post: any) => (
                    <div key={post.id} className="relative">
                      <Badge className="absolute top-2 left-2 z-10 bg-violet-600">DESTAQUE</Badge>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discussoes" className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Discussões Ativas</h2>
                <div className="space-y-4">
                  {discussionPosts.length > 0 ? (
                    discussionPosts.map((post: any) => (
                      <PostCard key={post.id} post={post} compact />
                    ))
                  ) : (
                    <Card className="bg-slate-800 border-gray-700">
                      <CardContent className="p-8 text-center">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Nenhuma discussão ativa</h3>
                        <p className="text-gray-400 mb-4">Seja o primeiro a iniciar uma discussão!</p>
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                          Iniciar Discussão
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-amber-400" />
                  Top Contribuidores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {communityMembers.map((member, index) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                        } text-white`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.role}</div>
                      <div className="text-xs text-violet-400">{member.reputation} pontos</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Diretrizes da Comunidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <Heart className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Seja respeitoso e prestativo com outros membros</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Use títulos descritivos em suas postagens</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Compartilhe código e recursos úteis</span>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Mantenha discussões construtivas e relevantes</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPosts.slice(0, 5).map((post: any) => (
                  <div key={post.id} className="text-sm">
                    <div className="text-gray-300 line-clamp-2">{post.title}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {formatDate(post.createdAt)} • {post.views || 0} visualizações
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
