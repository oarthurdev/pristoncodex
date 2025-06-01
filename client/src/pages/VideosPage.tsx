
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoCard from "@/components/content/VideoCard";
import { Search, Play, Clock, Eye, Calendar } from "lucide-react";
import { useState } from "react";

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock video data (would come from API in real implementation)
  const mockVideos = [
    {
      id: 1,
      title: "Como Criar seu Primeiro Personagem",
      description: "Tutorial completo para iniciantes sobre criação e customização de personagens no Priston Tale",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "12:34",
      views: 15000,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "iniciante"
    },
    {
      id: 2,
      title: "Configuração Inicial do Servidor",
      description: "Passo a passo para configurar seu primeiro servidor Priston Tale local",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "28:15",
      views: 8200,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "desenvolvimento"
    },
    {
      id: 3,
      title: "Sistema de Classes e Habilidades",
      description: "Entenda como funciona o sistema de classes e como maximizar suas habilidades",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "18:42",
      views: 12300,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "intermediario"
    },
    {
      id: 4,
      title: "Modificando Source Code - Parte 1",
      description: "Aprenda a fazer suas primeiras modificações no source code do servidor",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "35:18",
      views: 6700,
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "avancado"
    },
    {
      id: 5,
      title: "Estratégias de PvP Avançadas",
      description: "Técnicas avançadas para dominar o PvP e se tornar um guerreiro temível",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "22:09",
      views: 9800,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "avancado"
    },
    {
      id: 6,
      title: "Instalação e Configuração Completa",
      description: "Guia completo de instalação do jogo e configuração para melhor performance",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "16:27",
      views: 18500,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      category: "iniciante"
    }
  ];

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Videos Header */}
      <section className="relative bg-gradient-to-r from-red-600/20 to-purple-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🎥</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tutoriais em Vídeo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Aprenda Priston Tale através de tutoriais em vídeo. Desde o básico até 
              desenvolvimento avançado de servidores.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar vídeos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                  <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="duration">Duração</SelectItem>
                  <SelectItem value="alphabetical">Ordem Alfabética</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Channel Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Play className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockVideos.length}</div>
              <div className="text-gray-400 text-sm">Vídeos</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {mockVideos.reduce((acc, video) => acc + video.views, 0).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Visualizações</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">12h</div>
              <div className="text-gray-400 text-sm">Conteúdo Total</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-gray-400 text-sm">Novos/Semana</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Video */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Vídeo em Destaque</h2>
          <Card className="bg-slate-800 border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={mockVideos[0].imageUrl}
                  alt={mockVideos[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="bg-red-600 text-white mb-3">EM DESTAQUE</Badge>
                <h3 className="text-2xl font-bold text-white mb-3">{mockVideos[0].title}</h3>
                <p className="text-gray-300 mb-4">{mockVideos[0].description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {mockVideos[0].videoDuration}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {mockVideos[0].views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(mockVideos[0].createdAt)}
                  </span>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Assistir Agora
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Videos Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Todos os Vídeos ({filteredVideos.length})
          </h2>
          
          {filteredVideos.length === 0 ? (
            <Card className="bg-slate-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-gray-400 mb-6">
                  Tente ajustar os filtros ou termos de busca.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.slice(1).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>

        {/* Subscribe Section */}
        <Card className="bg-gradient-to-r from-red-600/20 to-purple-500/20 border-gray-700">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Não perca nenhum tutorial!
            </h3>
            <p className="text-gray-300 mb-6">
              Novos vídeos toda semana. Desde tutoriais básicos até desenvolvimento avançado.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Canal no YouTube
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400">
                Receber Notificações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
