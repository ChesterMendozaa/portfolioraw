// src/components/Hero.tsx
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, Facebook } from 'lucide-react'
import portfolioData from '../data/portfolioData'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span style={{ color: 'var(--accent)' }}>{portfolioData.name}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ color: 'var(--text-secondary)' }}>
            {portfolioData.role}
          </p>
          <p className="text-base mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            {portfolioData.shortIntro}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              View My Projects <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border transition-transform hover:scale-105"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              Contact Me
            </a>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg border transition-colors hover:opacity-70"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <Github size={20} />
            </a>
            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg border transition-colors hover:opacity-70"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <Linkedin size={20} />
            </a>
            <a
              href={portfolioData.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-lg border transition-colors hover:opacity-70"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <Facebook size={20} />
            </a>
            <a
              href={`mailto:${portfolioData.email}`}
              aria-label="Email"
              className="p-2 rounded-lg border transition-colors hover:opacity-70"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <img
            src={portfolioData.profilePhoto}
            alt={`${portfolioData.name} profile photo`}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4"
            style={{ borderColor: 'var(--accent)' }}
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  )
}