"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  type: string
  demoContent: {
    type: "image" | "animation"
    content: React.ReactNode
  }
}

export default function ProjectCarousel() {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description:
        "Dashboard administrativo completo para gerenciamento de loja online com análise de vendas e gestão de produtos.",
      image: "/project1.png",
      type: "Web App",
      demoContent: {
        type: "animation",
        content: <EcommerceDashboardDemo />,
      },
    },
    {
      id: 2,
      title: "Landing Page Corporativa",
      description: "Design moderno e responsivo para empresa de tecnologia com alta taxa de conversão.",
      image: "/project2.png",
      type: "Website",
      demoContent: {
        type: "animation",
        content: <CorporateLandingDemo />,
      },
    },
    {
      id: 3,
      title: "Aplicativo de Finanças",
      description:
        "Aplicativo para controle financeiro pessoal com visualização de gastos e planejamento orçamentário.",
      image: "/project3.png",
      type: "Mobile App",
      demoContent: {
        type: "animation",
        content: <FinanceAppDemo />,
      },
    },
    {
      id: 4,
      title: "Sistema de Gestão",
      description: "Plataforma completa para gestão empresarial com módulos de RH, finanças e operações.",
      image: "/project4.png",
      type: "Web Platform",
      demoContent: {
        type: "animation",
        content: <ManagementSystemDemo />,
      },
    },
    {
      id: 5,
      title: "Marketplace",
      description: "Plataforma de marketplace com múltiplos vendedores, sistema de pagamentos e avaliações.",
      image: "/project5.png",
      type: "E-commerce",
      demoContent: {
        type: "animation",
        content: <MarketplaceDemo />,
      },
    },
    {
      id: 6,
      title: "Rede Social Profissional",
      description: "Rede para conexão entre profissionais com feed personalizado e sistema de mensagens.",
      image: "/project6.png",
      type: "Social Platform",
      demoContent: {
        type: "animation",
        content: <SocialNetworkDemo />,
      },
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const controls = useAnimation()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX

    if (deltaX > 50) {
      handlePrev()
      setIsDragging(false)
    } else if (deltaX < -50) {
      handleNext()
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - startX

    if (deltaX > 50) {
      handlePrev()
      setIsDragging(false)
    } else if (deltaX < -50) {
      handleNext()
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
      }
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.5,
        },
      }
    },
  }

  return (
    <div className="w-full relative py-10">
      {/* Desktop Navigation Buttons */}
      <div className="hidden md:flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-20 px-4">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-purple-900/80 backdrop-blur-sm border border-purple-800 text-white hover:bg-pink-500 hover:border-pink-500 shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-purple-900/80 backdrop-blur-sm border border-purple-800 text-white hover:bg-pink-500 hover:border-pink-500 shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden h-[500px] md:h-[600px] w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-center gap-4 md:gap-8 w-full`}
            >
              {isMobile ? (
                <ProjectCard project={projects[currentIndex]} isActive={true} />
              ) : (
                <>
                  <ProjectCard
                    project={projects[(currentIndex - 1 + projects.length) % projects.length]}
                    isActive={false}
                    onClick={handlePrev}
                  />
                  <ProjectCard project={projects[currentIndex]} isActive={true} />
                  <ProjectCard
                    project={projects[(currentIndex + 1) % projects.length]}
                    isActive={false}
                    onClick={handleNext}
                  />
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-pink-500" : "w-2.5 bg-purple-800 hover:bg-pink-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center mt-6 gap-4">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-purple-900/80 backdrop-blur-sm border border-purple-800 text-white hover:bg-pink-500 hover:border-pink-500"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-purple-900/80 backdrop-blur-sm border border-purple-800 text-white hover:bg-pink-500 hover:border-pink-500"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Solicitar Orçamento Button */}
      <div className="text-center mt-12">
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg group" asChild>
          <a
            href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20um%20projeto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar Orçamento
            <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          </a>
        </Button>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  isActive: boolean
  onClick?: () => void
}

function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className={`relative ${
        isActive ? "w-full md:w-[500px] z-10" : "w-[80%] md:w-[350px] opacity-60 hover:opacity-80 cursor-pointer"
      } transition-all duration-300`}
      whileHover={isActive ? { y: -10 } : { scale: 1.05, opacity: 0.9 }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Device Mockup - Enhanced version */}
        <div
          className={`relative ${isActive ? "p-3" : "p-2"} bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700`}
        >
          {/* Top Bezel with Camera and Speakers */}
          <div className="absolute top-1.5 left-0 right-0 flex justify-center items-center gap-1 px-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700 ring-1 ring-gray-500 ring-opacity-50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>

          {/* Screen Content with Reflection */}
          <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-white">
            {/* Project Demo Content */}
            <div className="absolute inset-0 w-full h-full">{project.demoContent.content}</div>

            {/* Screen Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent pointer-events-none"></div>

            {/* Subtle Scan Line Effect */}
            <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none"></div>
          </div>

          {/* Control Buttons */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="w-4 h-1 rounded-full bg-gray-600"></div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
          </div>
        </div>

        {/* Stand */}
        <div
          className={`mx-auto ${isActive ? "w-24" : "w-16"} h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg`}
        ></div>
        <div
          className={`mx-auto ${isActive ? "w-32" : "w-20"} h-1.5 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg`}
        ></div>
        <div className={`mx-auto ${isActive ? "w-16" : "w-12"} h-1 bg-gray-800 rounded-b`}></div>
      </div>

      {isActive && (
        <motion.div
          className="mt-6 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block px-3 py-1 mb-2 bg-pink-500/20 rounded-full text-xs text-pink-400 font-medium">
            {project.type}
          </div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4 max-w-md mx-auto">{project.description}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Demo Components for each project
function EcommerceDashboardDemo() {
  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="h-[10%] bg-gradient-to-r from-purple-600 to-pink-500 flex items-center px-4">
        <div className="w-8 h-8 rounded-md bg-white/20 mr-3"></div>
        <div className="flex-1">
          <div className="h-2 w-24 bg-white/80 rounded-full"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20"></div>
          <div className="w-6 h-6 rounded-full bg-white/20"></div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="h-[90%] p-3 flex flex-col gap-2">
        {/* Stats Row */}
        <div className="flex gap-2 h-[20%]">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-white rounded-lg shadow p-2 flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="h-1.5 w-12 bg-gray-300 rounded-full"></div>
              <div className="flex justify-between items-end">
                <div className="h-3 w-10 bg-gray-400 rounded-full"></div>
                <motion.div
                  className={`h-6 w-6 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : i === 2 ? "bg-yellow-500" : "bg-purple-500"}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-[40%] bg-white rounded-lg shadow p-2 flex flex-col">
          <div className="h-2 w-20 bg-gray-300 rounded-full mb-2"></div>
          <div className="flex-1 flex items-end gap-1 pt-4">
            {[40, 65, 45, 80, 60, 75, 50, 90, 70, 55, 85, 65].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
              ></motion.div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="h-[40%] bg-white rounded-lg shadow p-2">
          <div className="h-2 w-16 bg-gray-300 rounded-full mb-3"></div>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 py-1.5 border-b border-gray-100"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="w-5 h-5 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-1.5 w-full max-w-[80px] bg-gray-300 rounded-full"></div>
              </div>
              <div className="h-1.5 w-10 bg-gray-300 rounded-full"></div>
              <motion.div
                className={`h-2 w-2 rounded-full ${i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-red-500"}`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Cursor */}
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-pink-500 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [50, 200, 250],
          y: [200, 100, 50],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-pink-500 rounded-full"
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </motion.div>
    </div>
  )
}

