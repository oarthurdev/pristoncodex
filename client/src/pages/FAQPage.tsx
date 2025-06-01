
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, HelpCircle, Book, Download, Video, Users, Settings } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Como posso começar a jogar Priston Tale?",
    answer: "Para começar a jogar Priston Tale, você precisa baixar o cliente do jogo, criar uma conta e escolher um servidor. Recomendamos começar pelos nossos guias para iniciantes que explicam os conceitos básicos do jogo, criação de personagem e primeiros passos.",
    category: "Iniciante",
    tags: ["começar", "download", "conta"]
  },
  {
    id: "2",
    question: "Onde posso baixar o cliente do jogo?",
    answer: "Você pode baixar o cliente oficial do Priston Tale na nossa seção de Downloads. Sempre baixe apenas de fontes oficiais para garantir a segurança do seu computador. Evite downloads de sites não confiáveis.",
    category: "Download",
    tags: ["download", "cliente", "segurança"]
  },
  {
    id: "3",
    question: "Quais são as classes disponíveis no jogo?",
    answer: "O Priston Tale possui várias classes: Fighter (guerreiro corpo a corpo), Mechanician (especialista em armas), Archer (arqueiro de longa distância), Pikeman (lanceiro), Atalanta (amazona), Knight (cavaleiro), Magician (mago), Priestess (sacerdotisa) e Shaman (xamã). Cada classe tem suas próprias habilidades e estilo de jogo único.",
    category: "Gameplay",
    tags: ["classes", "personagem", "habilidades"]
  },
  {
    id: "4",
    question: "Como funcionam os servidores privados?",
    answer: "Servidores privados são servidores não oficiais mantidos pela comunidade. Eles podem ter rates diferentes, eventos customizados e modificações no gameplay. Cada servidor tem suas próprias regras e características. Sempre verifique a reputação do servidor antes de jogar.",
    category: "Servidores",
    tags: ["servidores", "privado", "rates"]
  },
  {
    id: "5",
    question: "Posso jogar no mobile/celular?",
    answer: "Atualmente, o Priston Tale é um jogo para PC. Não existe uma versão oficial para dispositivos móveis. Existem tentativas da comunidade de criar adaptações, mas recomendamos jogar na versão PC para a melhor experiência.",
    category: "Compatibilidade",
    tags: ["mobile", "celular", "pc"]
  },
  {
    id: "6",
    question: "Como reportar bugs ou problemas?",
    answer: "Você pode reportar bugs através da nossa página 'Reportar Bug'. Preencha o formulário com o máximo de detalhes possível, incluindo passos para reproduzir o problema, screenshots e informações do seu sistema.",
    category: "Suporte",
    tags: ["bug", "problema", "suporte"]
  },
  {
    id: "7",
    question: "Posso contribuir com o projeto?",
    answer: "Sim! Aceitamos contribuições de várias formas: desenvolvimento de código, criação de conteúdo, tradução, testes e moderação da comunidade. Visite nossa página 'Contribuir' para saber como participar.",
    category: "Contribuição",
    tags: ["contribuir", "comunidade", "desenvolvimento"]
  },
  {
    id: "8",
    question: "Os guias são atualizados regularmente?",
    answer: "Sim, nossa equipe e comunidade trabalham constantemente para manter os guias atualizados. Quando há mudanças significativas no jogo ou novas descobertas, os guias são revisados e atualizados.",
    category: "Conteúdo",
    tags: ["guias", "atualização", "conteúdo"]
  }
];

const categories = [
  { name: "Todos", icon: <HelpCircle className="w-4 h-4" />, count: faqData.length },
  { name: "Iniciante", icon: <Book className="w-4 h-4" />, count: faqData.filter(item => item.category === "Iniciante").length },
  { name: "Download", icon: <Download className="w-4 h-4" />, count: faqData.filter(item => item.category === "Download").length },
  { name: "Gameplay", icon: <Video className="w-4 h-4" />, count: faqData.filter(item => item.category === "Gameplay").length },
  { name: "Servidores", icon: <Settings className="w-4 h-4" />, count: faqData.filter(item => item.category === "Servidores").length },
  { name: "Suporte", icon: <Users className="w-4 h-4" />, count: faqData.filter(item => item.category === "Suporte").length }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600/20 to-purple-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">❓</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Encontre respostas rápidas para as dúvidas mais comuns sobre 
              Priston Tale e nossa comunidade.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <Card className="bg-slate-800 border-gray-700 mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar perguntas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                      selectedCategory === category.name 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedCategory === "Todos" ? "Todas as Perguntas" : selectedCategory}
              </h2>
              <p className="text-gray-400">
                {filteredFAQ.length} pergunta(s) encontrada(s)
                {searchTerm && ` para "${searchTerm}"`}
              </p>
            </div>

            {filteredFAQ.length === 0 ? (
              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-12 text-center">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Nenhuma pergunta encontrada</h3>
                  <p className="text-gray-400">
                    Tente ajustar sua busca ou escolher uma categoria diferente.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQ.map((item, index) => (
                      <AccordionItem 
                        key={item.id} 
                        value={item.id}
                        className="border-b border-gray-700 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
                          <div className="flex items-start space-x-3 text-white">
                            <span className="text-blue-400 font-bold text-sm mt-1">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span>{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 pl-8">
                          <div className="space-y-4">
                            <p>{item.answer}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-blue-600 text-white">
                                {item.category}
                              </Badge>
                              {item.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="bg-gray-700 text-gray-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* Help Section */}
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-500/20 border-gray-700 mt-8">
              <CardContent className="p-8 text-center">
                <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">
                  Não encontrou sua resposta?
                </h3>
                <p className="text-gray-300 mb-6">
                  Entre em contato conosco ou visite nosso fórum para obter ajuda da comunidade.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Entrar em Contato
                  </button>
                  <button className="border border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 px-6 py-2 rounded-lg transition-colors">
                    Visitar Fórum
                  </button>
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
