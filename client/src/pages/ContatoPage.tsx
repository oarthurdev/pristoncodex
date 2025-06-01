
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, MessageSquare, Clock, MapPin, Phone, Send, Github, Discord } from "lucide-react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria enviado o formulário de contato
    console.log("Formulário de contato enviado:", formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-400" />,
      title: "Email",
      description: "Para questões gerais e suporte",
      contact: "contato@pristoncodex.com",
      available: "Resposta em até 24h"
    },
    {
      icon: <Discord className="w-6 h-6 text-purple-400" />,
      title: "Discord",
      description: "Chat em tempo real com a comunidade",
      contact: "Discord Server",
      available: "Online 24/7"
    },
    {
      icon: <Github className="w-6 h-6 text-gray-400" />,
      title: "GitHub",
      description: "Problemas técnicos e contribuições",
      contact: "github.com/pristoncodex",
      available: "Issues e PRs"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-400" />,
      title: "Fórum",
      description: "Discussões da comunidade",
      contact: "Fórum da Comunidade",
      available: "Moderado 24h"
    }
  ];

  const team = [
    {
      name: "Admin Principal",
      role: "Desenvolvimento & Administração",
      email: "admin@pristoncodex.com",
      areas: ["Desenvolvimento", "Infraestrutura", "Moderação"]
    },
    {
      name: "Equipe de Conteúdo",
      role: "Criação de Guias & Tutoriais",
      email: "conteudo@pristoncodex.com",
      areas: ["Guias", "Tutoriais", "Revisão"]
    },
    {
      name: "Suporte Técnico",
      role: "Suporte aos Usuários",
      email: "suporte@pristoncodex.com",
      areas: ["Bugs", "Problemas Técnicos", "FAQ"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600/20 to-green-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está 
              aqui para ajudar você da melhor forma possível.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-slate-800 border-gray-700 hover:border-blue-400 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                <p className="text-blue-400 font-medium text-sm mb-2">{method.contact}</p>
                <p className="text-gray-500 text-xs">{method.available}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Envie uma Mensagem</CardTitle>
                <p className="text-gray-300">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Seu nome completo"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="seu.email@exemplo.com"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
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
                        <SelectItem value="suporte">Suporte Técnico</SelectItem>
                        <SelectItem value="bug">Reportar Bug</SelectItem>
                        <SelectItem value="sugestao">Sugestão</SelectItem>
                        <SelectItem value="contribuicao">Contribuição</SelectItem>
                        <SelectItem value="parceria">Parceria</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Assunto *
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Descreva brevemente o assunto"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Descreva sua mensagem em detalhes..."
                      rows={6}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Team & Info */}
          <div className="space-y-6">
            {/* Team */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Nossa Equipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-white font-semibold mb-1">{member.name}</h4>
                    <p className="text-blue-400 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm mb-2">{member.email}</p>
                    <div className="flex flex-wrap gap-1">
                      {member.areas.map((area, areaIndex) => (
                        <span key={areaIndex} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Tempo de Resposta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Suporte Geral</p>
                    <p className="text-gray-400 text-sm">Até 24 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-white font-medium">Bugs Críticos</p>
                    <p className="text-gray-400 text-sm">Até 6 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Contribuições</p>
                    <p className="text-gray-400 text-sm">Até 48 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-500/20 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">Links Úteis</h3>
                <div className="space-y-3">
                  <a href="/faq" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    📖 Perguntas Frequentes
                  </a>
                  <a href="/reportar-bug" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    🐛 Reportar Bug
                  </a>
                  <a href="/contribuir" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    🤝 Como Contribuir
                  </a>
                  <a href="/forum" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    💬 Fórum da Comunidade
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
