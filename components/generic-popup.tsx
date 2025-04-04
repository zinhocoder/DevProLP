"use client"
import type React from "react"

import { X } from "lucide-react"

interface GenericPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export default function GenericPopup({ isOpen, onClose, title, content }: GenericPopupProps) {
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
            <h3 className="text-xl font-bold">{title}</h3>
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
        <div className="p-6 pt-4 popup-scrollbar max-h-[calc(80vh-80px)] overflow-y-auto">{content}</div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-500 opacity-70"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-pink-500 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-pink-500 opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pink-500 opacity-70"></div>
      </div>
    </div>
  )
}

