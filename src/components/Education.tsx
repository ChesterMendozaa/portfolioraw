// src/components/Education.tsx
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import portfolioData from '../data/portfolioData'

export default function Education() {
  return (
    <section id="education" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          My <span style={{ color: 'var(--accent)' }}>Education</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ backgroundColor: 'var(--border)' }}
          />

          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex mb-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 mt-6 z-10"
                style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--bg-secondary)' }}
              />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div
                  className="p-5 rounded-xl border"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
                    <h3 className="font-bold">{edu.degree}</h3>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent)' }}>
                    {edu.school}
                  </p>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {edu.year}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}