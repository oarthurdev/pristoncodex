
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, AlertTriangle, Shield, Users, Gavel, Mail, CheckCircle } from "lucide-react";

export default function TermosUsoPage() {
  const lastUpdated = "15 de Janeiro de 2024";
  const effectiveDate = "15 de Janeiro de 2024";

  const terms = [
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Aceitação dos Termos",
      content: [
        "Ao acessar e usar o Priston Codex, você concorda com estes Termos de Uso",
        "Se você não concordar com algum termo, não deve usar nossos serviços",
        "O uso continuado do site constitui aceitação de atualizações dos termos",
        "Usuários menores de idade devem ter autorização dos responsáveis"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Uso Permitido",
      content: [
        "Usar o site para fins educacionais e informativos sobre Priston Tale",
        "Compartilhar conhecimento e experiências relacionadas ao jogo",
        "Participar respeitosamente das discussões da comunidade",
        "Baixar conteúdo disponibilizado oficialmente no site",
        "Contribuir com conteúdo original e útil para a comunidade"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
      title: "Condutas Proibidas",
      content: [
        "Usar o site para atividades ilegais ou prejudiciais",
        "Publicar conteúdo ofensivo, discriminatório ou inadequado",
        "Tentar hackear, interferir ou sobrecarregar nossos sistemas",
        "Violar direitos autorais ou propriedade intelectual",
        "Criar múltiplas contas ou usar informações falsas",
        "Distribuir malware, vírus ou código malicioso"
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      title: "Conteúdo do Usuário",
      content: [
        "Você mantém os direitos sobre o conteúdo que cria",
        "Concede ao Priston Codex licença para usar e exibir seu conteúdo",
        "É responsável pela veracidade e legalidade do conteúdo publicado",
        "Pode solicitar remoção do seu conteúdo a qualquer momento",
        "Conteúdo deve estar relacionado ao tema do site"
      ]
    }
  ];

  const penalties = [
    { violation: "Spam ou conteúdo irrelevante", action: "Advertência ou remoção do conteúdo" },
    { violation: "Linguagem ofensiva", action: "Advertência e possível suspensão temporária" },
    { violation: "Violação de direitos autorais", action: "Remoção imediata do conteúdo" },
    { violation: "Tentativa de hack", action: "Banimento permanente" },
    { violation: "Múltiplas contas", action: "Suspensão de todas as contas" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Termos de Uso
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Regras e diretrizes para o uso do Priston Codex. 
              Leia atentamente antes de utilizar nossos serviços.
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Última atualização</p>
                <p className="text-white font-semibold">{lastUpdated}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Data de vigência</p>
                <p className="text-white font-semibold">{effectiveDate}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="bg-slate-800 border-gray-700 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Gavel className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Introdução</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                Bem-vindo ao Priston Codex! Estes Termos de Uso estabelecem as regras e condições 
                para o uso de nosso site e serviços. Nosso objetivo é manter uma comunidade 
                saudável e respeitosa para todos os usuários.
              </p>
              <p>
                O Priston Codex é uma plataforma dedicada ao compartilhamento de conhecimento 
                sobre Priston Tale, incluindo guias, tutoriais, downloads e discussões da comunidade.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Terms */}
        <div className="space-y-8">
          {terms.map((term, index) => (
            <Card key={index} className="bg-slate-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {term.icon}
                  <CardTitle className="text-white text-xl">{term.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {term.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Penalties */}
        <Card className="bg-slate-800 border-gray-700 mt-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <CardTitle className="text-white text-xl">Violações e Penalidades</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                Violações dos Termos de Uso podem resultar nas seguintes ações:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-white font-semibold py-3">Violação</th>
                      <th className="text-left text-white font-semibold py-3">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penalties.map((penalty, index) => (
                      <tr key={index} className="border-b border-gray-700 last:border-b-0">
                        <td className="py-3 text-gray-300">{penalty.violation}</td>
                        <td className="py-3">
                          <Badge className="bg-red-600 text-white">
                            {penalty.action}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="bg-slate-800 border-gray-700 mt-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <CardTitle className="text-white text-xl">Propriedade Intelectual</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="text-white font-semibold mb-2">Conteúdo do Site</h4>
                <p className="text-sm">
                  Todo o conteúdo original do Priston Codex (design, código, textos próprios) 
                  está protegido por direitos autorais e é de propriedade do projeto.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Priston Tale</h4>
                <p className="text-sm">
                  Priston Tale é propriedade de seus respectivos detentores de direitos autorais. 
                  Nosso site é independente e não oficial.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Conteúdo de Terceiros</h4>
                <p className="text-sm">
                  Respeitamos os direitos autorais de terceiros e removemos conteúdo 
                  infrator mediante notificação adequada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-slate-800 border-gray-700 mt-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <CardTitle className="text-white text-xl">Isenção de Responsabilidade</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <p>
                O Priston Codex é fornecido "como está" sem garantias de qualquer tipo. 
                Não nos responsabilizamos por:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2"></span>
                  <span>Danos resultantes do uso das informações do site</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2"></span>
                  <span>Interrupções temporárias do serviço</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2"></span>
                  <span>Conteúdo gerado por usuários</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2"></span>
                  <span>Links para sites externos</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact and Changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-gray-700">
            <CardContent className="p-6 text-center">
              <Mail className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">
                Dúvidas sobre os Termos?
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Entre em contato conosco para esclarecer qualquer questão sobre estes termos.
              </p>
              <p className="text-blue-400 font-medium">legal@pristoncodex.com</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-3">Alterações nos Termos</h3>
              <p className="text-gray-300 text-sm mb-3">
                Reservamo-nos o direito de modificar estes termos a qualquer momento.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Notificação por email</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Aviso no site</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">30 dias para aceitar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
