"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  MessageSquare,
  Phone,
  Zap,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Menu,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ProjectCarousel from "@/components/project-carousel"
import UiUxSection from "@/components/ui-ux-section"
import ServicePopup from "@/components/service-popup"
import FloatingWhatsAppButton from "@/components/floating-whatsapp-button"
import GenericPopup from "@/components/generic-popup"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeServicePopup, setActiveServicePopup] = useState<number | null>(null)

  // Estados para os popups de footer
  const [activeFooterPopup, setActiveFooterPopup] = useState<string | null>(null)

  const services = [
    {
      id: 1,
      icon: <Globe className="h-10 w-10 text-pink-500" />,
      title: "Desenvolvimento Web",
      desc: "Sites responsivos e aplicações web modernas com foco em experiência do usuário.",
      longDescription:
        "Desenvolvimento de sites e aplicações web modernas, responsivas e otimizadas para todos os dispositivos. Utilizo as tecnologias mais recentes para criar experiências digitais que não apenas impressionam visualmente, mas também convertem visitantes em clientes.",
      benefits: [
        "Sites responsivos que funcionam em todos os dispositivos",
        "Otimização para mecanismos de busca (SEO)",
        "Carregamento rápido e performance otimizada",
        "Integração com sistemas de gestão de conteúdo",
        "Compatibilidade com todos os navegadores modernos",
      ],
    },
    {
      id: 2,
      icon: <Cpu className="h-10 w-10 text-pink-500" />,
      title: "Aplicações Mobile",
      desc: "Apps nativos e híbridos para iOS e Android com performance e design de alta qualidade.",
      longDescription:
        "Desenvolvimento de aplicativos móveis nativos e híbridos para iOS e Android que oferecem experiências de usuário excepcionais. Crio soluções que combinam design intuitivo com funcionalidades robustas para atender às necessidades específicas do seu negócio.",
      benefits: [
        "Aplicativos nativos para iOS e Android",
        "Soluções híbridas com React Native ou Flutter",
        "Interfaces intuitivas e de fácil navegação",
        "Integração com APIs e serviços externos",
        "Suporte a notificações push e recursos offline",
      ],
    },
    {
      id: 3,
      icon: <Database className="h-10 w-10 text-pink-500" />,
      title: "Banco de Dados",
      desc: "Modelagem e otimização de bancos de dados para garantir segurança e eficiência.",
      longDescription:
        "Projeto, implementação e otimização de bancos de dados relacionais e não-relacionais para garantir a segurança, eficiência e escalabilidade das suas aplicações. Trabalho com as principais tecnologias do mercado para criar soluções robustas e de alto desempenho.",
      benefits: [
        "Modelagem de dados eficiente e escalável",
        "Otimização de consultas para melhor performance",
        "Implementação de medidas de segurança avançadas",
        "Estratégias de backup e recuperação de dados",
        "Suporte a bancos SQL e NoSQL",
      ],
    },
    {
      id: 4,
      icon: <Layers className="h-10 w-10 text-pink-500" />,
      title: "Arquitetura de Software",
      desc: "Estruturação de sistemas escaláveis e de fácil manutenção.",
      longDescription:
        "Planejamento e implementação de arquiteturas de software robustas, escaláveis e de fácil manutenção. Desenvolvo soluções que permitem o crescimento contínuo do seu negócio, utilizando padrões de projeto e práticas recomendadas da indústria.",
      benefits: [
        "Arquiteturas modulares e escaláveis",
        "Implementação de padrões de projeto",
        "Sistemas distribuídos e microserviços",
        "Documentação técnica detalhada",
        "Facilidade de manutenção e evolução",
      ],
    },
    {
      id: 5,
      icon: <Code className="h-10 w-10 text-pink-500" />,
      title: "Desenvolvimento Backend",
      desc: "APIs robustas e serviços de backend com alta disponibilidade.",
      longDescription:
        "Desenvolvimento de APIs RESTful, GraphQL e serviços de backend robustos que garantem alta disponibilidade, segurança e performance. Crio soluções que servem como base sólida para suas aplicações frontend, permitindo uma experiência de usuário fluida e confiável.",
      benefits: [
        "APIs RESTful e GraphQL bem documentadas",
        "Autenticação e autorização seguras",
        "Processamento assíncrono e em tempo real",
        "Escalabilidade horizontal e vertical",
        "Monitoramento e logging avançados",
      ],
    },
    {
      id: 6,
      icon: <Zap className="h-10 w-10 text-pink-500" />,
      title: "Otimização de Performance",
      desc: "Análise e melhoria de sistemas existentes para máxima eficiência.",
      longDescription:
        "Análise detalhada e otimização de sistemas existentes para garantir máxima eficiência e performance. Identifico gargalos, implemento melhorias e refatoro código para que suas aplicações funcionem na velocidade que seus usuários esperam.",
      benefits: [
        "Análise de performance e identificação de gargalos",
        "Otimização de código e algoritmos",
        "Redução de tempo de carregamento",
        "Melhoria na experiência do usuário",
        "Redução de custos de infraestrutura",
      ],
    },
    {
      id: 7,
      icon: <Globe className="h-10 w-10 text-pink-500" />,
      title: "Consultoria",
      desc: "Consultoria técnica especializada para projetos de tecnologia.",
      longDescription:
        "Ofereço consultoria técnica especializada para empresas e startups que buscam orientação em seus projetos de tecnologia. Com experiência em diversas áreas do desenvolvimento de software, posso ajudar a definir a melhor estratégia, escolher as tecnologias mais adequadas e implementar as melhores práticas para o sucesso do seu projeto.",
      benefits: [
        "Análise técnica de projetos existentes",
        "Recomendações de tecnologias e arquiteturas",
        "Revisão de código e melhoria de qualidade",
        "Otimização de processos de desenvolvimento",
        "Treinamento e capacitação de equipes",
      ],
    },
    {
      id: 8,
      icon: <Layers className="h-10 w-10 text-pink-500" />,
      title: "UX/UI Design",
      desc: "Design de interfaces e experiências de usuário centradas no usuário.",
      longDescription:
        "Criação de interfaces intuitivas e experiências de usuário que não apenas impressionam visualmente, mas também resolvem problemas reais e atendem às necessidades dos usuários. Minha abordagem de design é centrada no usuário, combinando estética com funcionalidade para criar produtos digitais que encantam.",
      benefits: [
        "Design centrado no usuário",
        "Interfaces intuitivas e de fácil navegação",
        "Prototipagem e testes com usuários",
        "Design responsivo para todos os dispositivos",
        "Sistemas de design consistentes e escaláveis",
      ],
    },
  ]

  // Conteúdo para os popups de footer
  const footerPopups = {
    termos: {
      title: "Termos de Uso",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Estes Termos de Uso ("Termos") regem o uso de todos os serviços oferecidos por DevPro ("nós", "nosso" ou
            "nos").
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">1. Aceitação dos Termos</h4>
          <p>
            Ao acessar ou usar nossos serviços, você concorda em ficar vinculado a estes Termos. Se você não concordar
            com qualquer parte destes Termos, não poderá acessar ou usar nossos serviços.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">2. Alterações nos Termos</h4>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações entrarão em vigor
            imediatamente após a publicação dos Termos atualizados. Seu uso continuado dos serviços após tais alterações
            constitui sua aceitação dos novos Termos.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">3. Uso dos Serviços</h4>
          <p>
            Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes Termos. Você é
            responsável por todas as atividades que ocorrem sob sua conta.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">4. Propriedade Intelectual</h4>
          <p>
            Todo o conteúdo, recursos e funcionalidades disponíveis através de nossos serviços são propriedade da DevPro
            e estão protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade
            intelectual.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">5. Limitação de Responsabilidade</h4>
          <p>
            Em nenhuma circunstância a DevPro será responsável por quaisquer danos indiretos, incidentais, especiais,
            consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras
            perdas intangíveis.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">6. Lei Aplicável</h4>
          <p>
            Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições
            de conflito de leis.
          </p>

          <p className="mt-6 text-sm">Última atualização: {new Date().toLocaleDateString()}</p>
        </div>
      ),
    },
    privacidade: {
      title: "Política de Privacidade",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Esta Política de Privacidade descreve como a DevPro coleta, usa e compartilha suas informações pessoais
            quando você usa nossos serviços.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">1. Informações que Coletamos</h4>
          <p>Podemos coletar diferentes tipos de informações, incluindo:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Informações que você nos fornece diretamente (nome, e-mail, telefone)</li>
            <li>Informações de uso e navegação</li>
            <li>Informações do dispositivo e conexão</li>
            <li>Cookies e tecnologias similares</li>
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">2. Como Usamos Suas Informações</h4>
          <p>Usamos suas informações para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Comunicar-nos com você sobre nossos serviços</li>
            <li>Personalizar sua experiência</li>
            <li>Proteger nossos serviços e usuários</li>
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">3. Compartilhamento de Informações</h4>
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes
            circunstâncias:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Com seu consentimento</li>
            <li>Para cumprir obrigações legais</li>
            <li>Com prestadores de serviços que nos ajudam a operar nossos serviços</li>
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">4. Seus Direitos</h4>
          <p>Você tem direitos relacionados às suas informações pessoais, incluindo:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acesso às suas informações</li>
            <li>Correção de informações imprecisas</li>
            <li>Exclusão de suas informações</li>
            <li>Restrição ou objeção ao processamento</li>
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">5. Segurança</h4>
          <p>
            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração,
            divulgação ou destruição.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">6. Alterações nesta Política</h4>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações
            publicando a nova Política de Privacidade nesta página.
          </p>

          <p className="mt-6 text-sm">Última atualização: {new Date().toLocaleDateString()}</p>
        </div>
      ),
    },
    cookies: {
      title: "Política de Cookies",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Esta Política de Cookies explica como a DevPro usa cookies e tecnologias similares para reconhecê-lo quando
            você visita nosso site.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">1. O que são Cookies?</h4>
          <p>
            Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo quando você visita um site.
            Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente, bem como fornecer
            informações aos proprietários do site.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">2. Como Usamos Cookies</h4>
          <p>Usamos cookies para os seguintes propósitos:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cookies essenciais: Necessários para o funcionamento do site</li>
            <li>Cookies de preferências: Permitem que o site lembre suas escolhas</li>
            <li>Cookies estatísticos: Ajudam a entender como os visitantes interagem com o site</li>
            <li>Cookies de marketing: Usados para rastrear visitantes em sites</li>
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">3. Tipos de Cookies que Usamos</h4>
          <div className="space-y-2">
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <h5 className="font-medium text-white">Cookies de Sessão</h5>
              <p className="text-sm">Temporários e expiram quando você fecha o navegador</p>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <h5 className="font-medium text-white">Cookies Persistentes</h5>
              <p className="text-sm">Permanecem no seu dispositivo até expirarem ou serem excluídos</p>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <h5 className="font-medium text-white">Cookies Primários</h5>
              <p className="text-sm">Definidos por nós</p>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <h5 className="font-medium text-white">Cookies de Terceiros</h5>
              <p className="text-sm">Definidos por nossos parceiros ou provedores de serviços</p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-white mt-4">4. Controle de Cookies</h4>
          <p>
            A maioria dos navegadores permite que você controle cookies através das configurações. No entanto, se você
            limitar a capacidade dos sites de definir cookies, isso pode impactar sua experiência geral do usuário.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">5. Alterações nesta Política</h4>
          <p>
            Podemos atualizar esta Política de Cookies periodicamente. Incentivamos você a revisar esta política
            regularmente para estar informado sobre como estamos usando cookies.
          </p>

          <p className="mt-6 text-sm">Última atualização: {new Date().toLocaleDateString()}</p>
        </div>
      ),
    },
    devweb: {
      title: "Desenvolvimento Web",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Desenvolvimento de sites e aplicações web modernas, responsivas e otimizadas para todos os dispositivos.
            Utilizo as tecnologias mais recentes para criar experiências digitais que não apenas impressionam
            visualmente, mas também convertem visitantes em clientes.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">Tecnologias</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "React",
              "Next.js",
              "Vue.js",
              "Angular",
              "Node.js",
              "PHP",
              "WordPress",
              "Laravel",
              "Express",
              "MongoDB",
              "PostgreSQL",
            ].map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-purple-900/40 rounded-full text-sm border border-purple-800">
                {tech}
              </span>
            ))}
          </div>

          <h4 className="text-lg font-semibold text-white mt-4">Serviços Incluídos</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Sites institucionais e corporativos",
              "E-commerces e lojas virtuais",
              "Aplicações web progressivas (PWA)",
              "Sistemas web personalizados",
              "Landing pages de alta conversão",
              "Blogs e portais de conteúdo",
              "Integrações com APIs e serviços externos",
            ].map((service, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">Benefícios</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Sites responsivos que funcionam em todos os dispositivos",
              "Otimização para mecanismos de busca (SEO)",
              "Carregamento rápido e performance otimizada",
              "Integração com sistemas de gestão de conteúdo",
              "Compatibilidade com todos os navegadores modernos",
              "Código limpo e bem documentado",
              "Suporte técnico após a entrega",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() =>
              window.open(
                "https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20Desenvolvimento%20Web",
                "_blank",
              )
            }
            className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-5 text-base group"
          >
            Solicitar Orçamento
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      ),
    },
    appmobile: {
      title: "Aplicações Mobile",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Desenvolvimento de aplicativos móveis nativos e híbridos para iOS e Android que oferecem experiências de
            usuário excepcionais. Crio soluções que combinam design intuitivo com funcionalidades robustas para atender
            às necessidades específicas do seu negócio.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">Tecnologias</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL", "Redux", "MobX", "TypeScript"].map(
              (tech, i) => (
                <span key={i} className="px-2 py-1 bg-purple-900/40 rounded-full text-sm border border-purple-800">
                  {tech}
                </span>
              ),
            )}
          </div>

          <h4 className="text-lg font-semibold text-white mt-4">Tipos de Aplicativos</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Aplicativos de e-commerce",
              "Aplicativos de serviços",
              "Aplicativos de delivery",
              "Redes sociais e comunidades",
              "Aplicativos de produtividade",
              "Aplicativos de saúde e fitness",
              "Aplicativos empresariais internos",
            ].map((type, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{type}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">Benefícios</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Aplicativos nativos para iOS e Android",
              "Soluções híbridas com React Native ou Flutter",
              "Interfaces intuitivas e de fácil navegação",
              "Integração com APIs e serviços externos",
              "Suporte a notificações push e recursos offline",
              "Otimização para diferentes tamanhos de tela",
              "Publicação nas lojas de aplicativos (App Store e Google Play)",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() =>
              window.open(
                "https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20Aplicações%20Mobile",
                "_blank",
              )
            }
            className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-5 text-base group"
          >
            Solicitar Orçamento
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      ),
    },
    consultoria: {
      title: "Consultoria",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Ofereço consultoria técnica especializada para empresas e startups que buscam orientação em seus projetos de
            tecnologia. Com experiência em diversas áreas do desenvolvimento de software, posso ajudar a definir a
            melhor estratégia, escolher as tecnologias mais adequadas e implementar as melhores práticas para o sucesso
            do seu projeto.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">Áreas de Consultoria</h4>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              "Arquitetura de Software",
              "DevOps e CI/CD",
              "Segurança da Informação",
              "Otimização de Performance",
              "Escalabilidade",
              "Migração para a Nuvem",
              "Modernização de Sistemas",
              "Transformação Digital",
            ].map((area, i) => (
              <div key={i} className="bg-purple-900/30 p-2 rounded-lg text-center">
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>

          <h4 className="text-lg font-semibold text-white mt-4">Serviços Oferecidos</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Análise técnica de projetos existentes",
              "Recomendações de tecnologias e arquiteturas",
              "Revisão de código e melhoria de qualidade",
              "Otimização de processos de desenvolvimento",
              "Treinamento e capacitação de equipes",
              "Implementação de metodologias ágeis",
              "Definição de roadmap tecnológico",
              "Auditoria de segurança e performance",
            ].map((service, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">Benefícios</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Redução de custos operacionais",
              "Aumento da produtividade da equipe",
              "Melhoria na qualidade do software",
              "Aceleração do time-to-market",
              "Tomada de decisões baseada em experiência",
              "Implementação das melhores práticas do mercado",
              "Solução de problemas técnicos complexos",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() =>
              window.open(
                "https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20Consultoria",
                "_blank",
              )
            }
            className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-5 text-base group"
          >
            Solicitar Orçamento
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      ),
    },
    uxui: {
      title: "UX/UI Design",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Criação de interfaces intuitivas e experiências de usuário que não apenas impressionam visualmente, mas
            também resolvem problemas reais e atendem às necessidades dos usuários. Minha abordagem de design é centrada
            no usuário, combinando estética com funcionalidade para criar produtos digitais que encantam.
          </p>

          <h4 className="text-lg font-semibold text-white mt-4">Ferramentas e Metodologias</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Figma",
              "Adobe XD",
              "Sketch",
              "Design Thinking",
              "User Research",
              "Wireframing",
              "Prototyping",
              "Usability Testing",
              "Design Systems",
            ].map((tool, i) => (
              <span key={i} className="px-2 py-1 bg-purple-900/40 rounded-full text-sm border border-purple-800">
                {tool}
              </span>
            ))}
          </div>

          <h4 className="text-lg font-semibold text-white mt-4">Serviços de Design</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Design de interfaces para web e mobile",
              "Criação de sistemas de design",
              "Prototipagem e testes com usuários",
              "Redesign de interfaces existentes",
              "Auditorias de usabilidade",
              "Design responsivo",
              "Microinterações e animações",
            ].map((service, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-white mt-4">Benefícios</h4>
          <ul className="space-y-2 mt-2">
            {[
              "Design centrado no usuário",
              "Interfaces intuitivas e de fácil navegação",
              "Prototipagem e testes com usuários",
              "Design responsivo para todos os dispositivos",
              "Sistemas de design consistentes e escaláveis",
              "Aumento nas taxas de conversão",
              "Redução da curva de aprendizado para usuários",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() =>
              window.open(
                "https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20UX/UI%20Design",
                "_blank",
              )
            }
            className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-5 text-base group"
          >
            Solicitar Orçamento
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      ),
    },
  }

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observerRef.current?.unobserve(section)
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-purple-950/80 backdrop-blur-md border-b border-purple-800/50">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
          >
            DevPro
          </motion.div>

          <nav className="hidden md:flex gap-8">
            {[
              { id: "home", label: "Início" },
              { id: "sobre", label: "Sobre" },
              { id: "servicos", label: "Serviços" },
              { id: "projetos", label: "Projetos" },
              { id: "uiux", label: "UI/UX" },
              { id: "contato", label: "Contato" },
            ].map((item) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * ["home", "sobre", "servicos", "projetos", "uiux", "contato"].indexOf(item.id),
                }}
                onClick={() => scrollToSection(item.id)}
                className={`relative hover:text-pink-400 transition-colors ${
                  activeSection === item.id ? "text-pink-500" : "text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-pink-500"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block mr-8"
          >
            <Button
              onClick={() => scrollToSection("contato")}
              className="bg-pink-500 hover:bg-pink-600 text-white group"
              asChild
            >
              <a
                href="https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20conversar%20sobre%20um%20projeto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Fale Comigo
                <motion.div
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <MessageSquare className="h-4 w-4" />
                </motion.div>
              </a>
            </Button>
          </motion.div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-purple-900 border-b border-purple-800"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {[
                { id: "home", label: "Início" },
                { id: "sobre", label: "Sobre" },
                { id: "servicos", label: "Serviços" },
                { id: "projetos", label: "Projetos" },
                { id: "uiux", label: "UI/UX" },
                { id: "contato", label: "Contato" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 ${activeSection === item.id ? "text-pink-500" : "text-white"}`}
                >
                  {item.label}
                </button>
              ))}
              <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full mt-2" asChild>
                <a
                  href="https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20conversar%20sobre%20um%20projeto"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fale Comigo
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Linhas fluorescentes animadas - versão melhorada */}
          {/* Linhas verticais principais */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`main-line-${i}`}
              className={`absolute h-[40vh] w-[1px] bg-gradient-to-t from-transparent via-pink-500/${Math.random() > 0.5 ? "40" : "30"} to-transparent`}
              style={{
                left: `${5 + Math.random() * 90}%`,
                bottom: `-40vh`,
                filter: `blur(${Math.random() > 0.7 ? "0.5px" : "0px"})`,
                opacity: 0.1 + Math.random() * 0.4,
              }}
              animate={{
                y: [0, -500],
                opacity: [0.1 + Math.random() * 0.4, 0],
                scaleY: [1, 1 + Math.random() * 0.3],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}

          {/* Linhas verticais finas de fundo */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`thin-line-${i}`}
              className="absolute h-[25vh] w-[0.5px] bg-gradient-to-t from-transparent via-purple-500/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-25vh`,
                opacity: 0.05 + Math.random() * 0.1,
              }}
              animate={{
                y: [0, -400],
                opacity: [0.05 + Math.random() * 0.1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 15,
                ease: "linear",
              }}
            />
          ))}

          {/* Linhas horizontais sutis */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`horizontal-line-${i}`}
              className="absolute h-[1px] w-[15vw] bg-gradient-to-r from-transparent via-pink-500/15 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 100}%`,
                opacity: 0.03 + Math.random() * 0.08,
              }}
              animate={{
                x: [0, Math.random() > 0.5 ? 100 : -100],
                opacity: [0.03 + Math.random() * 0.08, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}

          {/* Efeito de pulso */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute rounded-full bg-pink-500/5"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 100}%`,
                filter: "blur(40px)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-pink-500"></div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold mb-4"
                >
                  QUEM
                  <br />
                  SOU
                  <span className="text-pink-500">?</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg md:text-xl text-gray-200"
              >
                Sou um Desenvolvedor Full Stack comprometido com inovação e resultados. Resolvo problemas com
                eficiência, transformando ideias em soluções digitais escaláveis, sempre mantendo o profissionalismo,
                qualidade e foco em entregar valor a cada projeto.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => scrollToSection("projetos")}
                  className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg group border border-white/20 shadow-lg"
                >
                  Ver Projetos
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="border-pink-500 text-white hover:bg-pink-500/10 px-8 py-6 text-lg bg-transparent"
                  asChild
                >
                  <a
                    href="https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20conversar%20sobre%20um%20projeto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contato
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Hexagon Background */}
              <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
                <motion.path
                  d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                  fill="none"
                  stroke="rgba(236, 72, 153, 0.3)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>

              {/* Rotating Circle */}
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(236, 72, 153, 0.1)"
                    strokeWidth="0.5"
                    strokeDasharray="1,5"
                  />
                </svg>
              </motion.div>

              {/* Profile Image with Gradient Border */}
              <div className="relative mx-auto max-w-md">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-75 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.75 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.div
                  className="relative rounded-full overflow-hidden border-2 border-white/10 aspect-square"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Image
                    src="/profile-image.png"
                    alt="Desenvolvedor Profissional"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Floating Info Tags */}
              <motion.div
                className="absolute -right-4 top-1/4 transform translate-x-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                  <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest">Full Stack Developer</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-1/4 transform -translate-x-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                  <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest">Criando Soluções</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                  <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest">Inovação Digital</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                  <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest">Facilitando Vidas</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll para descobrir</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-950/50 z-0"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,10 Q50,20 0,10 Z"
              fill="rgba(236, 72, 153, 0.05)"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M0,100 L100,100 L100,90 Q50,80 0,90 Z"
              fill="rgba(236, 72, 153, 0.05)"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block">
              <div className="relative">
                <motion.div
                  className="absolute -left-3 top-0 h-full w-1 bg-pink-500"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">SOBRE MIM</h2>
              </div>
            </div>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Conheça mais sobre minha trajetória e habilidades
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold">Minha Jornada</h3>
              <p className="text-gray-300">
                Com mais de 5 anos de experiência no desenvolvimento de soluções digitais, tenho me dedicado a criar
                produtos que não apenas atendem às necessidades dos clientes, mas também proporcionam experiências
                excepcionais aos usuários.
              </p>
              <p className="text-gray-300">
                Minha abordagem combina conhecimento técnico com uma visão estratégica de negócios, permitindo que eu
                desenvolva soluções que realmente geram valor e impacto positivo.
              </p>

              <div className="pt-4">
                <h3 className="text-2xl font-bold mb-4">Educação</h3>
                <div className="space-y-4">
                  <div className="bg-purple-900/30 backdrop-blur-sm p-4 rounded-lg border border-purple-800">
                    <h4 className="font-bold">Bacharelado em Sistemas da Informação</h4>
                    <p className="text-gray-400">Centro Universitário Leonardo da Vinci • 2022-2025</p>
                  </div>
                  <div className="bg-purple-900/30 backdrop-blur-sm p-4 rounded-lg border border-purple-800">
                    <h4 className="font-bold">Especialização em Desenvolvimento Web</h4>
                    <p className="text-gray-400">Udemy • 2023-2024</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold">Minhas Habilidades</h3>

              {[
                { skill: "Frontend Development", level: 90 },
                { skill: "Backend Development", level: 85 },
                { skill: "UI/UX Design", level: 75 },
                { skill: "Mobile Development", level: 80 },
                { skill: "DevOps", level: 70 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-pink-500">{item.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-purple-900/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <h3 className="text-2xl font-bold mb-4">Tecnologias</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Angular",
                    "Next.js",
                    "Node.js",
                    ".NET",
                    "AWS",
                    "Docker",
                    "GraphQL",
                    "MongoDB",
                    "PostgreSQL",
                  ].map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{ y: -5, scale: 1.05, backgroundColor: "rgba(236, 72, 153, 0.2)" }}
                      className="px-3 py-1.5 bg-purple-900/40 border border-purple-800 rounded-full text-sm hover:border-pink-500 transition-all cursor-pointer"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Linhas animadas */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`service-line-${i}`}
              className="absolute h-[30vh] w-[1px] bg-gradient-to-t from-transparent via-pink-500/30 to-transparent"
              style={{
                left: `${5 + Math.random() * 90}%`,
                bottom: `-30vh`,
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={{
                y: [0, -400],
                opacity: [0.1 + Math.random() * 0.3, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}

          {/* Círculos gradientes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`service-circle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 blur-xl"
              style={{
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="serviceGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#serviceGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block">
              <div className="relative">
                <motion.div
                  className="absolute -left-3 top-0 h-full w-1 bg-pink-500"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">SERVIÇOS</h2>
              </div>
            </div>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ofereço soluções completas para transformar sua ideia em realidade digital
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-purple-900/30 backdrop-blur-sm p-8 rounded-xl border border-purple-800 hover:border-pink-500 transition-all group"
              >
                <div className="mb-6 relative">
                  <div className="absolute -inset-2 bg-pink-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300">{service.desc}</p>
                <div className="mt-6 pt-4 border-t border-purple-800/50">
                  <button
                    onClick={() => setActiveServicePopup(service.id)}
                    className="inline-flex items-center text-pink-500 hover:text-pink-400 transition-colors group/link"
                  >
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg group" asChild>
              <a
                href="https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Orçamento
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Service Popups */}
        {services.map((service) => (
          <ServicePopup
            key={service.id}
            isOpen={activeServicePopup === service.id}
            onClose={() => setActiveServicePopup(null)}
            service={service}
          />
        ))}
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 md:py-32 bg-purple-950/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(236, 72, 153, 0.1)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block">
              <div className="relative">
                <motion.div
                  className="absolute -left-3 top-0 h-full w-1 bg-pink-500"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">PROJETOS</h2>
              </div>
            </div>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Conheça alguns dos projetos que desenvolvi com dedicação e excelência
            </motion.p>
          </motion.div>

          <ProjectCarousel />
        </div>
      </section>

      {/* UI/UX Section */}
      <section id="uiux">
        <UiUxSection />
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Linhas animadas */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`testimonial-line-${i}`}
              className="absolute h-[30vh] w-[1px] bg-gradient-to-t from-transparent via-pink-500/30 to-transparent"
              style={{
                left: `${5 + Math.random() * 90}%`,
                bottom: `-30vh`,
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={{
                y: [0, -400],
                opacity: [0.1 + Math.random() * 0.3, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}

          {/* Círculos gradientes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`testimonial-circle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 blur-xl"
              style={{
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="testimonialGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#testimonialGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block">
              <div className="relative">
                <motion.div
                  className="absolute -left-3 top-0 h-full w-1 bg-pink-500"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">DEPOIMENTOS</h2>
              </div>
            </div>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              O que meus clientes dizem sobre meu trabalho
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Silva",
                role: "CEO, TechStart",
                text: "Trabalho excepcional! Entregou além das expectativas e no prazo combinado. A comunicação foi clara durante todo o processo.",
              },
              {
                name: "Carlos Mendes",
                role: "Diretor de Produto, InnovateX",
                text: "Profissional extremamente dedicado e com conhecimento técnico impressionante. Resolveu problemas complexos com soluções elegantes.",
              },
              {
                name: "Mariana Costa",
                role: "Fundadora, DigitalGrowth",
                text: "Transformou nossa ideia em um produto digital incrível. Recomendo fortemente! Sua capacidade de entender nossas necessidades foi fundamental.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-purple-900/30 backdrop-blur-sm p-8 rounded-xl border border-purple-800 relative group hover:border-pink-500 transition-all"
              >
                <div className="absolute -top-4 -left-4 text-5xl text-pink-500 opacity-50 group-hover:opacity-80 transition-opacity">
                  "
                </div>
                <p className="text-gray-200 mb-6 relative z-10">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-pink-400 transition-colors">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-700/20 z-0"></div>

        <div className="absolute inset-0 z-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern
              id="diagonalLines"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(236, 72, 153, 0.1)" strokeWidth="1" />
            </pattern>
            <rect width="100" height="100" fill="url(#diagonalLines)" />
          </svg>
        </div>

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            PRONTO PARA TRANSFORMAR SUA IDEIA EM REALIDADE?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Entre em contato agora mesmo e vamos discutir como posso ajudar no seu próximo projeto
          </motion.p>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-7 text-lg group" asChild>
              <a
                href="https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Orçamento
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Linhas animadas */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`contact-line-${i}`}
              className="absolute h-[30vh] w-[1px] bg-gradient-to-t from-transparent via-pink-500/30 to-transparent"
              style={{
                left: `${5 + Math.random() * 90}%`,
                bottom: `-30vh`,
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={{
                y: [0, -400],
                opacity: [0.1 + Math.random() * 0.3, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}

          {/* Círculos gradientes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`contact-circle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 blur-xl"
              style={{
                width: `${150 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="contactGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#contactGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mb-6">
                <motion.div
                  className="absolute -left-4 top-0 h-full w-1 bg-pink-500"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
                <h2 className="text-4xl md:text-5xl font-bold">CONTATO</h2>
              </div>
              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Estou disponível para novos projetos e parcerias. Preencha o formulário ou entre em contato através dos
                canais abaixo.
              </motion.p>

              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a
                  href="https://wa.me/5547992865256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group hover:bg-purple-900/30 p-3 rounded-lg transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/40 transition-colors">
                    <Phone className="h-5 w-5 text-pink-500" />
                  </div>
                  <span className="group-hover:text-pink-400 transition-colors">+55 (47) 99286-5256</span>
                </a>
                <a
                  href="mailto:contato@devpro.fun"
                  className="flex items-center gap-4 group hover:bg-purple-900/30 p-3 rounded-lg transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/40 transition-colors">
                    <MessageSquare className="h-5 w-5 text-pink-500" />
                  </div>
                  <span className="group-hover:text-pink-400 transition-colors">contato@devpro.fun</span>
                </a>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  { icon: <Github className="h-5 w-5" />, url: "https://github.com" },
                  { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com" },
                  { icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-12 w-12 rounded-full bg-purple-900 hover:bg-pink-500 transition-colors flex items-center justify-center"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-purple-900/30 backdrop-blur-sm p-8 rounded-xl border border-purple-800"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  window.open(
                    "https://wa.me/5547992865256?text=Olá,%20entrei%20em%20contato%20pelo%20formulário%20do%20site",
                    "_blank",
                  )
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-purple-950 border border-purple-800 focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-purple-950 border border-purple-800 focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-purple-950 border border-purple-800 focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-purple-950 border border-purple-800 focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg group">
                  Enviar Mensagem
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-3 border-pink-500 text-white hover:bg-pink-500/10 py-6 text-lg group bg-transparent"
                  onClick={() =>
                    window.open(
                      "https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20conversar%20sobre%20um%20projeto",
                      "_blank",
                    )
                  }
                >
                  Falar no WhatsApp
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-950 border-t border-purple-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                DevPro
              </div>
              <p className="text-gray-300 mb-4">Transformando ideias em soluções digitais de alta qualidade.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("sobre")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Sobre
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicos")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Serviços
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("projetos")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Projetos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("uiux")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    UI/UX
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Serviços</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveFooterPopup("devweb")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Desenvolvimento Web
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveFooterPopup("appmobile")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Aplicações Mobile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveFooterPopup("consultoria")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    Consultoria
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveFooterPopup("uxui")}
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                  >
                    UX/UI Design
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">Inscreva-se para receber dicas e novidades sobre desenvolvimento.</p>
              <div className="flex">
                <input
                  type="email"
                  className="px-4 py-2 rounded-l-lg bg-purple-900 border border-purple-800 focus:outline-none focus:border-pink-500 transition-colors flex-1"
                  placeholder="seu@email.com"
                />
                <Button className="rounded-l-none bg-pink-500 hover:bg-pink-600">Enviar</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-900 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} DevPro. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => setActiveFooterPopup("termos")}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Termos
              </button>
              <button
                onClick={() => setActiveFooterPopup("privacidade")}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Privacidade
              </button>
              <button
                onClick={() => setActiveFooterPopup("cookies")}
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Footer Popups */}
      {activeFooterPopup && (
        <GenericPopup
          isOpen={!!activeFooterPopup}
          onClose={() => setActiveFooterPopup(null)}
          title={footerPopups[activeFooterPopup as keyof typeof footerPopups].title}
          content={footerPopups[activeFooterPopup as keyof typeof footerPopups].content}
        />
      )}
    </div>
  )
}

