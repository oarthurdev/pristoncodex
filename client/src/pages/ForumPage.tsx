
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MessageSquare, Users, Clock, Pin, Eye, ArrowUp } from "lucide-react";

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  isPinned: boolean;
  category: string;
}

const mockTopics: ForumTopic[] = [
  {
    id: 1,
    title: "Guia Completo para Iniciantes no Priston Tale",
    author: "AdminPT",
    replies: 45,
    views: 1250,
    lastReply: "2 horas atrás",
    isPinned: true,
    category: "Guias"
  },
  {
    id: 2,
    title: "Problemas com conexão no servidor",
    author: "Player123",
    replies: 12,
    views: 180,
    lastReply: "1 hora atrás",
    isPinned: false,
    category: "Suporte"
  },
  {
    id: 3,
    title: "Evento de fim de semana - Drop duplo!",
    author: "EventMaster",
    replies: 78,
    views: 890,
    lastReply: "30 min atrás",
    isPinned: true,
    category: "Eventos"
  },
  {
    id: 4,
    title: "Build recomendada para Archer",
    author: "ArcherPro",
    replies: 23,
    views: 340,
    lastReply: "3 horas atrás",
    isPinned: false,
    category: "Builds"
  }
];

export default function ForumPage() {
  const categories = [
    { name: "Todos", count: 158, color: "bg-violet-600" },
    { name: "Guias", count: 42, color: "bg-green-600" },
    { name: "Suporte", count: 35, color: "bg-red-600" },
    { name: "Eventos", count: 18, color: "bg-blue-600" },
    { name: "Builds", count: 28, color: "bg-amber-600" },
    { name: "Off-Topic", count: 35, color: "bg-gray-600" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Forum Header */}
      <section className="relative bg-gradient-to-r from-violet-600/20 to-blue-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Fórum da Comunidade
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Conecte-se com outros jogadores, tire dúvidas, compartilhe estratégias 
              e participe das discussões da comunidade Priston Tale.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-2 rounded hover:bg-gray-700 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-gray-300">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">2,847</div>
                    <div className="text-gray-400 text-sm">Membros</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-semibold">15,692</div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold">89,543</div>
                    <div className="text-gray-400 text-sm">Visualizações</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Forum Actions */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Tópicos Recentes</h2>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Novo Tópico
              </Button>
            </div>

            {/* Topics List */}
            <div className="space-y-4">
              {mockTopics.map((topic) => (
                <Card key={topic.id} className="bg-slate-800 border-gray-700 hover:border-violet-400 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-violet-600 text-white">
                          {topic.author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {topic.isPinned && (
                            <Pin className="w-4 h-4 text-amber-400" />
                          )}
                          <Badge 
                            variant="secondary" 
                            className="bg-gray-700 text-gray-300"
                          >
                            {topic.category}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-violet-400 cursor-pointer">
                          {topic.title}
                        </h3>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <span>por <span className="text-violet-400">{topic.author}</span></span>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{topic.replies} respostas</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{topic.views} visualizações</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{topic.lastReply}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-violet-400">
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  Anterior
                </Button>
                <Button className="bg-violet-600 text-white">1</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">2</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">3</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
