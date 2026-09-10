// src/components/About.tsx
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Target, Focus } from 'lucide-react'
import portfolioData from '../data/portfolioData'

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About <span style={{ color: 'var(--accent)' }}>Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img
              src={portfolioData.profilePhoto}
              alt={`${portfolioData.name} profile`}
              className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover shadow-lg"
              loading="lazy"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {portfolioData.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location */}
              <div
                className="p-4 rounded-xl border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} style={{ color: 'var(--accent)' }} />
                  <span className="font-semibold text-sm">Location</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {portfolioData.location}
                </p>
              </div>

              {/* Education */}
              <div
                className="p-4 rounded-xl border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
                  <span className="font-semibold text-sm">Education</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {portfolioData.educationSummary}
                </p>
              </div>

              {/* Current Focus */}
              <div
                className="p-4 rounded-xl border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Focus size={18} style={{ color: 'var(--accent)' }} />
                  <span className="font-semibold text-sm">Current Focus</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {portfolioData.currentFocus}
                </p>
              </div>

              {/* Goals */}
              <div
                className="p-4 rounded-xl border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} style={{ color: 'var(--accent)' }} />
                  <span className="font-semibold text-sm">Goals</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {portfolioData.goals}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}