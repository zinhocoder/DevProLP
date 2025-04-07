"use client"

import { useState, useEffect } from "react"
import { MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Mostrar o botão após rolagem
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-purple-900 text-sm font-medium py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white transform rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Efeito de pulso */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-70 blur-sm animate-pulse"></div>

            {/* Botão */}
            <motion.a
              href="https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20conversar%20sobre%20um%20projeto"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center h-14 w-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 3,
                }}
              >
                <MessageSquare className="h-6 w-6 text-white" />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