function CorporateLandingDemo() {
  return (
    <div className="w-full h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="h-[12%] flex items-center justify-between px-4 border-b border-gray-100">
        <div className="h-3 w-16 bg-purple-600 rounded-sm"></div>
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-1.5 w-8 bg-gray-300 rounded-full"></div>
          ))}
        </div>
        <div className="h-2 w-12 bg-pink-500 rounded-sm"></div>
      </div>

      {/* Hero Section */}
      <div className="h-[40%] relative overflow-hidden flex items-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50"></div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <motion.div
            className="h-4 w-32 bg-gray-800 rounded-sm mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          ></motion.div>
          <motion.div
            className="h-2 w-48 bg-gray-400 rounded-full mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          ></motion.div>
          <motion.div
            className="h-6 w-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          ></motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.02, 0.98, 1],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="absolute inset-2 rounded-md bg-white"></div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="h-[30%] px-4 py-3">
        <div className="h-2 w-20 bg-gray-800 rounded-full mb-3 mx-auto"></div>
        <div className="flex gap-2 h-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gray-50 rounded-lg p-2 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${
                  i === 0 ? "bg-blue-100" : i === 1 ? "bg-green-100" : "bg-yellow-100"
                }`}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
              >
                <div
                  className={`w-4 h-4 rounded-sm ${
                    i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
              </motion.div>
              <div className="h-1.5 w-12 bg-gray-300 rounded-full mb-1"></div>
              <div className="h-1 w-full max-w-[60px] bg-gray-200 rounded-full"></div>
              <div className="h-1 w-full max-w-[50px] bg-gray-200 rounded-full mt-1"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="h-[18%] bg-gradient-to-r from-purple-600/90 to-pink-500/90 flex items-center justify-center">
        <div className="text-center">
          <div className="h-2 w-32 bg-white/80 rounded-full mb-2 mx-auto"></div>
          <motion.div
            className="h-6 w-24 bg-white rounded-md mx-auto"
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute right-4 h-full w-1 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-1 h-6 bg-pink-500/50 rounded-full"
          animate={{ y: [0, 150, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </div>
  )
}

function FinanceAppDemo() {
  return (
    <div className="w-full h-full bg-gray-900 overflow-hidden">
      {/* App Header */}
      <div className="h-[10%] bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-between px-4">
        <div className="h-2 w-16 bg-white/80 rounded-full"></div>
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/60"></div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="h-[25%] px-3 pt-4">
        <motion.div
          className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-12 w-24 border border-white/20 rounded-full"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${-10 + i * 20}%`,
                  transform: `rotate(${i * 10}deg)`,
                }}
              ></div>
            ))}
          </div>

          <div className="relative h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-1.5 w-12 bg-gray-500 rounded-full mb-1"></div>
                <motion.div
                  className="h-3 w-20 bg-white rounded-sm"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
              </div>
              <div className="w-8 h-5 rounded bg-gray-700 flex items-center justify-center">
                <div className="w-3 h-2 bg-green-500 rounded-sm"></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1">
                <div className="w-6 h-3 rounded-full bg-gray-700"></div>
                <div className="w-6 h-3 rounded-full bg-gray-700"></div>
              </div>
              <motion.div
                className="h-2 w-10 bg-gray-600 rounded-full"
                animate={{ width: [10, 16, 10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <div className="h-[45%] px-3 py-2">
        <div className="h-2 w-24 bg-gray-600 rounded-full mb-3"></div>
        <div className="h-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i % 3 === 0 ? "bg-red-500/20" : i % 3 === 1 ? "bg-green-500/20" : "bg-blue-500/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-sm ${
                    i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-green-500" : "bg-blue-500"
                  }`}
                ></div>
              </div>
              <div className="flex-1">
                <div className="h-2 w-20 bg-gray-500 rounded-full mb-1"></div>
                <div className="h-1.5 w-12 bg-gray-700 rounded-full"></div>
              </div>
              <div className={`h-2 w-12 ${i % 2 === 0 ? "bg-red-500" : "bg-green-500"} rounded-sm`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="h-[20%] bg-gray-800 flex items-center justify-around px-4 border-t border-gray-700">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              i === 1 ? "bg-green-500/20" : "bg-transparent"
            }`}
            whileHover={{ scale: 1.1 }}
            animate={i === 1 ? { y: [0, -3, 0] } : {}}
            transition={i === 1 ? { duration: 1, repeat: Number.POSITIVE_INFINITY } : {}}
          >
            <div className={`w-5 h-5 rounded-sm ${i === 1 ? "bg-green-500" : "bg-gray-600"}`}></div>
          </motion.div>
        ))}
      </div>

      {/* Animated Cursor */}
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-green-500 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [50, 200, 250],
          y: [200, 100, 50],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </motion.div>
    </div>
  )
}

