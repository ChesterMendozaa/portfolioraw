// src/components/Chatbot/Chatbot.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import ChatWindow from './ChatWindow'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AnimatePresence>{isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}</AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white z-50"
        style={{ backgroundColor: 'var(--accent)' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  )
}