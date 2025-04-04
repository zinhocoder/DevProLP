"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Layers, Palette, Smartphone, Monitor, MousePointer, Eye } from "lucide-react"

export default function UiUxSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const processSteps = [
    {
      icon: <Eye className="h-6 w-6 text-pink-500" />,
      title: "Pesquisa e Descoberta",
      description: "Análise profunda das necessidades dos usuários e objetivos de negócio.",
    },
    {
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      title: "Design Conceitual",
      description: "Criação de wireframes e protótipos de baixa fidelidade para validação inicial.",
    },
    {
      icon: <Layers className="h-6 w-6 text-pink-500" />,
      title: "Design Visual",
      description: "Desenvolvimento de interfaces visualmente atraentes e sistemas de design consistentes.",
    },
    {
      icon: <MousePointer className="h-6 w-6 text-pink-500" />,
      title: "Prototipagem",
      description: "Protótipos interativos de alta fidelidade para testar fluxos e interações.",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-pink-500" />,
      title: "Testes com Usuários",
      description: "Validação com usuários reais para identificar melhorias e refinamentos.",
    },
    {
      icon: <Monitor className="h-6 w-6 text-pink-500" />,
      title: "Implementação",
      description: "Colaboração com desenvolvedores para garantir a fidelidade da implementação.",
    },
  ]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-purple-950/80 z-0"></div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>

        {/* Decorative Lines */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,0 L10,0 L8,100 L0,100 Z"
            fill="rgba(236, 72, 153, 0.05)"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.path
            d="M100,0 L90,0 L92,100 L100,100 Z"
            fill="rgba(236, 72, 153, 0.05)"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
        </svg>

        {/* Animated Circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-500/10 blur-xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.7,
            }}
          />
        ))}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">UI/UX DESIGN</h2>
            </div>
          </div>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Criando experiências digitais imersivas e interfaces que encantam os usuários
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Interactive Display */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Futuristic Frame */}
            <div className="relative mx-auto max-w-md">
              {/* Outer Frame with Animated Border */}
              <motion.div
                className="absolute -inset-6 rounded-2xl opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm"></div>

                  {/* Animated Border */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.rect
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      fill="none"
                      stroke="url(#borderGradient)"
                      strokeWidth="0.5"
                      strokeDasharray="10,5"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: 30 }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <defs>
                      <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#7e22ce" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Corner Accents */}
                  {[
                    { x: -5, y: -5 },
                    { x: 95, y: -5 },
                    { x: -5, y: 95 },
                    { x: 95, y: 95 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-6"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d={
                            i === 0 ? "M1 12V1H12" : i === 1 ? "M12 1H23V12" : i === 2 ? "M1 12V23H12" : "M12 23H23V12"
                          }
                          stroke="#ec4899"
                          strokeWidth="2"
                        />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Main Display */}
              <motion.div
                className="relative rounded-xl overflow-hidden border-2 border-purple-800/50 aspect-square bg-gradient-to-br from-purple-900/90 to-purple-950/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Glowing Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-600/0 to-pink-500/20"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />

                {/* Image */}
                <div className="relative z-10 p-2">
                  <Image
                    src="/uiux-image.png"
                    alt="UI/UX Design - Realidade Virtual"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Interface Elements */}
                <div className="absolute top-3 left-3 flex space-x-1.5">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-pink-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-purple-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-pink-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                  />
                </div>

                {/* Tech Labels */}
                <motion.div
                  className="absolute bottom-3 left-3 bg-purple-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-800/50 text-xs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <span className="text-pink-400">VR Experience</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-3 right-3 bg-purple-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-800/50 text-xs"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <span className="text-pink-400">UI/UX Design</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -right-4 top-1/4 transform translate-x-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-xs uppercase tracking-widest">Imersivo</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-4 bottom-1/4 transform -translate-x-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-xs uppercase tracking-widest">Interativo</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-800">
                <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-xs uppercase tracking-widest">Inovador</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Design Centrado no Usuário</h3>
              <p className="text-gray-300">
                Minha abordagem de UI/UX coloca o usuário no centro de todo o processo de design. Crio interfaces
                intuitivas e experiências digitais que não apenas impressionam visualmente, mas também resolvem
                problemas reais e atendem às necessidades dos usuários.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-4 text-white">Meu Processo de Design</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-purple-900/30 backdrop-blur-sm p-4 rounded-lg border border-purple-800 hover:border-pink-500 transition-all group"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-purple-950 p-2 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                        {step.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-white group-hover:text-pink-400 transition-colors">
                          {step.title}
                        </h5>
                        <p className="text-sm text-gray-300 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Especialidades</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Design de Interface",
                  "Experiência do Usuário",
                  "Prototipagem",
                  "Design de Interação",
                  "Arquitetura de Informação",
                  "Design Responsivo",
                  "Design de Apps",
                  "Usabilidade",
                  "Design de Sistemas",
                  "Acessibilidade",
                ].map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    className="px-3 py-1.5 bg-purple-900/40 border border-purple-800 rounded-full text-sm hover:bg-pink-500/20 hover:border-pink-500 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-5 text-base group" asChild>
                <a
                  href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20UI/UX%20Design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Orçamento
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

