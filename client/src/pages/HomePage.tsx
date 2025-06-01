import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/content/PostCard";
import DownloadCard from "@/components/content/DownloadCard";
import VideoCard from "@/components/content/VideoCard";
import AdminPanel from "@/components/admin/AdminPanel";
import { Link } from "wouter";
import { useState } from "react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: featuredPosts, isLoading: featuredLoading } = useQuery({
    queryKey: ["/api/posts/featured"],
  });

  const { data: recentPosts, isLoading: recentLoading } = useQuery({
    queryKey: ["/api/posts", { limit: 10 }],
  });

  const { data: downloads, isLoading: downloadsLoading } = useQuery({
    queryKey: ["/api/downloads/popular"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Mock video data (would come from API in real implementation)
  const mockVideos = [
    {
      id: 1,
      title: "Como Criar seu Primeiro Personagem",
      description: "Tutorial completo para iniciantes sobre criação e customização de personagens",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "12:34",
      views: 15000,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    },
    {
      id: 2,
      title: "Configuração Inicial do Servidor",
      description: "Passo a passo para configurar seu primeiro servidor Priston Tale local",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoDuration: "28:15",
      views: 8200,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-violet-600/20 to-amber-500/20 border-b border-gray-700">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600" 
            alt="Fantasy gaming landscape" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              A Enciclopédia Definitiva de <span className="text-violet-400">Priston Tale</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Desde guias para iniciantes até desenvolvimento avançado de source code. 
              Tudo que você precisa saber sobre Priston Tale em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categoria/iniciante">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-lg">
                  Explorar Guias
                </Button>
              </Link>
              <Link href="/downloads">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-violet-400 hover:text-violet-400 px-8 py-3 text-lg">
                  Ver Downloads
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar />
          
          <main className="lg:col-span-3">
            {/* Featured Content Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Conteúdo em Destaque</h2>
                <Link href="/categoria/all">
                  <Button variant="link" className="text-violet-400 hover:text-violet-300">
                    Ver Todos
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredLoading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="bg-slate-800 border-gray-700">
                      <Skeleton className="h-48 w-full" />
                      <CardContent className="p-6">
                        <Skeleton className="h-4 w-20 mb-3" />
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  featuredPosts?.slice(0, 2).map((post: any) => (
                    <PostCard key={post.id} post={post} featured />
                  ))
                )}
              </div>
            </section>

            {/* Recent Posts Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Postagens Recentes</h2>
                <div className="flex items-center space-x-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
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
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    Filtrar
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="bg-slate-800 border-gray-700 p-6">
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
                    </Card>
                  ))
                ) : (
                  recentPosts?.slice(0, 5).map((post: any) => (
                    <PostCard key={post.id} post={post} compact />
                  ))
                )}
              </div>
            </section>

            {/* Downloads Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Downloads Populares</h2>
                <Link href="/downloads">
                  <Button variant="link" className="text-violet-400 hover:text-violet-300">
                    Ver Todos
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {downloadsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="bg-slate-800 border-gray-700 p-4">
                      <div className="flex items-start space-x-3">
                        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <div className="flex justify-between">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  downloads?.slice(0, 3).map((download: any) => (
                    <DownloadCard key={download.id} download={download} />
                  ))
                )}
              </div>
            </section>

            {/* Video Tutorials Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tutoriais em Vídeo</h2>
                <Link href="/videos">
                  <Button variant="link" className="text-violet-400 hover:text-violet-300">
                    Ver Canal
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
      <AdminPanel />
    </div>
  );
}
