// src/components/Chatbot/ChatMessage.tsx
import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '../../services/aiService'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: isUser ? 'var(--accent)' : 'var(--bg-secondary)' }}
      >
        {isUser ? (
          <User size={14} color="#fff" />
        ) : (
          <Bot size={14} style={{ color: 'var(--accent)' }} />
        )}
      </div>
      <div
        className="max-w-[80%] px-3 py-2 rounded-lg text-sm"
        style={{
          backgroundColor: isUser ? 'var(--accent)' : 'var(--bg-secondary)',
          color: isUser ? '#fff' : 'var(--text-primary)',
        }}
      >
        {message.content}
      </div>
    </motion.div>
  )
}