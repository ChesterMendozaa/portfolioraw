// src/App.tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Experience from './components/Experience'
import MusicPlayer from './components/MusicPlayer'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot/Chatbot'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <MusicPlayer />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}