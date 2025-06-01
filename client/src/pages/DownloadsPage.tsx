import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DownloadCard from "@/components/content/DownloadCard";
import { Search, Download, Filter } from "lucide-react";

export default function DownloadsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: downloads, isLoading: downloadsLoading } = useQuery({
    queryKey: ["/api/downloads", selectedCategory !== "all" ? { categoryId: parseInt(selectedCategory) } : {}],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const filteredDownloads = downloads?.filter((download: any) =>
    download.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    download.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDownloadsByCategory = () => {
    const categories = [
      {
        name: "Cliente do Jogo",
        icon: "🎮",
        color: "bg-violet-600",
        downloads: filteredDownloads?.filter((d: any) => 
          d.fileName.toLowerCase().includes('client') || 
          d.fileName.toLowerCase().includes('game')
        ) || []
      },
      {
        name: "Código Fonte",
        icon: "💻",
        color: "bg-amber-600",
        downloads: filteredDownloads?.filter((d: any) => 
          d.fileName.toLowerCase().includes('source') || 
          d.fileName.toLowerCase().includes('code')
        ) || []
      },
      {
        name: "Ferramentas",
        icon: "🔧",
        color: "bg-blue-600",
        downloads: filteredDownloads?.filter((d: any) => 
          d.fileName.toLowerCase().includes('tool') || 
          d.fileName.toLowerCase().includes('util')
        ) || []
      },
      {
        name: "Outros",
        icon: "📦",
        color: "bg-gray-600",
        downloads: filteredDownloads?.filter((d: any) => 
          !d.fileName.toLowerCase().includes('client') &&
          !d.fileName.toLowerCase().includes('game') &&
          !d.fileName.toLowerCase().includes('source') &&
          !d.fileName.toLowerCase().includes('code') &&
          !d.fileName.toLowerCase().includes('tool') &&
          !d.fileName.toLowerCase().includes('util')
        ) || []
      }
    ];

    return categories.filter(cat => cat.downloads.length > 0);
  };

  const downloadCategories = getDownloadsByCategory();
  const totalDownloads = filteredDownloads?.length || 0;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Downloads Header */}
      <section className="relative bg-gradient-to-r from-blue-600/20 to-violet-600/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">📥</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Downloads
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Clientes, códigos fonte, ferramentas e tudo que você precisa para Priston Tale
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Input
              placeholder="Buscar downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <div className="flex items-center space-x-4">
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
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <Card className="bg-slate-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400">{totalDownloads}</div>
                <div className="text-gray-400">Total de Arquivos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {downloads?.reduce((sum: number, d: any) => sum + d.downloadCount, 0) || 0}
                </div>
                <div className="text-gray-400">Total de Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{downloadCategories.length}</div>
                <div className="text-gray-400">Categorias Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">
                  {Math.round((downloads?.reduce((sum: number, d: any) => sum + parseFloat(d.fileSize.replace(/[^\d.]/g, '')), 0) || 0) / 1024 * 100) / 100} GB
                </div>
                <div className="text-gray-400">Tamanho Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Downloads by Category */}
        {downloadsLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Card key={j} className="bg-slate-800 border-gray-700 p-4">
                      <div className="flex items-start space-x-3">
                        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <div className="flex justify-between mb-3">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <Skeleton className="h-8 w-full" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : downloadCategories.length === 0 ? (
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum download encontrado</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `Não encontramos downloads para "${searchQuery}". Tente outros termos de busca.`
                  : "Ainda não há downloads disponíveis nesta categoria."
                }
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {downloadCategories.map((category, index) => (
              <section key={index}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                    <p className="text-gray-400">{category.downloads.length} arquivos disponíveis</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.downloads.map((download: any) => (
                    <DownloadCard key={download.id} download={download} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Popular Downloads */}
        {!searchQuery && selectedCategory === "all" && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Downloads Mais Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {downloads?.slice(0, 4)
                .sort((a: any, b: any) => b.downloadCount - a.downloadCount)
                .map((download: any) => (
                  <DownloadCard key={`popular-${download.id}`} download={download} />
                ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
