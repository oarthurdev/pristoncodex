
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/content/PostCard";
import DownloadCard from "@/components/content/DownloadCard";
import { Search, Filter, FileText, Download, Video, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q') || '';
    setSearchTerm(query);
  }, [location]);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/search", { query: searchTerm, category: selectedCategory }],
    enabled: !!searchTerm,
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Mock search results for demonstration
  const mockResults = {
    posts: [
      {
        id: 1,
        title: "Guia Completo para Iniciantes",
        excerpt: "Tudo que você precisa saber para começar no Priston Tale",
        content: "Conteúdo detalhado do guia...",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        slug: "guia-completo-iniciantes",
        type: "tutorial",
        views: 1250,
        likes: 89,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        authorId: 1
      }
    ],
    downloads: [
      {
        id: 1,
        name: "Source Code PT",
        description: "Source code completo do Priston Tale",
        fileName: "pt_source.zip",
        fileSize: 125000000,
        downloadCount: 2450,
        downloadUrl: "/downloads/pt_source.zip",
        createdAt: new Date().toISOString()
      }
    ],
    videos: [
      {
        id: 1,
        title: "Como Criar seu Primeiro Personagem",
        description: "Tutorial completo para iniciantes sobre criação e customização de personagens",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoDuration: "12:34",
        views: 15000,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
      }
    ]
  };

  const results = searchResults || mockResults;
  const totalResults = (results.posts?.length || 0) + (results.downloads?.length || 0) + (results.videos?.length || 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    window.history.pushState({}, '', `/buscar?q=${encodeURIComponent(searchTerm)}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    window.history.pushState({}, '', '/buscar');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Search Header */}
      <section className="bg-slate-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Buscar Conteúdo</h1>
            <p className="text-gray-400">
              Encontre artigos, downloads, vídeos e muito mais
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Digite sua busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 py-3 text-lg bg-gray-800 border-gray-600 text-white"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchTerm ? (
          <>
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Resultados para "{searchTerm}"
                </h2>
                <p className="text-gray-400">
                  {isLoading ? "Buscando..." : `${totalResults} resultados encontrados`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
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
                    <SelectItem value="relevance">Mais Relevante</SelectItem>
                    <SelectItem value="recent">Mais Recente</SelectItem>
                    <SelectItem value="popular">Mais Popular</SelectItem>
                    <SelectItem value="alphabetical">Ordem Alfabética</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Results */}
            {isLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="bg-slate-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-20 mb-2" />
                          <Skeleton className="h-6 w-full mb-2" />
                          <Skeleton className="h-4 w-full mb-3" />
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : totalResults === 0 ? (
              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-gray-400 mb-6">
                    Tente usar palavras-chave diferentes ou verifique a ortografia.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={clearSearch}
                      className="bg-violet-600 hover:bg-violet-700 text-white"
                    >
                      Nova Busca
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-violet-400 hover:text-violet-400"
                    >
                      Explorar Categorias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                  <TabsTrigger value="all" className="flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Todos ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger value="posts" className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Artigos ({results.posts?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Downloads ({results.downloads?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    Vídeos ({results.videos?.length || 0})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6 mt-6">
                  {/* Mixed results */}
                  <div className="space-y-6">
                    {results.posts?.slice(0, 3).map((post: any) => (
                      <div key={`post-${post.id}`} className="mb-4">
                        <Badge className="bg-blue-600 text-white mb-2">ARTIGO</Badge>
                        <PostCard post={post} compact />
                      </div>
                    ))}
                    
                    {results.downloads?.slice(0, 2).map((download: any) => (
                      <div key={`download-${download.id}`} className="mb-4">
                        <Badge className="bg-green-600 text-white mb-2">DOWNLOAD</Badge>
                        <DownloadCard download={download} />
                      </div>
                    ))}
                    
                    {results.videos?.slice(0, 2).map((video: any) => (
                      <div key={`video-${video.id}`} className="mb-4">
                        <Badge className="bg-red-600 text-white mb-2">VÍDEO</Badge>
                        <Card className="bg-slate-800 border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={video.imageUrl}
                                alt={video.title}
                                className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">{video.title}</h3>
                                <p className="text-gray-400 text-sm mb-2">{video.description}</p>
                                <div className="flex items-center text-gray-400 text-sm">
                                  <span>{video.videoDuration}</span>
                                  <span className="mx-2">•</span>
                                  <span>{video.views.toLocaleString()} visualizações</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="posts" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 gap-6">
                    {results.posts?.map((post: any) => (
                      <PostCard key={post.id} post={post} compact />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="downloads" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {results.downloads?.map((download: any) => (
                      <DownloadCard key={download.id} download={download} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.videos?.map((video: any) => (
                      <Card key={video.id} className="bg-slate-800 border-gray-700">
                        <CardContent className="p-4">
                          <div className="aspect-video mb-4">
                            <img
                              src={video.imageUrl}
                              alt={video.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                          <div className="flex justify-between items-center text-gray-400 text-sm">
                            <span>{video.videoDuration}</span>
                            <span>{video.views.toLocaleString()} views</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              O que você está procurando?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Use a barra de busca acima para encontrar artigos, tutoriais, downloads, 
              vídeos e tudo sobre Priston Tale.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Artigos & Guias</h3>
                  <p className="text-gray-400 text-sm">Tutoriais completos e guias detalhados</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Downloads</h3>
                  <p className="text-gray-400 text-sm">Source codes, ferramentas e arquivos</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Vídeos</h3>
                  <p className="text-gray-400 text-sm">Tutoriais em vídeo e gameplay</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
