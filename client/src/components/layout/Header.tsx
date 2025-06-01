import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const categories = [
  { name: "Iniciante", slug: "iniciante", color: "text-green-400" },
  { name: "Intermediário", slug: "intermediario", color: "text-blue-400" },
  { name: "Avançado", slug: "avancado", color: "text-purple-400" },
  { name: "Desenvolvimento", slug: "desenvolvimento", color: "text-amber-400" },
];

export default function Header() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  // Sync search query with URL params when on search page
  useEffect(() => {
    if (location.startsWith('/buscar')) {
      const params = new URLSearchParams(location.split("?")[1] || "");
      const query = params.get("q") || "";
      setSearchQuery(query);
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    navigate("/buscar");
  };

  return (
    <header className="bg-slate-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Priston Codex</h1>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-violet-400 transition-colors px-3 py-2"
                >
                  Início
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-300 hover:text-violet-400 transition-colors">
                  Guias
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categoria/${category.slug}`}
                        className={`block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-violet-400 rounded transition-colors ${category.color}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/downloads"
                  className="text-gray-300 hover:text-violet-400 transition-colors px-3 py-2"
                >
                  Downloads
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/videos"
                  className="text-gray-300 hover:text-violet-400 transition-colors px-3 py-2"
                >
                  Vídeos
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/comunidade"
                  className="text-gray-300 hover:text-violet-400 transition-colors px-3 py-2"
                >
                  Comunidade
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-64 pl-10 pr-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-violet-400"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user ? (
                  <>
                    <DropdownMenuItem disabled>
                      <span className="text-violet-400 font-medium">
                        {user.username}
                      </span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href="/admin">Painel Admin</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Sair
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/login">Entrar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/register">Registrar</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-300 hover:text-violet-400"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-800 border-gray-700"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-violet-400 transition-colors"
                  >
                    Início
                  </Link>

                  <div className="space-y-2">
                    <h3 className="text-gray-400 font-medium">Guias</h3>
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categoria/${category.slug}`}
                        className={`block pl-4 text-gray-300 hover:text-violet-400 transition-colors ${category.color}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/downloads"
                    className="text-gray-300 hover:text-violet-400 transition-colors"
                  >
                    Downloads
                  </Link>

                  <Link
                    href="/videos"
                    className="text-gray-300 hover:text-violet-400 transition-colors"
                  >
                    Vídeos
                  </Link>

                  <Link
                    href="/comunidade"
                    className="text-gray-300 hover:text-violet-400 transition-colors"
                  >
                    Comunidade
                  </Link>

                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </form>

                  <div className="border-t border-gray-700 pt-4 mt-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="text-violet-400 font-medium">
                          Olá, {user.username}
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="block text-gray-300 hover:text-violet-400 transition-colors"
                          >
                            Painel Admin
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="block text-gray-300 hover:text-violet-400 transition-colors"
                        >
                          Sair
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Link
                          href="/login"
                          className="block text-gray-300 hover:text-violet-400 transition-colors"
                        >
                          Entrar
                        </Link>
                        <Link
                          href="/register"
                          className="block text-gray-300 hover:text-violet-400 transition-colors"
                        >
                          Registrar
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}