// src/components/Skills.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import portfolioData from '../data/portfolioData'
import type { Skill } from '../data/portfolioData'

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'] as const

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredSkills =
    activeCategory === 'All'
      ? portfolioData.skills
      : portfolioData.skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          My <span style={{ color: 'var(--accent)' }}>Skills</span>
        </motion.h2>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#fff' : 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.map((skill: Skill, index: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}