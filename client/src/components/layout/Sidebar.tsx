import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

interface Statistics {
  totalPosts: number;
  totalDownloads: number;
  totalUsers: number;
}

export default function Sidebar() {
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<Statistics>({
    queryKey: ["/api/statistics"],
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'seedling':
        return '🌱';
      case 'chart-line':
        return '📈';
      case 'crown':
        return '👑';
      case 'code':
        return '💻';
      default:
        return '📄';
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-600';
      case 'blue':
        return 'bg-blue-600';
      case 'purple':
        return 'bg-purple-600';
      case 'amber':
        return 'bg-amber-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <aside className="lg:col-span-1">
      <Card className="bg-slate-800 border-gray-700 sticky top-24">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Navegação Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categoriesLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-8" />
                </div>
              ))
            ) : (
              categories?.map((category) => (
                <div key={category.id} className="group">
                  <Link href={`/categoria/${category.slug}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-gray-300 group-hover:text-violet-400 flex items-center">
                        <span className="mr-2 text-lg">{getCategoryIcon(category.icon)}</span>
                        {category.name}
                      </span>
                      <Badge className={`${getCategoryColor(category.color)} text-white text-xs`}>
                        {Math.floor(Math.random() * 30) + 5} {/* Placeholder count */}
                      </Badge>
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>

          <Separator className="my-6 border-gray-700" />

          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">ESTATÍSTICAS</h4>
            <div className="space-y-2 text-sm">
              {statsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total de Guias:</span>
                    <span className="text-white">{stats?.totalPosts || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Downloads:</span>
                    <span className="text-white">{stats?.totalDownloads || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Usuários:</span>
                    <span className="text-white">{stats?.totalUsers || 0}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
