import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/content/PostCard";
import { useState } from "react";

export default function CategoryPage() {
  const [, params] = useRoute("/categoria/:slug");
  const [sortBy, setSortBy] = useState("recent");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/posts"],
    enabled: !!params?.slug,
  });

  const getCategoryInfo = (slug: string) => {
    switch (slug) {
      case "iniciante":
        return {
          title: "Guias para Iniciantes",
          description: "Tudo que você precisa saber para começar sua jornada em Priston Tale",
          icon: "🌱",
          color: "text-green-400",
          bgColor: "bg-green-600/20"
        };
      case "intermediario":
        return {
          title: "Guias Intermediários",
          description: "Aprimore suas habilidades e domine estratégias avançadas",
          icon: "📈",
          color: "text-blue-400",
          bgColor: "bg-blue-600/20"
        };
      case "avancado":
        return {
          title: "Guias Avançados",
          description: "Técnicas avançadas para jogadores experientes",
          icon: "👑",
          color: "text-purple-400",
          bgColor: "bg-purple-600/20"
        };
      case "desenvolvimento":
        return {
          title: "Desenvolvimento",
          description: "Tutoriais sobre desenvolvimento de servidores e modificações",
          icon: "💻",
          color: "text-amber-400",
          bgColor: "bg-amber-600/20"
        };
      default:
        return {
          title: "Todos os Guias",
          description: "Explore todo o conteúdo disponível",
          icon: "📚",
          color: "text-gray-400",
          bgColor: "bg-gray-600/20"
        };
    }
  };

  const categoryInfo = getCategoryInfo(params?.slug || "all");

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Category Header */}
      <section className={`relative ${categoryInfo.bgColor} border-b border-gray-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryInfo.icon}</div>
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4`}>
              {categoryInfo.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">
              {isLoading ? "Carregando..." : `${posts?.length || 0} Artigos`}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="popular">Mais Populares</SelectItem>
                <SelectItem value="views">Mais Visualizados</SelectItem>
                <SelectItem value="alphabetical">Ordem Alfabética</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
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
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhum conteúdo encontrado</h3>
              <p className="text-gray-400 mb-6">
                Ainda não há conteúdo nesta categoria. Volte em breve para novidades!
              </p>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                Explorar Outras Categorias
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {posts && posts.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:border-violet-400 hover:text-violet-400"
            >
              Carregar Mais Posts
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
