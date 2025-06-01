
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Code, FileText, Bug, Users, Gift, Github, Coffee } from "lucide-react";

export default function ContribuirPage() {
  const contributionTypes = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "Desenvolvimento",
      description: "Contribua com código, correções de bugs ou novas funcionalidades",
      actions: ["Pull Requests", "Code Review", "Documentação de Código"]
    },
    {
      icon: <FileText className="w-8 h-8 text-green-400" />,
      title: "Conteúdo",
      description: "Escreva guias, tutoriais ou traduza conteúdo existente",
      actions: ["Guias e Tutoriais", "Traduções", "Revisão de Conteúdo"]
    },
    {
      icon: <Bug className="w-8 h-8 text-red-400" />,
      title: "Testes",
      description: "Ajude a encontrar e reportar bugs ou problemas",
      actions: ["Bug Reports", "Testes Beta", "QA Testing"]
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Comunidade",
      description: "Ajude outros usuários e modere discussões",
      actions: ["Suporte a Usuários", "Moderação", "Eventos"]
    }
  ];

  const benefits = [
    "Reconhecimento especial na comunidade",
    "Badge de contribuidor no perfil",
    "Acesso antecipado a novas funcionalidades",
    "Participação em decisões do projeto",
    "Networking com outros desenvolvedores"
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600/20 to-pink-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🤝</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contribua com o Projeto
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Seja parte da evolução do Priston Codex. Sua contribuição faz a diferença 
              para toda a comunidade!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Contribute */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Por que contribuir?</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            O Priston Codex é um projeto open-source mantido pela comunidade. 
            Suas contribuições ajudam a manter o projeto vivo e em constante evolução.
          </p>
        </div>

        {/* Contribution Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contributionTypes.map((type, index) => (
            <Card key={index} className="bg-slate-800 border-gray-700 hover:border-purple-400 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {type.icon}
                  <CardTitle className="text-white">{type.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{type.description}</p>
                <div className="space-y-2">
                  {type.actions.map((action, i) => (
                    <Badge key={i} variant="secondary" className="bg-gray-700 text-gray-300 mr-2">
                      {action}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Getting Started */}
        <Card className="bg-slate-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Como começar?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Escolha uma área</h3>
                <p className="text-gray-300 text-sm">
                  Decida como gostaria de contribuir: código, conteúdo, testes ou comunidade.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Entre em contato</h3>
                <p className="text-gray-300 text-sm">
                  Junte-se ao nosso Discord ou envie um email para discutir suas ideias.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Comece a contribuir</h3>
                <p className="text-gray-300 text-sm">
                  Receba orientação e comece a fazer a diferença no projeto!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="bg-slate-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Benefícios de contribuir</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-gray-700">
            <CardContent className="p-8 text-center">
              <Github className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Repositório GitHub</h3>
              <p className="text-gray-300 mb-6">
                Acesse o código fonte e contribua diretamente com desenvolvimento
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Github className="w-4 h-4 mr-2" />
                Ver no GitHub
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-600/20 to-purple-500/20 border-gray-700">
            <CardContent className="p-8 text-center">
              <Coffee className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Apoio Financeiro</h3>
              <p className="text-gray-300 mb-6">
                Ajude a manter o projeto ativo com uma contribuição financeira
              </p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                <Gift className="w-4 h-4 mr-2" />
                Fazer Doação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
