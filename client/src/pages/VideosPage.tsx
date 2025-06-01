
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/content/PostCard";
import { Search, Play, Clock, Eye, Calendar, Video } from "lucide-react";
import { useState } from "react";

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Buscar posts que sejam do tipo vídeo
  const { data: allPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Filtrar apenas posts que tenham videoUrl (são vídeos)
  const videos = allPosts?.filter((post: any) => post.videoUrl) || [];

  const filteredVideos = videos.filter((video: any) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.categoryId === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Ordenar vídeos
  const sortedVideos = [...filteredVideos].sort((a: any, b: any) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const totalViews = videos.reduce((acc: number, video: any) => acc + (video.views || 0), 0);
  const totalDuration = videos.length * 15; // Estimativa de 15 min por vídeo

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
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="popular">Mais Populares</SelectItem>
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
              <div className="text-2xl font-bold text-white">{videos.length}</div>
              <div className="text-gray-400 text-sm">Vídeos</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {totalViews.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Visualizações</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(totalDuration / 60)}h</div>
              <div className="text-gray-400 text-sm">Conteúdo Total</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {categories?.length || 0}
              </div>
              <div className="text-gray-400 text-sm">Categorias</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Video */}
        {sortedVideos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Vídeo em Destaque</h2>
            <Card className="bg-slate-800 border-gray-700 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={sortedVideos[0].imageUrl || "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"}
                    alt={sortedVideos[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-red-600 text-white mb-3">EM DESTAQUE</Badge>
                  <h3 className="text-2xl font-bold text-white mb-3">{sortedVideos[0].title}</h3>
                  <p className="text-gray-300 mb-4">{sortedVideos[0].excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {sortedVideos[0].videoDuration || "15:00"}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {(sortedVideos[0].views || 0).toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(sortedVideos[0].createdAt)}
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
        )}

        {/* Videos Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Todos os Vídeos ({sortedVideos.length})
          </h2>
          
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-slate-800 border-gray-700">
                  <Skeleton className="aspect-video w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-3/4 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedVideos.length === 0 ? (
            <Card className="bg-slate-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm 
                    ? "Tente ajustar os filtros ou termos de busca."
                    : "Ainda não há vídeos disponíveis."
                  }
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
              {sortedVideos.slice(1).map((video: any) => (
                <Card key={video.id} className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors">
                  <div className="relative">
                    <img
                      src={video.imageUrl || "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.videoDuration || "15:00"}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.excerpt}</p>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {(video.views || 0).toLocaleString()}
                      </span>
                      <span>{formatDate(video.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
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
                <Video className="w-4 h-4 mr-2" />
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
