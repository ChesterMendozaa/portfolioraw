// src/components/Footer.tsx
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebookF } from 'react-icons/fa6'
import portfolioData from '../data/portfolioData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 px-4 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          © {year} {portfolioData.name}. Built with React &amp; TypeScript.
        </p>

        <div className="flex gap-3">
          <a
            href={portfolioData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:opacity-70"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={portfolioData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-70"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={portfolioData.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:opacity-70"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            aria-label="Email"
            className="hover:opacity-70"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}