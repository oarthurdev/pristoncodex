import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  // Get search query from URL params and trigger search
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const query = params.get("q") || "";
    setSearchTerm(query);
  }, [location]);

  // Update URL when searchTerm changes (but avoid infinite loops)
  useEffect(() => {
    if (searchTerm.trim()) {
      const params = new URLSearchParams(location.split("?")[1] || "");
      const currentQuery = params.get("q") || "";
      
      // Only update URL if the searchTerm is different from current URL param
      if (currentQuery !== searchTerm.trim()) {
        window.history.replaceState(
          {},
          "",
          `/buscar?q=${encodeURIComponent(searchTerm.trim())}`,
        );
      }
    }
  }, [searchTerm, location]);

  // Buscar dados da API
  const { data: allPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts"],
  });

  const { data: downloads, isLoading: downloadsLoading } = useQuery({
    queryKey: ["/api/downloads"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Filtrar resultados baseado na busca
  const searchResults = searchTerm && searchTerm.trim()
    ? {
        posts:
          allPosts?.filter((post: any) => {
            const matchesSearch =
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
              selectedCategory === "all" ||
              post.categoryId === parseInt(selectedCategory);
            return matchesSearch && matchesCategory;
          }) || [],

        downloads:
          downloads?.filter((download: any) => {
            const matchesSearch =
              download.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              download.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              download.fileName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesSearch;
          }) || [],

        videos:
          allPosts?.filter((post: any) => {
            const hasVideo = post.videoUrl;
            const matchesSearch =
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
              selectedCategory === "all" ||
              post.categoryId === parseInt(selectedCategory);
            return hasVideo && matchesSearch && matchesCategory;
          }) || [],
      }
    : { posts: [], downloads: [], videos: [] };

  // Ordenar resultados
  const sortResults = (items: any[], type: string) => {
    return [...items].sort((a: any, b: any) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "popular":
          if (type === "posts" || type === "videos") {
            return (b.views || 0) - (a.views || 0);
          } else if (type === "downloads") {
            return (b.downloadCount || 0) - (a.downloadCount || 0);
          }
          return 0;
        case "alphabetical":
          const aTitle = type === "downloads" ? a.name : a.title;
          const bTitle = type === "downloads" ? b.name : b.title;
          return aTitle.localeCompare(bTitle);
        case "relevance":
        default:
          // Simular relevância baseada na posição da palavra chave no título
          const aTitleLower = (
            type === "downloads" ? a.name : a.title
          ).toLowerCase();
          const bTitleLower = (
            type === "downloads" ? b.name : b.title
          ).toLowerCase();
          const aIndex = aTitleLower.indexOf(searchTerm.toLowerCase());
          const bIndex = bTitleLower.indexOf(searchTerm.toLowerCase());

          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
      }
    });
  };

  const sortedResults = {
    posts: sortResults(searchResults.posts, "posts"),
    downloads: sortResults(searchResults.downloads, "downloads"),
    videos: sortResults(searchResults.videos, "videos"),
  };

  const totalResults =
    sortedResults.posts.length +
    sortedResults.downloads.length +
    sortedResults.videos.length;
  const isLoading = postsLoading || downloadsLoading;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Update URL with search query
      window.history.pushState(
        {},
        "",
        `/buscar?q=${encodeURIComponent(searchTerm.trim())}`,
      );
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    window.history.pushState({}, "", "/buscar");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />

      {/* Search Header */}
      <section className="bg-slate-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Buscar Conteúdo
            </h1>
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
        {searchTerm && searchTerm.trim() ? (
          <>
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Resultados para "{searchTerm}"
                </h2>
                <p className="text-gray-400">
                  {isLoading
                    ? "Buscando..."
                    : `${totalResults} resultados encontrados`}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categories?.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
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
                    <SelectItem value="alphabetical">
                      Ordem Alfabética
                    </SelectItem>
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
                  <h3 className="text-xl font-bold text-white mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Tente usar palavras-chave diferentes ou verifique a
                    ortografia.
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
                    Artigos ({sortedResults.posts.length})
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Downloads ({sortedResults.downloads.length})
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    Vídeos ({sortedResults.videos.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6 mt-6">
                  {/* Mixed results */}
                  <div className="space-y-6">
                    {sortedResults.posts.slice(0, 3).map((post: any) => (
                      <div key={`post-${post.id}`} className="mb-4">
                        <Badge className="bg-blue-600 text-white mb-2">
                          ARTIGO
                        </Badge>
                        <PostCard post={post} compact />
                      </div>
                    ))}

                    {sortedResults.downloads
                      .slice(0, 2)
                      .map((download: any) => (
                        <div key={`download-${download.id}`} className="mb-4">
                          <Badge className="bg-green-600 text-white mb-2">
                            DOWNLOAD
                          </Badge>
                          <DownloadCard download={download} />
                        </div>
                      ))}

                    {sortedResults.videos.slice(0, 2).map((video: any) => (
                      <div key={`video-${video.id}`} className="mb-4">
                        <Badge className="bg-red-600 text-white mb-2">
                          VÍDEO
                        </Badge>
                        <Card className="bg-slate-800 border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={
                                  video.imageUrl ||
                                  "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                                }
                                alt={video.title}
                                className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">
                                  {video.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-2">
                                  {video.excerpt}
                                </p>
                                <div className="flex items-center text-gray-400 text-sm">
                                  <span>{video.videoDuration || "15:00"}</span>
                                  <span className="mx-2">•</span>
                                  <span>
                                    {(video.views || 0).toLocaleString()}{" "}
                                    visualizações
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span>{formatDate(video.createdAt)}</span>
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
                    {sortedResults.posts.map((post: any) => (
                      <PostCard key={post.id} post={post} compact />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="downloads" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedResults.downloads.map((download: any) => (
                      <DownloadCard key={download.id} download={download} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedResults.videos.map((video: any) => (
                      <Card
                        key={video.id}
                        className="bg-slate-800 border-gray-700"
                      >
                        <CardContent className="p-4">
                          <div className="aspect-video mb-4">
                            <img
                              src={
                                video.imageUrl ||
                                "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                              }
                              alt={video.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="font-semibold text-white mb-2">
                            {video.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3">
                            {video.excerpt}
                          </p>
                          <div className="flex justify-between items-center text-gray-400 text-sm">
                            <span>{video.videoDuration || "15:00"}</span>
                            <span>
                              {(video.views || 0).toLocaleString()} views
                            </span>
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
              Use a barra de busca acima para encontrar artigos, tutoriais,
              downloads, vídeos e tudo sobre Priston Tale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Artigos & Guias
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Tutoriais completos e guias detalhados
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Downloads
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Source codes, ferramentas e arquivos
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Vídeos
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Tutoriais em vídeo e gameplay
                  </p>
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