function ManagementSystemDemo() {
  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="h-[10%] bg-indigo-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white/20"></div>
          <div className="h-2 w-20 bg-white/80 rounded-full"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20"></div>
          <div className="w-6 h-6 rounded-full bg-white/20"></div>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="h-[90%] flex">
        {/* Sidebar */}
        <div className="w-[20%] h-full bg-white border-r border-gray-200 py-3 px-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`flex items-center gap-2 py-2 px-2 rounded-md mb-1 ${
                i === 1 ? "bg-indigo-50" : "bg-transparent"
              }`}
              whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.1)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className={`w-4 h-4 rounded-sm ${i === 1 ? "bg-indigo-500" : "bg-gray-400"}`}></div>
              <div className={`h-2 w-12 rounded-full ${i === 1 ? "bg-indigo-500" : "bg-gray-300"}`}></div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-[80%] h-full p-4">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-3 w-32 bg-gray-800 rounded-sm"></div>
            <motion.div className="h-7 w-20 bg-indigo-500 rounded-md" whileHover={{ scale: 1.05 }}></motion.div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow p-3 flex flex-col justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div className="h-2 w-16 bg-gray-400 rounded-full"></div>
                  <div
                    className={`w-6 h-6 rounded-full ${
                      i === 0 ? "bg-green-100" : i === 1 ? "bg-blue-100" : "bg-orange-100"
                    } flex items-center justify-center`}
                  >
                    <div
                      className={`w-3 h-3 rounded-sm ${
                        i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : "bg-orange-500"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="h-4 w-12 bg-gray-800 rounded-sm mt-2"></div>
                <div className="h-1.5 w-full max-w-[80%] bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className={`h-full rounded-full ${
                      i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : "bg-orange-500"
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(i + 1) * 25}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-1 h-2 w-full bg-gray-400 rounded-full mr-2"></div>
              ))}
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="border-b border-gray-100 py-3 px-4 flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="flex-1 h-2 w-full max-w-[80%] bg-gray-300 rounded-full mr-2"></div>
                ))}
                <motion.div
                  className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(79, 70, 229, 0.2)" }}
                >
                  <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Cursor */}
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-indigo-500 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [100, 200, 300],
          y: [50, 100, 150],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-indigo-500 rounded-full"
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </motion.div>
    </div>
  )
}

