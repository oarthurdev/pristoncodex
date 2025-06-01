
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Eye, Lock, Database, Users, Mail, FileText } from "lucide-react";

export default function PoliticaPrivacidadePage() {
  const lastUpdated = "15 de Janeiro de 2024";

  const sections = [
    {
      icon: <Database className="w-6 h-6 text-blue-400" />,
      title: "Informações que Coletamos",
      content: [
        "Informações de cadastro (nome de usuário, email)",
        "Dados de navegação e uso do site",
        "Informações de dispositivo (IP, navegador, sistema operacional)",
        "Cookies e tecnologias similares",
        "Conteúdo gerado pelo usuário (posts, comentários)"
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-green-400" />,
      title: "Como Usamos suas Informações",
      content: [
        "Fornecer e melhorar nossos serviços",
        "Personalizar sua experiência no site",
        "Comunicar sobre atualizações e novidades",
        "Moderar conteúdo e manter a segurança",
        "Analisar padrões de uso para melhorias"
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Compartilhamento de Dados",
      content: [
        "Não vendemos suas informações pessoais",
        "Dados podem ser compartilhados com prestadores de serviços",
        "Informações públicas do perfil são visíveis para outros usuários",
        "Podemos compartilhar dados por requisição legal",
        "Em caso de fusão ou aquisição da empresa"
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-red-400" />,
      title: "Segurança dos Dados",
      content: [
        "Uso de criptografia SSL/TLS para proteção",
        "Armazenamento seguro em servidores protegidos",
        "Acesso restrito aos dados pessoais",
        "Monitoramento regular de segurança",
        "Backup e recuperação de dados"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600/20 to-purple-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transparência sobre como coletamos, usamos e protegemos suas informações pessoais.
            </p>
            <p className="text-gray-400 mt-4">
              Última atualização: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="bg-slate-800 border-gray-700 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Introdução</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                O Priston Codex está comprometido em proteger sua privacidade e dados pessoais. 
                Esta Política de Privacidade explica como coletamos, usamos, armazenamos e 
                protegemos suas informações quando você utiliza nosso site e serviços.
              </p>
              <p>
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política. 
                Recomendamos que leia atentamente todo o documento.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="bg-slate-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <CardTitle className="text-white text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cookies */}
        <Card className="bg-slate-800 border-gray-700 mt-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-amber-400" />
              <CardTitle className="text-white text-xl">Política de Cookies</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Cookies Essenciais</h4>
                  <p className="text-sm">Necessários para o funcionamento básico do site</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Cookies de Análise</h4>
                  <p className="text-sm">Ajudam a entender como você usa o site</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Cookies de Preferência</h4>
                  <p className="text-sm">Lembram suas configurações e preferências</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Cookies de Marketing</h4>
                  <p className="text-sm">Utilizados para personalizar anúncios</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rights */}
        <Card className="bg-slate-800 border-gray-700 mt-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-green-400" />
              <CardTitle className="text-white text-xl">Seus Direitos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <p>Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-white font-medium">Acesso</span>
                  </div>
                  <p className="text-sm text-gray-400 ml-4">Solicitar cópia dos seus dados</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-white font-medium">Correção</span>
                  </div>
                  <p className="text-sm text-gray-400 ml-4">Corrigir informações incorretas</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-white font-medium">Exclusão</span>
                  </div>
                  <p className="text-sm text-gray-400 ml-4">Solicitar exclusão dos dados</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-white font-medium">Portabilidade</span>
                  </div>
                  <p className="text-sm text-gray-400 ml-4">Transferir dados para outro serviço</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-500/20 border-gray-700 mt-8">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">
              Dúvidas sobre Privacidade?
            </h3>
            <p className="text-gray-300 mb-6">
              Entre em contato conosco para esclarecer qualquer dúvida sobre nossa política de privacidade 
              ou para exercer seus direitos de proteção de dados.
            </p>
            <div className="space-y-2">
              <p className="text-blue-400 font-medium">privacidade@pristoncodex.com</p>
              <p className="text-gray-400 text-sm">Resposta em até 48 horas</p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="bg-slate-800 border-gray-700 mt-8">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">Alterações nesta Política</h3>
            <p className="text-gray-300 text-sm">
              Podemos atualizar esta Política de Privacidade ocasionalmente. Notificaremos sobre 
              mudanças significativas através do site ou por email. A data da última atualização 
              está sempre indicada no topo desta página.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
