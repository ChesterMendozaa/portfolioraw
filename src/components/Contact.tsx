// src/components/Contact.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Check, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebookF } from 'react-icons/fa6'
import portfolioData from '../data/portfolioData'

interface FormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!form.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')

    // ===== INTEGRATION POINT =====
    // Replace this timeout with your actual form submission.
    // See the section below for EmailJS / Formspree examples.
    try {
      // Simulated submission — replace with real service
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('idle')
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Get in <span style={{ color: 'var(--accent)' }}>Touch</span>
        </motion.h2>
        <p className="text-center mb-12 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Have a question or want to work together?
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Mail size={20} style={{ color: 'var(--accent)' }} />
              <a
                href={`mailto:${portfolioData.email}`}
                className="hover:opacity-70"
                style={{ color: 'var(--text-primary)' }}
              >
                {portfolioData.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} style={{ color: 'var(--accent)' }} />
              <span style={{ color: 'var(--text-primary)' }}>{portfolioData.location}</span>
            </div>

            <div className="flex gap-3 pt-4">
              <a
                href={portfolioData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:opacity-70"
                style={{ borderColor: 'var(--border)' }}
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={portfolioData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:opacity-70"
                style={{ borderColor: 'var(--border)' }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={portfolioData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:opacity-70"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border outline-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: errors.name ? '#ef4444' : 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border outline-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: errors.email ? '#ef4444' : 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border outline-none resize-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: errors.message ? '#ef4444' : 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white disabled:opacity-60"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {status === 'loading' && 'Sending...'}
              {status === 'success' && (
                <>
                  <Check size={18} /> Message Sent
                </>
              )}
              {status === 'idle' && (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </motion.button>

            {status === 'success' && (
              <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
                Thanks for reaching out! I'll get back to you soon.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}