function MarketplaceDemo() {
  return (
    <div className="w-full h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="h-[10%] border-b border-gray-200 flex items-center justify-between px-4">
        <div className="h-3 w-24 bg-orange-500 rounded-sm"></div>
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-gray-400"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-gray-400"></div>
          </div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="h-[15%] px-4 py-2">
        <div className="h-8 w-full bg-gray-100 rounded-full flex items-center px-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
          <div className="h-2 w-24 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex gap-2 overflow-x-auto py-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`flex-shrink-0 h-6 px-3 rounded-full flex items-center justify-center ${
                i === 1 ? "bg-orange-500" : "bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`h-2 w-12 rounded-full ${i === 1 ? "bg-white" : "bg-gray-400"}`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="h-[30%] px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <div className="h-2.5 w-24 bg-gray-800 rounded-full"></div>
          <div className="h-2 w-12 bg-orange-500 rounded-full"></div>
        </div>
        <div className="flex gap-3 h-[90%] overflow-x-auto">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[40%] h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <div className="h-[60%] bg-gray-100 relative">
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-3 h-3 rounded-sm bg-gray-400"></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-md bg-${i === 0 ? "orange" : i === 1 ? "blue" : "green"}-200`}
                  ></div>
                </div>
              </div>
              <div className="h-[40%] p-2">
                <div className="h-2 w-full max-w-[80%] bg-gray-800 rounded-full mb-1"></div>
                <div className="h-1.5 w-full max-w-[60%] bg-gray-400 rounded-full mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-2.5 w-12 bg-orange-500 rounded-sm"></div>
                  <motion.div
                    className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                  >
                    <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="h-[45%] px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <div className="h-2.5 w-24 bg-gray-800 rounded-full"></div>
          <div className="h-2 w-12 bg-orange-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-3 h-[90%] overflow-y-auto">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="h-[60%] bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-md bg-${
                      i % 4 === 0 ? "purple" : i % 4 === 1 ? "pink" : i % 4 === 2 ? "blue" : "green"
                    }-200`}
                  ></div>
                </div>
                {i === 2 && (
                  <motion.div
                    className="absolute top-1 left-1 h-4 w-8 bg-red-500 rounded-sm flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="h-1 w-5 bg-white rounded-full"></div>
                  </motion.div>
                )}
              </div>
              <div className="h-[40%] p-2">
                <div className="h-1.5 w-full max-w-[90%] bg-gray-800 rounded-full mb-1"></div>
                <div className="h-1 w-full max-w-[70%] bg-gray-400 rounded-full mb-1.5"></div>
                <div className="flex justify-between items-center">
                  <div className="h-2 w-10 bg-orange-500 rounded-sm"></div>
                  <div className="flex items-center">
                    <div className="h-1.5 w-3 bg-gray-300 rounded-full mr-1 line-through"></div>
                    <div className="h-1.5 w-6 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Cursor with Cart Add Effect */}
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-orange-500 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          x: [150, 200, 250, 250, 350],
          y: [250, 250, 250, 200, 50],
          scale: [1, 1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.3, 0.4, 0.7, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-orange-500 rounded-full"
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </motion.div>

      {/* Cart Add Animation */}
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-orange-500 z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: [250, 250, 350],
          y: [250, 200, 50],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          repeatDelay: 3,
          times: [0.4, 0.5, 0.7],
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orange-500"
          animate={{ scale: [1, 2], opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3.5 }}
        ></motion.div>
      </motion.div>
    </div>
  )
}

function SocialNetworkDemo() {
  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="h-[10%] bg-blue-600 flex items-center justify-between px-4">
        <div className="h-3 w-20 bg-white rounded-sm"></div>
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-white/60"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-white/60"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[90%] flex">
        {/* Left Sidebar */}
        <div className="w-[25%] h-full bg-white border-r border-gray-200 py-3 px-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 mx-auto mb-3 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          </div>
          <div className="h-2 w-16 bg-gray-800 rounded-full mx-auto mb-4"></div>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`flex items-center gap-2 py-2 px-2 rounded-md mb-1 ${
                i === 0 ? "bg-blue-50" : "bg-transparent"
              }`}
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className={`w-4 h-4 rounded-sm ${i === 0 ? "bg-blue-500" : "bg-gray-400"}`}></div>
              <div className={`h-2 w-12 rounded-full ${i === 0 ? "bg-blue-500" : "bg-gray-300"}`}></div>
            </motion.div>
          ))}
        </div>

        {/* Main Feed */}
        <div className="w-[50%] h-full overflow-y-auto border-r border-gray-200">
          {/* Create Post */}
          <div className="bg-white p-3 border-b border-gray-200">
            <div className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0"></div>
              <div className="flex-1 h-8 bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex justify-around">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                  <div className="h-2 w-12 bg-gray-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white border-b border-gray-200 p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0"></div>
                <div>
                  <div className="h-2 w-20 bg-gray-800 rounded-full mb-1"></div>
                  <div className="h-1.5 w-16 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="h-2 w-full bg-gray-300 rounded-full mb-1.5"></div>
                <div className="h-2 w-[90%] bg-gray-300 rounded-full mb-1.5"></div>
                <div className="h-2 w-[60%] bg-gray-300 rounded-full"></div>
              </div>
              {i !== 1 ? (
                <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-md bg-${i === 0 ? "blue" : "green"}-200`}></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1 mb-3">
                  <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-pink-200"></div>
                  </div>
                  <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-purple-200"></div>
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-4 h-4 rounded-full bg-blue-100 border border-white"></div>
                    ))}
                  </div>
                  <div className="h-1.5 w-8 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex gap-3">
                  {[...Array(3)].map((_, j) => (
                    <motion.div key={j} className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                      <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                      <div className="h-1.5 w-4 bg-gray-300 rounded-full"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-[25%] h-full p-3">
          {/* Connections */}
          <div className="mb-4">
            <div className="h-2.5 w-20 bg-gray-800 rounded-full mb-3"></div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-2 w-16 bg-gray-800 rounded-full mb-1"></div>
                  <div className="h-1.5 w-12 bg-gray-400 rounded-full"></div>
                </div>
                <motion.div
                  className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                >
                  <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Trending */}
          <div>
            <div className="h-2.5 w-20 bg-gray-800 rounded-full mb-3"></div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-md p-2 mb-2 border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="h-2 w-full max-w-[80%] bg-gray-300 rounded-full mb-1"></div>
                <div className="h-2 w-full max-w-[60%] bg-gray-300 rounded-full mb-2"></div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-8 bg-blue-500 rounded-full"></div>
                  <div className="h-1.5 w-12 bg-gray-400 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Typing Indicator */}
      <motion.div
        className="absolute bottom-20 right-[30%] bg-blue-500 rounded-full px-3 py-1.5 flex items-center gap-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5],
          y: [10, 0, 0, 10],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
          times: [0, 0.1, 0.9, 1],
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0 }}
        ></motion.div>
        <motion.div
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
        ></motion.div>
        <motion.div
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
        ></motion.div>
      </motion.div>

      {/* Animated Cursor */}
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-blue-500 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [200, 250, 300],
          y: [150, 100, 200],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-full"
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </motion.div>
    </div>
  )
}

