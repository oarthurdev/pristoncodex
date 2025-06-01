
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Bug, AlertTriangle, Info, CheckCircle, Upload, Send } from "lucide-react";

interface BugReport {
  id: number;
  title: string;
  priority: "baixa" | "media" | "alta" | "critica";
  status: "aberto" | "investigando" | "resolvido" | "fechado";
  date: string;
  category: string;
}

const mockBugReports: BugReport[] = [
  {
    id: 1,
    title: "Erro ao carregar página de downloads",
    priority: "alta",
    status: "investigando",
    date: "2024-01-15",
    category: "Interface"
  },
  {
    id: 2,
    title: "Links quebrados na seção de guias",
    priority: "media",
    status: "aberto",
    date: "2024-01-14",
    category: "Conteúdo"
  },
  {
    id: 3,
    title: "Problema de responsividade no mobile",
    priority: "baixa",
    status: "resolvido",
    date: "2024-01-13",
    category: "Design"
  }
];

export default function ReportarBugPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    steps: "",
    expected: "",
    actual: "",
    browser: "",
    os: ""
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critica": return "bg-red-600";
      case "alta": return "bg-orange-600";
      case "media": return "bg-yellow-600";
      case "baixa": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberto": return "bg-blue-600";
      case "investigando": return "bg-yellow-600";
      case "resolvido": return "bg-green-600";
      case "fechado": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria enviado o bug report
    console.log("Bug report enviado:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600/20 to-orange-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🐛</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Reportar Bug
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Encontrou um problema? Nos ajude a melhorar reportando bugs e issues. 
              Sua contribuição é essencial para manter a qualidade do projeto.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bug Report Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Novo Bug Report</CardTitle>
                <p className="text-gray-300">
                  Preencha o formulário abaixo com o máximo de detalhes possível
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Título do Bug *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Descreva o problema em poucas palavras"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Categoria *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interface">Interface</SelectItem>
                          <SelectItem value="conteudo">Conteúdo</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="seguranca">Segurança</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="funcionalidade">Funcionalidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Prioridade *
                      </label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="critica">Crítica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Navegador
                      </label>
                      <Input
                        value={formData.browser}
                        onChange={(e) => setFormData({...formData, browser: e.target.value})}
                        placeholder="Chrome 120, Firefox 121, etc."
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Descrição do Problema *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descreva o problema em detalhes..."
                      rows={4}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Passos para Reproduzir
                    </label>
                    <Textarea
                      value={formData.steps}
                      onChange={(e) => setFormData({...formData, steps: e.target.value})}
                      placeholder="1. Vá para a página...&#10;2. Clique em...&#10;3. Observe que..."
                      rows={3}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Resultado Esperado
                      </label>
                      <Textarea
                        value={formData.expected}
                        onChange={(e) => setFormData({...formData, expected: e.target.value})}
                        placeholder="O que deveria acontecer..."
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Resultado Atual
                      </label>
                      <Textarea
                        value={formData.actual}
                        onChange={(e) => setFormData({...formData, actual: e.target.value})}
                        placeholder="O que realmente acontece..."
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Anexar Screenshots
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Arraste arquivos aqui ou clique para selecionar</p>
                      <Button type="button" variant="outline" className="mt-2 border-gray-600 text-gray-300">
                        Escolher Arquivos
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Bug Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Guidelines */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Diretrizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Seja específico na descrição do problema
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Inclua passos para reproduzir o bug
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Verifique se o bug já foi reportado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Reports Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBugReports.map((report) => (
                  <div key={report.id} className="border-b border-gray-700 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-white line-clamp-2">
                        {report.title}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={`${getPriorityColor(report.priority)} text-white text-xs`}
                      >
                        {report.priority}
                      </Badge>
                      <Badge 
                        className={`${getStatusColor(report.status)} text-white text-xs`}
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
