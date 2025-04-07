"use client"
import { Button } from "@/components/ui/button"
import { ChevronRight, X } from "lucide-react"

interface ServicePopupProps {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    description: string
    longDescription: string
    benefits: string[]
  }
}

export default function ServicePopup({ isOpen, onClose, service }: ServicePopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Popup */}
      <div
        className="relative w-[90%] max-w-md max-h-[80vh] bg-purple-950 border border-purple-800 rounded-xl shadow-2xl z-[101]"
        style={{ transform: "none" }}
      >
        {/* Header with gradient */}
        <div className="sticky top-0 z-10 bg-purple-950">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20" />
          <div className="relative p-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-purple-900/80 flex items-center justify-center hover:bg-pink-500/80 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content with custom scrollbar */}
        <div className="p-6 pt-4 popup-scrollbar max-h-[calc(80vh-80px)] overflow-y-auto">
          <p className="text-gray-300 mb-4">{service.longDescription}</p>

          <h4 className="font-semibold mb-3">Benefícios:</h4>
          <ul className="space-y-2 mb-6">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                </div>
                <span className="text-gray-300 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={onClose}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-5 text-base group"
            asChild
          >
            <a
              href={`https://wa.me/5547992865256?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20o%20serviço%20de%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar Orçamento
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-500 opacity-70"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-pink-500 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-pink-500 opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pink-500 opacity-70"></div>
      </div>
    </div>
  )
}

