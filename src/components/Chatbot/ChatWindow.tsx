// src/components/Chatbot/ChatWindow.tsx
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Trash2, X } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { getAIResponse, type ChatMessage as ChatMessageType } from '../../services/aiService'

interface Props {
  onClose: () => void
}

const SUGGESTED = [
  'Who are you?',
  'What projects have you made?',
  'What are your skills?',
  'How can I contact you?',
]

export default function ChatWindow({ onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm a chatbot that knows about this portfolio. Ask me anything!",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const reply = await getAIResponse(trimmed)
      const aiMsg: ChatMessageType = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Chat cleared. How can I help?",
      },
    ])
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-20 right-4 md:right-6 w-[calc(100vw-2rem)] max-w-sm h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border z-50"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
      role="dialog"
      aria-label="Chat window"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="font-semibold text-sm">Portfolio Assistant</span>
        <div className="flex gap-1">
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg hover:opacity-70"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:opacity-70"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <span className="text-xs" style={{ color: 'var(--accent)' }}>
                …
              </span>
            </div>
            <div
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-2 py-1 text-xs rounded-full border hover:opacity-70"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
        className="flex items-center gap-2 p-3 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none border"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2 rounded-lg text-white disabled:opacity-40"
          style={{ backgroundColor: 'var(--accent)' }}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  )
}