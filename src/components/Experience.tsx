// src/components/Experience.tsx
import { motion } from 'framer-motion'
import { Briefcase, Building2 } from 'lucide-react'
import portfolioData from '../data/portfolioData'

export default function Experience() {
  // Hide entire section if disabled
  if (!portfolioData.experience.enabled) return null

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          My <span style={{ color: 'var(--accent)' }}>Experience</span>
        </motion.h2>

        <div className="space-y-6">
          {portfolioData.experience.items.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.position}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <Briefcase size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={14} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                      {exp.company}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      · {exp.date}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
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